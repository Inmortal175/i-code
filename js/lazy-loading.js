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
     * Carga una imagen específica con reintentos
     * @param {HTMLImageElement} img - Elemento de imagen a cargar
     */
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (!src) return;
        
        // Configuración de reintentos
        const maxRetries = 3;
        let retryCount = 0;
        
        const attemptLoad = () => {
            const imageLoader = new Image();
            
            imageLoader.onload = () => {
                img.src = src;
                
                if (srcset) {
                    img.srcset = srcset;
                }
                
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                img.classList.add('loaded');
                
                if (this.observer) {
                    this.observer.unobserve(img);
                }
                
                img.dispatchEvent(new CustomEvent('lazyloaded', {
                    detail: { src }
                }));
            };
            
            imageLoader.onerror = () => {
                retryCount++;
                if (retryCount < maxRetries) {
                    console.warn(`⚠️ Reintentando cargar imagen (${retryCount}/${maxRetries}):`, src);
                    // Reintentar después de un delay exponencial
                    setTimeout(attemptLoad, 1000 * Math.pow(2, retryCount - 1));
                } else {
                    console.error(`❌ Error al cargar imagen después de ${maxRetries} intentos:`, src);
                    img.classList.add('error');
                    // Mostrar imagen placeholder
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%232c2c2c"/%3E%3Ctext x="50%25" y="50%25" fill="%23ffd700" text-anchor="middle" dy=".3em"%3EI CODE%3C/text%3E%3C/svg%3E';
                }
            };
            
            imageLoader.src = src;
        };
        
        attemptLoad();
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
