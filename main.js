function showZoomModal(img) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'zoom-modal-overlay';
    overlay.onclick = () => document.body.removeChild(overlay);
    // Crear imagen grande
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.className = 'zoom-modal-img';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
}

// --- Menú navegación y swipe ---
const hojasWrapper = document.getElementById('hojasWrapper');
const tabButtons = document.querySelectorAll('.tab-btn');
const hojas = document.querySelectorAll('.hoja');
let hojaActual = 1;

function mostrarHoja(numero) {
    const offset = (numero - 1) * hojasWrapper.offsetWidth;
    hojasWrapper.scrollTo({ left: offset, behavior: 'smooth' });
    hojaActual = numero;
    actualizarBotonesActivos(numero);
}
window.mostrarHoja = mostrarHoja; // Hacer global

function actualizarBotonesActivos(hojaActiva) {
    tabButtons.forEach((btn, index) => {
        if (index === hojaActiva - 1) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

hojasWrapper.addEventListener('scroll', () => {
    const index = Math.round(hojasWrapper.scrollLeft / hojasWrapper.offsetWidth);
    hojaActual = index + 1;
    actualizarBotonesActivos(hojaActual);
});

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
        if (Math.abs(diff) > 50) {
            if (diff < 0 && hojaActual < hojas.length) {
                mostrarHoja(hojaActual + 1);
            } else if (diff > 0 && hojaActual > 1) {
                mostrarHoja(hojaActual - 1);
            }
        }
    }
});

window.addEventListener('resize', () => {
    mostrarHoja(hojaActual);
});

window.addEventListener('load', () => {
    mostrarHoja(1);
});
