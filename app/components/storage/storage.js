// Funciones para guardat y recuperar datos del localStorage

// Guardar en LS
const saveLocal = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));

// Recuperar datos del LS
const getLocalInfo = (clave) => JSON.parse(localStorage.getItem(clave));

export {saveLocal, getLocalInfo}