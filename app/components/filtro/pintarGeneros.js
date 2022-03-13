// Imports
import { fragment } from "../utils/variables.js";

// Variables
const templateGenero = document.getElementById('genre').content;
export const filterContent = document.querySelector('.filter-content');
const filterButtons = document.querySelector('.filter-buttons'); 

export const pintarGeneros = (stockLibros) => {
    const generos = new Set(stockLibros.map((libro) => libro.genero));
    
    generos.forEach((genero) => {
        const clone = templateGenero.cloneNode(true);
        clone.querySelector('.genre-btn-text').textContent = genero;
        fragment.appendChild(clone);
    });
    filterContent.insertBefore(fragment, filterButtons);
};