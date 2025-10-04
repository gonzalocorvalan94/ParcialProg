//logica del crud
import { Libro } from '../model/libros.models.js';
import {
  validarTitulo,
  validarAutor,
  validarGenero,
  validarEmail,
  validarNombre,
  validarNumero,
  validarDireccion,
  validarDNI,
} from '../validators/validators.libros.js';
import fs from 'fs';
import path from 'path';
// funcion para leer el archivo. Devuelve todo el objeto del archivo data.json
import PromptSync from 'prompt-sync';
import { leerDatos, guardar } from '../db/fileManager.js';
const prompt = PromptSync();
import chalk from 'chalk';

//Registro de usuario

function listarUsuarios() {
  let data = leerDatos();

  const clientes = data.clientes;

  if (!clientes || clientes.length === 0) {
    console.error(chalk.red('No hay clientes registrados'));
    return;
  }

  clientes.forEach((usuarios, index) => {
    console.log(
      chalk.blue(`
      ${index + 1}. ${clientes.nombre} - DNI: ${clientes.dni} - Tel: ${
        clientes.telefono
      } - Dirección: ${clientes.direccion}
      `)
    );
  });
}

function registrarCliente() {
  const data = leerDatos();

  let nombre = prompt(chalk.blue(`Ingrese el nombre del usuario: `));
  while (!validarNombre(nombre)) {
    nombre = prompt(chalk.red(`Ingrese un nombre válido: `));
  }

  let DNI = prompt(chalk.blue(`Ingrese el DNI del usuario: `));
  while (!validarDNI(DNI)) {
    DNI = prompt(chalk.red(`Ingrese un DNI válido: `));
  }

  let tel = prompt(chalk.blue(`Ingrese el teléfono del usuario: `));
  while (!validarNumero(tel)) {
    tel = prompt(
      chalk.red(`Teléfono inválido. Ingrese nuevamente (solo números)`)
    );
  }

  let direccion = prompt(chalk.blue(`Ingrese la dirección del usuario: `));
  while (!validarDireccion(direccion)) {
    direccion = prompt(
      chalk.red(`Dirección inválida. Ingrese una dirección válida`)
    );
  }

  const nuevoCliente = new Usuario(nombre, DNI, tel, direccion);
  data.clientes.push(nuevoCliente);
  guardar(data);

  console.log(chalk.green(`Se creó el cliente correctamente`));
}

function modificarCliente() {}
function eliminarCliente() {}

//prestamo de usuario

function listarLibros() {
  //esto es un get
}

function consultarPorNombre() {
  //esto es un get por nombre
}

function crearPrestamo() {
  //post por nombre y datos de usuario
}

function devolverLibro() {
  //delete dni de usuario y nombre del libro
}

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
