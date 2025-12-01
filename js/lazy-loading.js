/**
 * Módulo de Lazy Loading
 * Carga diferida de imágenes para mejorar el rendimiento
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: options.rootMargin || '50px',
            threshold: options.threshold || 0.01,
            selector: options.selector || 'img[data-src]',
            ...options
        };
        
        this.images = [];
        this.observer = null;
        
        this.init();
    }
    
    /**
     * Inicializa el lazy loading
     */
    init() {
        this.images = document.querySelectorAll(this.options.selector);
        
        if (this.images.length === 0) {
            return;
        }
        
        // Verificar soporte de IntersectionObserver
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        } else {
            // Fallback para navegadores antiguos
            this.loadAllImages();
        }
    }
    
    /**
     * Configura el IntersectionObserver
     */
    setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar todas las imágenes
        this.images.forEach(img => {
            this.observer.observe(img);
        });
    }
    
    /**
     * Carga una imagen específica
     * @param {HTMLImageElement} img - Elemento de imagen a cargar
     */
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (!src) return;
        
        // Crear una nueva imagen para precargar
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Aplicar la imagen cargada
            img.src = src;
            
            if (srcset) {
                img.srcset = srcset;
            }
            
            // Remover atributos data
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
            
            // Añadir clase de cargado
            img.classList.add('loaded');
            
            // Dejar de observar esta imagen
            if (this.observer) {
                this.observer.unobserve(img);
            }
            
            // Disparar evento personalizado
            img.dispatchEvent(new CustomEvent('lazyloaded', {
                detail: { src }
            }));
        };
        
        imageLoader.onerror = () => {
            console.error(`Error al cargar imagen: ${src}`);
            img.classList.add('error');
        };
        
        // Iniciar la carga
        imageLoader.src = src;
    }
    
    /**
     * Carga todas las imágenes inmediatamente (fallback)
     */
    loadAllImages() {
        this.images.forEach(img => {
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
            
            if (srcset) {
                img.srcset = srcset;
                img.removeAttribute('data-srcset');
            }
            
            img.classList.add('loaded');
        });
    }
    
    /**
     * Recarga las imágenes (útil para contenido dinámico)
     */
    reload() {
        // Desconectar observer anterior
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Reinicializar
        this.init();
    }
    
    /**
     * Destruye el lazy loader
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.images = [];
    }
}

// Configuración por defecto para el sitio
const lazyLoadConfig = {
    rootMargin: '100px',
    threshold: 0.01,
    selector: 'img[data-src], img[loading="lazy"]'
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const lazyLoader = new LazyLoader(lazyLoadConfig);
    
    // Exponer globalmente
    window.iCodeLazyLoader = lazyLoader;
    
    // Opcional: Recargar cuando se añada contenido dinámico
    document.addEventListener('contentUpdated', () => {
        lazyLoader.reload();
    });
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}
