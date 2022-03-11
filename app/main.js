// Imports
import { fetchData } from './components/products/loadProducts.js';
import { getLocalInfo } from './components/storage/storage.js';
import {pintarCarrito} from './components/carrito/carrito.js';
import { activarLink } from './components/menu/menu.js';

export const verificarLS = () => getLocalInfo('carrito') || [];

// Variables
let carritoInicial = verificarLS();

// Carga de productos y géneros del filtro al cargar el dom
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); 
    pintarCarrito(carritoInicial);
    activarLink();
});


