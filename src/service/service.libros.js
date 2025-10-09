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

  const data = leerDatos();

  if (!data.libros || data.libros.length === 0) {
    console.log(chalk.red("No hay libros registrados."));
    return;
  }
  console.table(data.libros);
}

function consultarPorNombre() {
  console.log(chalk.green("==============="));
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

function crearPrestamo() {
  console.log(chalk.green("==============="));

  const data = leerDatos();

  const dniCliente = validar("Ingrese DNI del cliente: ", validarDNI);
  const cliente = data.clientes.find((c) => c.dni === dniCliente);
  if (!cliente) {
    console.log(chalk.red("Cliente no encontrado."));
    return;
  }

  const tituloLibro = validar(
    "Ingrese el titulo del libro a prestar: ",
    validarTitulo
  );
  const libro = data.libros.find(
    (l) => l.titulo.toLowerCase() === tituloLibro.toLowerCase()
  );

  if (libro.stock <= 0) {
    console.log(chalk.red("No hay stock disponible para este libro."));
    return;
  }
  libro.stock--;

  const fechaEntrega = validar(
    "Ingrese la fecha de entrega(DD/MM/AAAA)",
    validarFecha
  );
  const fechaDevolucion = validar(
    "Ingrese la fehca de devolucion (DD/MM/AAAA)",
    validarFecha
  );

  const nuevoPrestamo = new Prestamo(
    null, //por el id, luego se asigna
    cliente,
    libro,
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
}

function devolverLibro() {
  console.log(chalk.green("==============="));
  const data = leerDatos();

  const dniCliente = validar("Ingrese DNI del cliente: ", validarDNI);
  const tituloLibro = validar(
    "Ingrese titulo del libro a devolver: ",
    validarTitulo
  );

  const cliente = data.clientes.find((c) => c.dni === dniCliente);
  if (!cliente) {
    console.log(chalk.red("Cliente no encontrado."));
    return;
  }

  const indicePrestamo = data.prestamos.findIndex(
    (p) =>
      p.cliente === cliente.nombre &&
      p.libros.toLowerCase() === tituloLibro.toLocaleLowerCase()
  );

  if (indicePrestamo === -1) {
    console.log(
      chalk.red("No se encontró un préstamo para este cliente con ese libro.")
    );
    return;
  }
  const libroReal = data.libros.find(
    (l) => l.titulo.toLowerCase() === tituloLibro.toLowerCase()
  );
  if (!libroReal) {
    console.log(chalk.red("No se encontró el libro en la base de datos."));
    return;
  }
  libroReal.stock++;

  data.prestamos.splice(indicePrestamo, 1);
  guardar(data);
  console.log(
    chalk.green(
      `Libro "${tituloLibro}" devuelto por ${cliente.nombre} correctamente.`
    )
  );
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

//pruebas
//listarLibros();
//consultarPorNombre();
crearPrestamo();
//devolverLibro();
