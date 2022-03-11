import { stockLibros } from "../products/loadProducts.js";
import { fragment } from "../utils/variables.js";
import { actualizarCarrito } from "../carrito/carrito.js";

const topButtons = Array.from(document.querySelectorAll('.top-ventas__buttons button'));
const templateTopVentas = document.getElementById('template-top-ventas').content;
const topVentasInfo = document.querySelector('.top-ventas__info');
const topVentasSection = document.querySelector('.top-ventas');

topButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        seleccionarBoton(e);
        mostrarTopVentas();
    });
});

topVentasSection.addEventListener('click', (e) => {
    if(e.target.classList.contains('top-book__shop-btn')) {
        actualizarCarrito(e);
    };
})

const seleccionarBoton = (e) => {
    const indexButton = e.target.dataset.index;
    topButtons.forEach((button) => {
        button.dataset.index === indexButton ? button.ariaSelected = 'true' : button.ariaSelected = 'false';
    });
}

export const mostrarTopVentas = () => {
    topVentasInfo.innerHTML = '';

    const topVentas = stockLibros.filter((libro) => libro.topVentas === true);
    const selectedButton = topButtons.find((button) => button.ariaSelected === 'true');
    const indexButton = selectedButton.dataset.index;
    const topBook = topVentas[indexButton];
    const {id, titulo, autor, sinopsis, imagen} = topBook;

    const clone = templateTopVentas.cloneNode(true);

    clone.querySelector('.top-book__title').textContent = titulo;
    clone.querySelector('.top-book__author').textContent = autor;
    clone.querySelector('.top-book__sinopsis').textContent = sinopsis;
    clone.querySelector('.top-book__shop-btn').dataset.id = id;
    clone.querySelector('.top-book__img').src = imagen;
    clone.querySelector('.top-book__img').alt = titulo;
    
    fragment.appendChild(clone);
    topVentasInfo.appendChild(fragment);
}
