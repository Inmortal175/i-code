/**
 * Módulo de Propuestas
 * Maneja la expansión y contracción de propuestas
 */

class ProposalsManager {
    constructor(containerId = '#list-proposal') {
        this.container = document.querySelector(containerId);
        if (!this.container) {
            console.error('Contenedor de propuestas no encontrado');
            return;
        }
        
        this.proposals = this.container.querySelectorAll('.proposal');
        this.init();
    }
    
    /**
     * Inicializa el gestor de propuestas
     */
    init() {
        this.proposals.forEach(proposal => {
            const toggleBtn = proposal.querySelector('.toggle-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    this.toggleContent(e.target);
                });
            }
        });
    }
    
    /**
     * Alterna la visibilidad del contenido de una propuesta
     * @param {HTMLElement} button - Botón que activó el toggle
     */
    toggleContent(button) {
        const content = button.nextElementSibling;
        const parent = button.parentElement;
        
        if (!content || !parent) return;
        
        // Cerrar cualquier otra sección abierta
        this.closeOtherProposals(content);
        
        // Alternar el estado del contenido actual
        const isHidden = content.classList.contains('hide');
        
        content.classList.toggle('hide', !isHidden);
        content.classList.toggle('show', isHidden);
        button.textContent = isHidden ? 'Ver menos' : 'Ver más';
        
        // Scroll suave al contenedor si se muestra contenido
        if (isHidden) {
            this.scrollToElement(parent);
        }
    }
    
    /**
     * Cierra todas las propuestas excepto la actual
     * @param {HTMLElement} currentContent - Contenido actual que no debe cerrarse
     */
    closeOtherProposals(currentContent) {
        this.proposals.forEach(proposal => {
            const content = proposal.querySelector('.proposal-content');
            const toggleBtn = proposal.querySelector('.toggle-btn');
            
            if (content && content !== currentContent && content.classList.contains('show')) {
                content.classList.remove('show');
                content.classList.add('hide');
                if (toggleBtn) {
                    toggleBtn.textContent = 'Ver más';
                }
            }
        });
    }
    
    /**
     * Hace scroll suave hasta un elemento
     * @param {HTMLElement} element - Elemento al que hacer scroll
     */
    scrollToElement(element) {
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            const offset = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + offset - 20; // 20px de margen superior
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 320); // Esperar a que termine la animación
    }
    
    /**
     * Abre una propuesta específica por índice
     * @param {number} index - Índice de la propuesta (0-based)
     */
    openProposal(index) {
        if (index < 0 || index >= this.proposals.length) {
            console.warn('Índice de propuesta fuera de rango');
            return;
        }
        
        const proposal = this.proposals[index];
        const toggleBtn = proposal.querySelector('.toggle-btn');
        
        if (toggleBtn) {
            this.toggleContent(toggleBtn);
        }
    }
    
    /**
     * Cierra todas las propuestas
     */
    closeAllProposals() {
        this.proposals.forEach(proposal => {
            const content = proposal.querySelector('.proposal-content');
            const toggleBtn = proposal.querySelector('.toggle-btn');
            
            if (content && content.classList.contains('show')) {
                content.classList.remove('show');
                content.classList.add('hide');
                if (toggleBtn) {
                    toggleBtn.textContent = 'Ver más';
                }
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const proposalsManager = new ProposalsManager('#list-proposal');
    
    // Exponer globalmente para debugging y uso externo
    window.iCodeProposals = proposalsManager;
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProposalsManager;
}
