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
  validar,
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

  const nombre = validar("nombre del usuario", validarNombre);
  const DNI = validar("DNI del usuario", validarDNI);

  
  if (data.clientes.some(cliente => cliente.DNI === DNI)) {
    console.log(chalk.red("Ya existe un cliente con ese DNI."));
    return;
  }

  const tel = validar("teléfono del usuario", validarNumero);
  const direccion = validar("dirección del usuario", validarDireccion);

  const confirmacion = prompt(chalk.red("¿Está seguro que desea registrar el usuario? (s/n): "));
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue("Operación cancelada"));
    return;
  }

  const nuevoCliente = new Usuario(nombre, DNI, tel, direccion);
  data.clientes.push(nuevoCliente);
  guardar(data);

  console.log(chalk.green("Se creó el cliente correctamente"));
}


export function modificarCliente() {
  const data = leerDatos();

  const usuarioDNI = prompt(chalk.blue("Ingrese el DNI del usuario que desea modificar: "));

  const index = data.clientes.findIndex(usuario => usuario.DNI === usuarioDNI);

  if (index === -1) {
    console.log(chalk.red("Usuario no encontrado"));
    return;
  }

  const nombre = validar("nombre del usuario", validarNombre);
  const DNI = validar("DNI del usuario", validarDNI);
  const tel = validar("teléfono del usuario", validarNumero);
  const direccion = validar("dirección del usuario", validarDireccion);

  const confirmacion = prompt(chalk.red("¿Está seguro que desea modificar el usuario? (s/n): "));
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue("Operación cancelada"));
    return;
  }

  const usuarioModificado = new Usuario(nombre, DNI, tel, direccion);
  data.clientes[index] = usuarioModificado;

  guardar(data);

  console.log(chalk.green("Usuario modificado correctamente"));
}


export function eliminarCliente() {
  const data = leerDatos();

  const usuarioDNI = validar("DNI del usuario", validarDNI);

  const index = data.clientes.findIndex(usuario => usuario.DNI === usuarioDNI);

  if (index === -1) {
    console.log(chalk.red("Usuario no encontrado"));
    return;
  }

  const confirmacion = prompt(chalk.red("¿Está seguro que desea eliminar al usuario? (s/n): "));
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue("Operación cancelada"));
    return;
  }

  data.clientes.splice(index, 1);
  guardar(data);

  console.log(chalk.green("Usuario eliminado correctamente"));
}


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
