//logica del crud
import { Libro } from "../model/libros.models.js"
import { getLibrobyID, createID } from "../utils/utils.libros.js"
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
	validarID,
	validar,
} from "../validators/validators.libros.js"
import fs from "fs"
import path from "path"
import PromptSync from "prompt-sync"
import { leerDatos, guardar } from "../db/fileManager.js"
import chalk from "chalk"
import { create } from "domain"
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
	return true
}

function agregarLibro() {
	const data = leerDatos()
	// se llaman los validadores sin parentesis para referirse a como mueven los datos y no lo que retornan
	let id = createID(),
		titulo = validar("titulo", validarTitulo),
		autor = validar("autor", validarAutor),
		genero = validar("genero", validarGenero),
		stock = Number(validar("stock", validarStock)),
		precio = Number(validar("precio", validarPrecio))
	const nuevoLibro = new Libro(id, titulo, autor, genero, stock, precio)

	data.libros.push(nuevoLibro)
	guardar(data)
	console.table(data.libros)

	console.log(chalk.green("¡Usuario creado correctamente!"))
	return true
}

function modificarLibro() {
	console.log(chalk.greenBright("Ingrese ID del libro a modificar"))

	const data = leerDatos()

	let id = Number(validar("ID", validarID))
	let libro = getLibrobyID(id)
	//ID devuelve un objeto con el libro y el index para el splice
	if (libro.libro) {
		let titulo = validar("titulo", validarTitulo),
			autor = validar("autor", validarAutor),
			genero = validar("genero", validarGenero),
			stock = Number(validar("stock", validarStock)),
			precio = Number(validar("precio", validarPrecio))
		const libroModificado = new Libro(id, titulo, autor, genero, stock, precio)
		data.libros.splice(libro.index, 1, libroModificado)
		guardar(data)
		console.table(data.libros)

		console.log(chalk.green("¡Usuario modificado correctamente!"))

		return true
	} else {
		console.error(chalk.red("No se encontro el libro con el id " + id))
		return false
	}
}

function eliminarLibro() {
	console.log(chalk.greenBright("Ingrese ID del libro a eliminar"))
	const data = leerDatos()

	let id = Number(validar("ID", validarID))
	let libro = getLibrobyID(id)
	if (libro.libro) {
		data.libros.splice(libro.index, 1)
		console.table(data.libros)
		guardar(data)
		console.table(data.libros)
		console.log(chalk.green("¡Usuario eliminado correctamente!"))

		return true
	} else {
		console.error(chalk.red("No se encontro el libro con el id " + id))
		return false
	}
}
