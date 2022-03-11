// Imports
import { mostrarSeccion, ocultarSeccion } from "../utils/interfaz.js";
import { saveLocal } from "../storage/storage.js";
import { overlay } from '../utils/variables.js';
import { stockLibros } from "../products/loadProducts.js";
import { fragment } from "../utils/variables.js";
import { verificarLS } from "../../main.js";

// Variables
export const seccionCarrito = document.querySelector('.cart');
const btnCarrito = document.querySelector('.cart-btn');
const btnCerrarCarrito = document.querySelector('.close-cart');
const productsContainer = document.querySelector('.products-container');
const cartContent = document.querySelector('.cart-content');
const templateLibroAgregado = document.getElementById('template-libro-agregado').content;
const contadorCarrito = document.querySelector('.cart-items');
const precioTotal = document.querySelector('.price');
const mensajeVacio = document.querySelector('.mensaje-carrito-vacio');
const btnPagar = document.querySelector('.buy-button');
let carrito = [];

btnCarrito.addEventListener('click', () => {
    mostrarSeccion(overlay, seccionCarrito);
});

btnCerrarCarrito.addEventListener('click', () => {
    ocultarSeccion(overlay, seccionCarrito);
});

// Agregar libros al carrito
productsContainer.addEventListener('click', (e) => {
    (e.target.classList.contains('shop-btn')) && actualizarCarrito(e);
});

cartContent.addEventListener('click', (e) => {
    carrito = verificarLS();
    if(e.target.classList.contains('remove-item') || e.target.classList.contains('fa-plus-circle') || e.target.classList.contains('fa-minus-circle')){
        const idLibro = parseInt(e.target.dataset.id);
        actualizarItemsCarrito(e, idLibro, carrito);
    };
    pintarCarrito(carrito);
});

btnPagar.addEventListener('click', () => {
    tramitarPedido();
});


// Función para agregar al carrito/aumentar la cantidad
export const actualizarCarrito = (e) => {
    carrito = verificarLS();

    const idLibroSeleccionado = parseInt(e.target.dataset.id);
    // Operador spread para no modificar el objeto original
    const libroSeleccionado = {...stockLibros.find((libro) => libro.id === idLibroSeleccionado)};

    (!carrito.some((libro) => libro.id === idLibroSeleccionado)) ? (
        carrito = [...carrito, libroSeleccionado],
        pintarCarrito(carrito),
        mostrarSeccion(overlay, seccionCarrito)
        ) : (
        Swal.fire({
            icon: 'warning',
            title: 'Libro ya agregado',
            text: '¿Desea agregarlo al carrito nuevamente?',
            showConfirmButton: true,
            confirmButtonText: 'Sí',
            showDenyButton: true,
            denyButtonText: 'No',
            denyButtonColor: '#bbb8e3',
            color: '#000'
        }).then ((respuesta) => {
            if(respuesta.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Libro agregado al carrito',
                    color: '#000'
                }).then (() => {
                    actualizarItemsCarrito(e, idLibroSeleccionado, carrito);
                    pintarCarrito(carrito);
                    mostrarSeccion(overlay, seccionCarrito);
                });
            };
        })
    );
};


// Aumentar / Disminuir cantidades de libros en carrito o eliminarlos
const actualizarItemsCarrito = (e, idLibro, carrito) => {
    const libroAActualizar = carrito.find((libro) => libro.id === idLibro);

    if(e.target.classList.contains('shop-btn') || e.target.classList.contains('fa-plus-circle') || e.target.classList.contains('top-book__shop-btn')){
        libroAActualizar.cantidad++;
    } else if(e.target.classList.contains('fa-minus-circle')) {
        libroAActualizar.cantidad--;
        (libroAActualizar.cantidad === 0) && eliminarLibro(libroAActualizar);
    } else if(e.target.classList.contains('remove-item')) {
        eliminarLibro(libroAActualizar);
    };
};

// Pintar carrito
export const pintarCarrito = (carrito) => {   
    cartContent.innerHTML = '';

    carrito.forEach((libro) => {
        // Desestructurar cada objeto almacenado en el arreglo carrito
        const {id, imagen, titulo, autor, cantidad} = libro;
        const precio = libro.precioDescuento ?? libro.precio;

        const clone = templateLibroAgregado.cloneNode(true);
        clone.querySelector('.cart-item').dataset.id = id;
        clone.querySelector('.item-img').src = imagen;
        clone.querySelector('.item-img').alt = titulo;
        clone.querySelector('.item-title').textContent = titulo;
        clone.querySelector('.item-author').textContent = autor;
        clone.querySelector('.remove-item').dataset.id = id;
        clone.querySelector('.fa-minus-circle').dataset.id = id;
        clone.querySelector('.item-amount').textContent = cantidad;
        clone.querySelector('.fa-plus-circle').dataset.id = id;
        clone.querySelector('.item-price').textContent = `$${precio * cantidad}`; 
    
        fragment.appendChild(clone);
    });
    cartContent.appendChild(fragment);

    saveLocal('carrito', carrito);
    modificarContCarrito(carrito);
    maipularMensajeYBoton();
    calcularTotal();
};

// Eliminar libro del carrito y reiniciar cantidad
const eliminarLibro = (libroAActualizar) => {
    // Eliminar del arreglo carrito
    carrito = carrito.filter((libro) => libro !== libroAActualizar);
};

// Contador del carrito
const modificarContCarrito = (carrito) => {
    const cantidad = carrito.reduce((acc, el) => acc + el.cantidad, 0);
    contadorCarrito.textContent = cantidad;
};

// Calcular total
const calcularTotal = () => {
    let total = 0;
    let totalPorItem;

    (cartContent.innerHTML === '') ? total = 0 : (
        totalPorItem = document.querySelectorAll('.item-price'),
        totalPorItem.forEach((item) => {
            let itemPrice = Number(item.textContent.replace('$', ''));
            total += itemPrice;
        })
    );
    precioTotal.textContent = `$${total}`;
};

// Mensaje carrito vacío
const maipularMensajeYBoton = () => {
    cartContent.innerHTML === '' ? (
        mensajeVacio.style.display = 'block',
        btnPagar.style.display = 'none'
    ) : (
        mensajeVacio.style.display = 'none',
        btnPagar.style.display = 'block'
    );
};

const tramitarPedido = () => {
    if(cartContent.innerHTML !== '') {
        ocultarSeccion(overlay, seccionCarrito);
        carrito = [];
        pintarCarrito(carrito);

        Swal.fire({
            icon: 'success',
            title: 'Pago exitoso',
            text: 'Gracias por tu compra',
            showConfirmButton: false,
            timer: 2500,
            padding: '1rem 1rem 2rem',
            iconColor: 'hsl(178, 60%, 32%)',
            color: '#000'
        });
    };
};
