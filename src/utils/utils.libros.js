import { leerDatos } from "../db/fileManager.js";

export function getLibrobyID(id) {
  const data = leerDatos();
  let input = Number(id);
  const libro = data.libros.find((libro) => libro.id == input);
  const index = data.libros.findIndex((libro) => libro.id == input);
  return { libro: libro, index: index };
}
export function createID(campo) {
  //Campo debe corresponder a un valor del objeto .json EJ: "libros", "prestamos"
  const data = leerDatos();
  const array = data[campo];
  let newIndex = 0;
  if (!Array.isArray(array) || array.length === 0) {
    newIndex = 1;
  } else {
    const ultimoId = array[array.length - 1].id;
    newIndex = ultimoId + 1;
  }
  return newIndex;
}
export function generarFechaActual() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
