// Imports
import { saveLocal } from '../storage/storage.js';
import { fragment } from '../utils/variables.js';
import { pintarGeneros } from '../filtro/pintarGeneros.js';
import { mostrarTopVentas } from '../topVentas/topVentas.js';
// Variables
const productsContainer = document.querySelector('.products-container');
const templateCard = document.getElementById('book').content;
let stockLibros = [];
let bookCards;

// Función para traer información del archivo .json
export const fetchData = async () => {
    try{
        const res = await fetch('../../../data/stockLibros.json');
        stockLibros = await res.json();
        aplicarDescuentos(stockLibros);
        saveLocal('stockLibros', stockLibros);
        pintarLibros(stockLibros);
        pintarGeneros(stockLibros);
        mostrarTopVentas();
        bookCards = document.querySelectorAll('.book');
    }catch(error){
        console.log(error);
    };
};

const aplicarDescuentos = (data) => {
    data.forEach((libro) => {
        if(libro.descuento !== ''){
            libro.aplicarDescuento = function(){
                const descuento = (parseInt(this.descuento.replace('%','')))/100;
                this.precioDescuento = this.precio * (1 - descuento);
                this.precioDescuento = parseFloat(this.precioDescuento.toFixed(2));
            };
            libro.aplicarDescuento();
        };
    });
};

export const pintarLibros = (stockLibros) => {
    stockLibros.forEach((libro) => {
        const {genero, imagen, titulo, id, autor, precio} = libro;
        let precioDescuento;

        const clone = templateCard.cloneNode(true);
        clone.querySelector('.book').dataset.genre = genero;
        clone.querySelector('.book-img').src = imagen;
        clone.querySelector('.book-img').alt = titulo;
        clone.querySelector('.shop-btn').dataset.id = id;
        clone.querySelector('.book-title').textContent = titulo;
        clone.querySelector('.book-author').textContent = autor;
        (libro.hasOwnProperty('precioDescuento')) ? (
            {precioDescuento} = libro,
            clone.querySelector('.book-previous-price').style.display = 'block',
            clone.querySelector('.book-previous-price').textContent = `$${precio}`,
            clone.querySelector('.book-price').textContent = `$${precioDescuento}`
        ) : (
            clone.querySelector('.book-previous-price').style.display = 'none',
            clone.querySelector('.book-price').textContent = `$${precio}`
        )
        fragment.appendChild(clone);
    });
    productsContainer.appendChild(fragment);
};

export {stockLibros, bookCards}