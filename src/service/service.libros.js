//logica del crud
import { Libro, Prestamo } from "../model/libros.models.js";
import {
  validarTitulo,
  validarAutor,
  validarGenero,
  validarEmail,
  validarNombre,
  validarNumero,
  validarDireccion,
  validar,
  validarDNI,
  validarFecha,
  validarPrestamoRepetido,
} from "../validators/validators.libros.js";
import fs from "fs";
import path from "path";
import { leerDatos, guardar } from "../db/fileManager.js";
import chalk from "chalk";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

//prestamo de usuario

function listarLibros() {
  console.log(chalk.green("==============="));

  try {
    const data = leerDatos();

    if (!data.libros || data.libros.length === 0) {
      console.log(chalk.red("No hay libros registrados."));
      return;
    }
    console.table(data.libros);
  } catch (err) {
    console.error(chalk.red("Error: ", err.message));
    return;
  }
}

function consultarPorNombre() {
  console.log(chalk.green("==============="));
  try {
    const data = leerDatos();

    const busqueda = validar(
      "Ingrese el título o parte del título del libro: ",
      validarTitulo
    );
    const resultados = data.libros.filter((l) =>
      l.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (resultados.length === 0) {
      console.log(chalk.red("No se encontraron libros con ese nombre."));
      return;
    }
    console.table(resultados);
  } catch (err) {
    console.error(chalk.red("Error: ", err.message));
    return;
  }
}

function crearPrestamo() {
  console.log(chalk.green("==============="));
  try {
    const data = leerDatos();

    const nombreCliente = validar(
      "Ingrese nombre del cliente: ",
      validarNombre
    );
    const dniCliente = validar("Ingrese DNI del cliente: ", validarDNI);

    const tituloLibro = validar(
      "Ingrese el titulo del libro a prestar: ",
      validarTitulo
    );
    const fechaEntrega = validar(
      "Ingrese la fecha de entrega(DD/MM/AAAA)",
      validarFecha
    );
    const fechaDevolucion = validar(
      "Ingrese la fehca de devolucion (DD/MM/AAAA)",
      validarFecha
    );

    const cliente = data.clientes.find(
      (c) => c.nombre === nombreCliente && c.dni === dniCliente
    );
    if (!cliente) {
      console.log(chalk.red("Cliente no encontrado."));
      return;
    }
    console.log(chalk.yellow("Libros disponibles"));
    console.table(data.libros);

    const libro = data.libros.find((l) => l.titulo === tituloLibro);
    if (!libro) {
      console.log(chalk.red("Libro no encontrado."));
      return;
    }

    if (!validarPrestamoRepetido(cliente, libro, data.prestamos)) {
      console.log(chalk.red("Ya esta prestado este libro."));
      return;
    }
    try {
      libro.modificarStock(-1); // se quita del stock del libro
    } catch (err) {
      console.log(chalk.red("Error: ", err.message));
      return;
    }

    const nuevoPrestamo = new Prestamo(
      cliente,
      [libro],
      fechaEntrega,
      fechaDevolucion
    );
    nuevoPrestamo.id = data.prestamos.length
      ? data.prestamos[data.prestamos.length - 1].id + 1
      : 1;

    data.prestamos.push(nuevoPrestamo);
    guardar(data);
    console.log(
      chalk.green(`Prestamo creado correctamente para ${cliente.nombre}`)
    );
  } catch (err) {
    console.error(chalk.red("Error: ", err));
    return;
  }
}

function devolverLibro() {
  console.log(chalk.green("==============="));
  try {
    const data = leerDatos();

    const nombreCliente = validar(
      "Ingrese nombre del cliente: ",
      validarNombre
    );
    const dniCliente = validar("Ingrese DNI del cliente: ", validarDNI);
    const tituloLibro = validar(
      "Ingrese titulo del libro a devolver: ",
      validarTitulo
    );

    const cliente = data.clientes.find(
      (c) => c.nombre === nombreCliente && c.dni === dniCliente
    );
    if (!cliente) {
      console.log(chalk.red("Cliente no encontrado."));
      return;
    }

    const indicePrestamo = data.prestamos.findIndex(
      (p) =>
        p.cliente.nombre === nombreCliente &&
        p.cliente.dni === dniCliente &&
        p.libros.some((l) => l.titulo === tituloLibro)
    );
    if (indicePrestamo === -1) {
      console.log(
        chalk.red("No se encontró un préstamo para este cliente con ese libro.")
      );
      return;
    }

    const libroPrestado = data.prestamos[indicePrestamo].libros[0];

    try {
      libroPrestado.modificarStock(1); // se agrega del stock del libro
    } catch (err) {
      console.log(chalk.red("Error: ", err.message));
      return;
    }

    data.prestamos.splice(indicePrestamo, 1);
    guardar(data);
    console.log(
      chalk.green(
        `Libro "${tituloLibro}" devuelto por ${nombreCliente} correctamente.`
      )
    );
  } catch (err) {
    console.error(chalk.red("Error: ", err));
    return;
  }
}

//Registro de usuario

function listarClientes() {}

function regristrarCliente() {
  //post de nuevo usuario
}

function modificarCliente() {}
function eliminarCliente() {}

//admin

function listarLibrosAdmin() {}

function agregarLibro() {
  //post
}

function modificarLibro() {
  //put por id
}

function eliminarLibro() {
  //delete por id
}
