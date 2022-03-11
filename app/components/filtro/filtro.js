// Import
import { mostrarSeccion, ocultarSeccion } from "../utils/interfaz.js";
import { overlay } from "../utils/variables.js";
import { filterContent } from "./pintarGeneros.js";
import { bookCards } from '../products/loadProducts.js'

const filtrosBtn = document.getElementById('filter-btn');
export const seccionFiltro = document.querySelector('.filter');
const cerrarFiltroBtn = document.querySelector('.close-filter');
const btnAplicarFiltro = document.querySelector('.apply-filter-btn');
const contadorFiltros = document.querySelector('.cantidadFiltros');
const btnLimpiarFiltros = document.querySelector('.clear-filter-btn');
let genero;
let btnGenero;
let generosSeleccionados = [];
let btnsGenerosSeleccionados = [];
let cantidadFiltros;
let btnConClaseSG


// Mostrar Filtro
filtrosBtn.addEventListener('click', () => {
    mostrarSeccion(overlay, seccionFiltro);
    evaluarGeneros();
});

// Ocultar Filtro
cerrarFiltroBtn.addEventListener('click', () => {
    ocultarSeccion(overlay, seccionFiltro);
});

// Seleccionar generos (DOM)
filterContent.addEventListener('click', (e) => {
    if(e.target.classList.contains('genre-btn-text')){
        btnGenero = e.target.parentElement;
        seleccionarGenerosDOM(btnGenero);
    } else if (e.target.classList.contains('genre-btn')){
        seleccionarGenerosDOM(e.target);
    } else if (e.target.classList.contains('remove-filter-btn')){
        btnGenero = e.target.parentElement.parentElement;
        deseleccionarGenerosDOM(btnGenero);
    }
    e.stopPropagation();
});

// Aplicar filtro
btnAplicarFiltro.addEventListener('click', () => {
    guardarGeneros();
    ocultarSeccion(overlay, seccionFiltro);
});

// Limpiar filtros
btnLimpiarFiltros.addEventListener('click', () => {
    limpiarFiltros(cantidadFiltros);
})


// ================= FUNCIONES ========================
// Asignar estilo de botón seleccionado a los géneros
const seleccionarGenerosDOM = (btnGenero) => {
    btnGenero.classList.replace('genre-btn', 'selected-genre-btn');
    btnGenero.querySelector('.remove-filter').style.display = 'inline-block';
};

// Deseleccionar botones
const deseleccionarGenerosDOM = (btnGenero) => {
    btnGenero.classList.replace('selected-genre-btn', 'genre-btn');
    btnGenero.querySelector('.remove-filter').style.display = 'none';
};


const guardarGeneros = () => {
    btnsGenerosSeleccionados = [];
    generosSeleccionados = [];
    // Botones géneros seleccionados
    btnsGenerosSeleccionados = Array.from(document.querySelectorAll('.selected-genre-btn'));
    
    // Agregar al array
    btnsGenerosSeleccionados.forEach((btnGenero) => {
        genero = btnGenero.querySelector('.genre-btn-text').textContent;
        generosSeleccionados = [...generosSeleccionados, genero];
    });
    filtrar(generosSeleccionados);
};

const filtrar = (arrayGeneros) => {
    cantidadFiltros = arrayGeneros.length;

    (cantidadFiltros === 0) ? removerFiltros() : (
        bookCards.forEach((card) => {
            const conincidencias = arrayGeneros.map((genero) => genero === card.dataset.genre);
            (conincidencias.includes(true)) ? card.style.display = 'flex' :  card.style.display = 'none';
        }),
        modificarContadorFiltros(cantidadFiltros)
    );
};

// Contador de filtros aplicados
const modificarContadorFiltros = (cantidadFiltros) => {
    (cantidadFiltros === 0) ? (
        contadorFiltros.style.display = 'none',
        filtrosBtn.style.justifyContent = 'center'
    ) : (
        contadorFiltros.style.display = 'flex',
        filtrosBtn.style.justifyContent = 'space-between',
        contadorFiltros.textContent = cantidadFiltros
    );
}

// Función para mostrar todos los libros y quitar el contador de filtros
const removerFiltros = () => {
    bookCards.forEach((card) => {
        card.style.display = 'flex';
    });
    modificarContadorFiltros(cantidadFiltros);
}

const limpiarFiltros = () => {
    btnsGenerosSeleccionados = [];
    generosSeleccionados = [];
    cantidadFiltros = generosSeleccionados.length;
    // Deseleccionar generos
    btnConClaseSG = document.querySelectorAll('.selected-genre-btn');
    btnConClaseSG.forEach((btn) => {
        deseleccionarGenerosDOM(btn);
    });

    // Función para mostrar todos los libros y quitar el contador de filtros
    removerFiltros();
    ocultarSeccion(overlay, seccionFiltro);
};

// Evaluar generos del filtro
const evaluarGeneros = () => {
    btnsGenerosSeleccionados.forEach((btn) => {
        seleccionarGenerosDOM (btn); 
    });

    btnConClaseSG = document.querySelectorAll('.selected-genre-btn');
    btnConClaseSG.forEach((btn) => {
        (!btnsGenerosSeleccionados.includes(btn)) && deseleccionarGenerosDOM(btn);
    });
};


