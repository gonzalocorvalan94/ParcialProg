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





//Registro de usuario

function listarClientes(){

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

