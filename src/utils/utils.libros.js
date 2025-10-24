import { leerDatos } from '../db/fileManager.js';

export function getLibrobyID(id) {
  const data = leerDatos();
  let input = Number(id);
  const libro = data.libros.find((libro) => libro.id == input);
  const index = data.libros.findIndex((libro) => libro.id == input);
  return { libro: libro, index: index };
}

export function createID() {
  const data = leerDatos();
  const newIndex =
    data.libros.length > 0 ? Math.max(...data.libros.map((l) => l.id)) + 1 : 1;
  return newIndex;
}
