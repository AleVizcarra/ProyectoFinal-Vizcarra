// Imports
import { overlay } from "./variables.js";
import { seccionFiltro } from "../filtro/filtro.js";
import { seccionCarrito } from '../carrito/carrito.js';
import { mobileMenu } from "../menu/menu.js";

// Función para mostrar offSection
export const mostrarSeccion = (overlay, seccion) => {
    overlay.classList.add('overlay-visible');
    seccion.classList.add('show-off-section');
};

export const ocultarSeccion = (overlay, seccion) => {
    overlay.classList.remove('overlay-visible');
    seccion.classList.remove('show-off-section');
};

// Ocultar el filtro/carrito al dar click en el overlay
overlay.addEventListener('click', (e) => {
    (e.target.classList.contains('overlay') && seccionFiltro.classList.contains('show-off-section')) && ocultarSeccion (overlay, seccionFiltro);
    (e.target.classList.contains('overlay') && seccionCarrito.classList.contains('show-off-section')) && ocultarSeccion (overlay, seccionCarrito);
    (e.target.classList.contains('overlay') && mobileMenu.classList.contains('show-off-section')) && ocultarSeccion (overlay, mobileMenu);
});