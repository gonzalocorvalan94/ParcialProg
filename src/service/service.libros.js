//logica del crud
import { Libro } from "../model/libros.models.js"
import {
	validarTitulo,
	validarAutor,
	validarGenero,
	validarEmail,
	validarNombre,
	validarNumero,
	validarDireccion,
	validar,
} from "../validators/validators.libros.js"
import fs from "fs"
import path from "path"
// funcion para leer el archivo. Devuelve todo el objeto del archivo data.json
import PromptSync from 'prompt-sync';
import { leerDatos, guardar} from "../db/fileManager.js";
const prompt = PromptSync();
import chalk from "chalk";



//Registro de usuario

function listarUsuarios(){
  let data = leerDatos();

  const clientes = data.clientes;

  if(!clientes || clientes.length === 0){
  console.error(chalk.red("No hay clientes registrados"))
  return;
  }

  clientes.forEach((usuarios, index) => {
    console.log(chalk.blue(`
      ${index + 1}. ${clientes.nombre} - DNI: ${clientes.dni} - Tel: ${clientes.telefono} - Dirección: ${clientes.direccion}
      `))
  });
}

function regristrarCliente(){
  //post de nuevo usuario
}

function modificarCliente(){

}
function eliminarCliente(){

}

//prestamo de usuario

function listarLibros(){
//esto es un get
}

function consultarPorNombre(){
//esto es un get por nombre
}

function crearPrestamo(){
//post por nombre y datos de usuario
}

function devolverLibro(){
//delete dni de usuario y nombre del libro
}

//admin

function listarLibrosAdmin(){
  
}

function agregarLibro(){
//post 
}

function modificarLibro(){
//put por id
}

function eliminarLibro(){
  //delete por id
}

