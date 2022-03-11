import { mostrarSeccion, ocultarSeccion} from "../utils/interfaz.js";
import { overlay } from "../utils/variables.js";

const menuLinks = document.querySelectorAll('.menu-link');
const homeLink = document.getElementById('home-link');
const acercaLink = document.getElementById('acerca-link');
const topLink = document.getElementById('top-link');
const tiendaLink = document.getElementById('tienda-link');
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu-section');
const closeMobileMenuBtn = document.querySelector('.close-mobile-menu');
const mediaQuery = window.matchMedia('(min-width: 872px)');


window.addEventListener('scroll', () => {
    activarLink();
});

menuBtn.addEventListener('click', () => {
    mostrarSeccion(overlay, mobileMenu);
});

closeMobileMenuBtn.addEventListener('click', () => {
    ocultarSeccion(overlay, mobileMenu);
});


mediaQuery.addEventListener('change', () => {
    if(mediaQuery.matches) {
        ocultarSeccion(overlay, mobileMenu);
    };
});

mobileMenu.addEventListener('click', (e) => {
    e.target.classList.contains('mobile-menu-link') && ocultarSeccion(overlay, mobileMenu);
})

export const activarLink = () => {
    if(window.innerHeight < 450) {
        menuLinks.forEach((link) => {
            link.classList.contains('menu-highlight') && link.classList.remove('menu-highlight');
        });
    } else if (window.innerHeight < 500) {
        if(window.scrollY < 450) {
            aplicarClaseActiva('home-link', homeLink);
        } else if(window.scrollY < 1150) {
            aplicarClaseActiva('acerca-link', acercaLink);
        } else if (window.scrollY < 1980) {
            aplicarClaseActiva('top-link', topLink);
        } else if (window.scrollY < 3136) {
            aplicarClaseActiva('tienda-link', tiendaLink);
        }
    } else if (window.innerHeight < 712) {
        if(window.scrollY < 500) {
            aplicarClaseActiva('home-link', homeLink);
        } else if(window.scrollY < 1100) {
            aplicarClaseActiva('acerca-link', acercaLink);
        } else if (window.scrollY < 1800) {
            aplicarClaseActiva('top-link', topLink);
        } else if (window.scrollY < 3206) {
            aplicarClaseActiva('tienda-link', tiendaLink);
        }
    } else if (window.innerHeight >= 712) {
        if(window.scrollY < 650) {
            aplicarClaseActiva('home-link', homeLink);
        } else if(window.scrollY < 1250) {
            aplicarClaseActiva('acerca-link', acercaLink);
        } else if (window.scrollY < 1950) {
            aplicarClaseActiva('top-link', topLink);
        } else if (window.scrollY < 3356) {
            aplicarClaseActiva('tienda-link', tiendaLink);
        }
    } 
}


const aplicarClaseActiva = (idLink, selectedLink) => {
    menuLinks.forEach((link) => {
        link.id === idLink ? selectedLink.classList.add('menu-highlight') : (
            link.classList.contains('menu-highlight') && link.classList.remove('menu-highlight')
        );
    });
};


export { mobileMenu }