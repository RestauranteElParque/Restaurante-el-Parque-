const hojasWrapper = document.getElementById('hojasWrapper');
const tabButtons = document.querySelectorAll('.tab-btn');
const hojas = document.querySelectorAll('.hoja');
let hojaActual = 1;

// Navegación por botón (ahora global)
function mostrarHoja(numero) {
    const offset = (numero - 1) * hojasWrapper.offsetWidth;
    hojasWrapper.scrollTo({ left: offset, behavior: 'smooth' });
    hojaActual = numero;
    actualizarBotonesActivos(numero);
}
window.mostrarHoja = mostrarHoja; // Hacer global

// Actualiza botones activos
function actualizarBotonesActivos(hojaActiva) {
    tabButtons.forEach((btn, index) => {
        if (index === hojaActiva - 1) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Detecta scroll horizontal y actualiza botones
hojasWrapper.addEventListener('scroll', () => {
    const index = Math.round(hojasWrapper.scrollLeft / hojasWrapper.offsetWidth);
    hojaActual = index + 1;
    actualizarBotonesActivos(hojaActual);
});

// Soporte para swipe táctil
let startX = 0;
hojasWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
    }
});
hojasWrapper.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) { // Umbral de swipe
            if (diff < 0 && hojaActual < hojas.length) {
                mostrarHoja(hojaActual + 1);
            } else if (diff > 0 && hojaActual > 1) {
                mostrarHoja(hojaActual - 1);
            }
        }
    }
});

// Ajusta el scroll al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    mostrarHoja(hojaActual);
});

// Inicializa en la hoja 1
window.addEventListener('load', () => {
    mostrarHoja(1);
});
