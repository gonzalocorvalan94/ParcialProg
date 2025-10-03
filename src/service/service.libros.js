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
	validarPrecio,
	validarStock,
	validar,
} from "../validators/validators.libros.js"
import fs from "fs"
import path from "path"
import PromptSync from "prompt-sync"
import { leerDatos, guardar } from "../db/fileManager.js"
const prompt = PromptSync()

// funcion para leer el archivo. Devuelve todo el objeto del archivo data.json

//Registro de usuario

function listarClientes() {}

function regristrarCliente() {
	//post de nuevo usuario
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

function listarLibrosAdmin() {
	const data = leerDatos()
	console.table(data.libros)
}

function agregarLibro() {
	const data = leerDatos()
	// se llaman los validadores sin parentesis para referirse a como mueven los datos y no lo que retornan
	let id = Date.now(),
		titulo = validar("titulo", validarTitulo),
		autor = validar("autor", validarAutor),
		genero = validar("genero", validarGenero),
		stock = validar("stock", validarStock),
		precio = validar("precio", validarPrecio)
	const nuevoLibro = new Libro(id, titulo, autor, genero, stock, precio)
	data.usuarios.push(nuevoLibro)
	guardar(data)

	//post
}

function modificarLibro() {
	//put por id
}

function eliminarLibro() {
	//delete por id
}
