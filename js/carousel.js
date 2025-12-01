/**
 * Módulo de Carrusel
 * Maneja la lógica del carrusel de candidatos
 */

// Selección de los elementos del carrusel
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
let currentSlide = 0;
let carouselInterval; // Variable para el intervalo automático

// Inicializar el primer slide como activo
slides[currentSlide].classList.add('active');

// Inicializar la barra de progreso del primer slide
setTimeout(() => {
    const progressBar = slides[currentSlide].querySelector('.progress-bar');
    progressBar.style.transition = 'width 7s linear'; // 7 segundos para mejor lectura
    progressBar.style.width = '100%'; // Iniciar la animación
}, 10); 

// Función para mover el carrusel
function moveCarousel(direction) {
    // Reinicia la barra de progreso del slide actual
    slides[currentSlide].querySelector('.progress-bar').style.transition = 'none'; // Detener transición
    slides[currentSlide].querySelector('.progress-bar').style.width = '0%';

    // Quita la clase activa del slide actual
    slides[currentSlide].classList.remove('active');

    // Calcula el nuevo índice del slide
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Agrega la clase activa al nuevo slide
    slides[currentSlide].classList.add('active');

    // Inicia la barra de progreso del nuevo slide
    const progressBar = slides[currentSlide].querySelector('.progress-bar');
    progressBar.style.transition = 'width 7s linear'; // 7 segundos
    progressBar.style.width = '100%';

    // Actualizar los indicadores
    updateIndicators();

    // Reinicia el intervalo automático
    resetAutoSlide();
}

// Función para cambiar al slide específico
function setSlide(index) {
    slides[currentSlide].querySelector('.progress-bar').style.transition = 'none';
    slides[currentSlide].querySelector('.progress-bar').style.width = '0%';

    slides[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');

    const progressBar = slides[currentSlide].querySelector('.progress-bar');
    progressBar.style.transition = 'width 7s linear'; // 7 segundos
    progressBar.style.width = '100%';

    updateIndicators();

    resetAutoSlide();
}

// Función para actualizar los indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === currentSlide);
    });
}

// Función para iniciar el carrusel automático
function startAutoSlide() {
    carouselInterval = setInterval(() => moveCarousel(1), 7000); // 7 segundos
}

// Función para reiniciar el carrusel automático
function resetAutoSlide() {
    clearInterval(carouselInterval);
    startAutoSlide();
}

// Llamar a la función de inicio automático al cargar
startAutoSlide();
