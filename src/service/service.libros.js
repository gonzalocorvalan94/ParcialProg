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

  console.log(chalk.yellow("Libros disponibles"));
  console.table(data.libros);
  let libro;

  do {
    const tituloLibro = validar(
      "Ingrese el titulo del libro a prestar: ",
      validarTitulo
    );
    libro = data.libros.find(
      (l) => l.titulo.toLowerCase() === tituloLibro.toLowerCase()
    );
    if (!libro) {
      console.log(chalk.red("Libro no encontrado."));
      return;
    }
  } while (!libro);

  try {
    //aparece any en modificicarStock
    libro.modificarStock(-1); // se quita del stock del libro
  } catch (err) {
    console.log(chalk.red("Error al modificar stock: ", err.message));
    return;
  }

  const fechaEntrega = validar(
    "Ingrese la fecha de entrega(DD/MM/AAAA)",
    validarFecha
  );
  const fechaDevolucion = validar(
    "Ingrese la fehca de devolucion (DD/MM/AAAA)",
    validarFecha
  );

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

  //funcion buscarprestamo=>
  const indicePrestamo = data.prestamos.findIndex(
    (p) =>
      p.cliente.dni === dniCliente &&
      p.libros.some((l) => l.titulo === tituloLibro)
  );

  //<=
  // const indexPrestamo = buscarPrestamo(dniCliente, tituloLibro, data.prestamos);
  const libroPrestado = data.prestamos[indicePrestamo].libros[0];
  //if(indexPrestamo === -1)
  if (indicePrestamo === -1) {
    console.log(
      chalk.red("No se encontró un préstamo para este cliente con ese libro.")
    );
    return;
  }

  try {
    libroPrestado.modificarStock(1); // se agrega del stock del libro
  } catch (err) {
    console.log(chalk.red("Error: ", err.message));
    return;
  }
  //data.prestamos.splice(indexPrestamo, 1);
  data.prestamos.splice(indicePrestamo, 1);
  guardar(data);
  console.log(
    chalk.green(
      `Libro "${tituloLibro}" devuelto por ${nombreCliente} correctamente.`
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
