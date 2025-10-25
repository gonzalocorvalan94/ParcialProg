// service.libros.js
import chalk from "chalk";
import PromptSync from "prompt-sync";
import { leerDatos, guardar } from "../db/fileManager.js";
import { Libro } from "../model/libros.models.js";
import { createID, getLibrobyID } from "../utils/utils.libros.js";
import {
  validarTitulo,
  validarAutor,
  validarGenero,
  validarID,
  validarPrecio,
  validar,
  validarStock,
} from "../validators/validators.libros.js";

const prompt = PromptSync();

export function listarLibros() {
  const data = leerDatos();

  if (!data.libros || data.libros.length === 0) {
    console.log(chalk.red("No hay libros registrados."));
    return;
  }

  console.table(data.libros);
}

export function consultarPorNombre() {
  const data = leerDatos();
  const busqueda = prompt(
    "Ingrese el título o parte del título del libro: "
  ).toLowerCase();
  const resultados = data.libros.filter((l) =>
    l.titulo.toLowerCase().includes(busqueda)
  );

  if (resultados.length === 0) {
    console.log(chalk.red("No se encontraron libros con ese nombre."));
    return;
  }

  console.table(resultados);
}

export function agregarLibro() {
  const data = leerDatos();
  let id = createID(),
    titulo = validar("titulo", validarTitulo),
    autor = validar("autor", validarAutor),
    genero = validar("genero", validarGenero),
    stock = Number(validar("stock", validarStock)),
    precio = Number(validar("precio", validarPrecio));
  const nuevoLibro = new Libro(id, titulo, autor, genero, stock, precio);

  data.libros.push(nuevoLibro);
  guardar(data);
  console.table(data.libros);

  console.log(chalk.green("¡Libro agregado correctamente!"));
  return true;
}

export function modificarLibro() {
  console.log(chalk.greenBright("Ingrese ID del libro a modificar"));

  const data = leerDatos();

  let id = Number(validar("ID", validarID));
  let libro = getLibrobyID(id);
  //ID devuelve un objeto con el libro y el index para el splice
  if (libro.libro) {
    let titulo = validar("titulo", validarTitulo),
      autor = validar("autor", validarAutor),
      genero = validar("genero", validarGenero),
      stock = Number(validar("stock", validarStock)),
      precio = Number(validar("precio", validarPrecio));
    const libroModificado = new Libro(id, titulo, autor, genero, stock, precio);
    data.libros.splice(libro.index, 1, libroModificado);
    guardar(data);
    console.table(data.libros);

    console.log(chalk.green("¡Libro modificado correctamente!"));

    return true;
  } else {
    console.error(chalk.red("No se encontro el libro con el id " + id));
    return false;
  }
}

export function eliminarLibro() {
  console.log(chalk.greenBright("Ingrese ID del libro a eliminar"));
  const data = leerDatos();

  let id = Number(validar("ID", validarID));
  let libro = getLibrobyID(id);
  if (libro.libro) {
    data.libros.splice(libro.index, 1);
    console.table(data.libros);
    guardar(data);
    console.table(data.libros);
    console.log(chalk.green("¡Libro eliminado correctamente!"));

    return true;
  } else {
    console.error(chalk.red("No se encontro el libro con el id " + id));
    return false;
  }
}
