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
  validar
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

export function registrarCliente() {
  const data = leerDatos();

  const nombre = validar(chalk.blue("Ingrese el nombre del usuario: "), validarNombre);
  const DNI = validar(chalk.blue("Ingrese el DNI del usuario: "), validarDNI);
  const tel = validar(chalk.blue("Ingrese el teléfono del usuario: "), validarNumero);
  const direccion = validar(chalk.blue("Ingrese la dirección del usuario: "), validarDireccion);

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
