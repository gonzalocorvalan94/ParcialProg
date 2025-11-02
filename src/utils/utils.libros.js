import { leerDatos } from '../db/fileManager.js';

export function getLibrobyID(id) {
  const data = leerDatos();
  let input = Number(id);
  const libro = data.libros.find((libro) => libro.id == input);
  const index = data.libros.findIndex((libro) => libro.id == input);
  return { libro: libro, index: index };
}
export function createID(campo) {
  const data = leerDatos();
  const array = data[campo];

  const newId =
    array.length > 0 ? Math.max(...array.map((item) => item.id)) + 1 : 1;

  return newId;
}

export function generarFechaActual() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
