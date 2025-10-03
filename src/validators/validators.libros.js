// validadores
// el validador retornara true o false
import chalk from "chalk"
import { type } from "os"
import Promptsync from "prompt-sync"
import { PASSWORD } from "../cli/menu.js"

export function validarTitulo(titulo) {
	let clean = titulo.trim()
	if (!clean) {
		console.error(chalk.red("Titulo no valido"))
		return false
	}
	return true
}
export function validarAutor(autor) {
	let clean = autor.trim()
	if (!clean || clean.length < 3) {
		console.error(chalk.red("Autor no valido"))
		return false
	}
	return true
}
export function validarGenero(genero) {
	let clean = genero.trim()
	if (!clean || clean.length < 3) {
		console.error(chalk.red("Genero no valido"))
		return false
	}
	return true
}
// usuarios
export function validarNombre(nombre) {
	let clean = nombre.trim()
	if (!clean || clean.length < 3) {
		console.error(chalk.red("Nombre no valido"))

		return false
	}
	return true
}
export function validarEmail(email) {
	const clean = email.trim()
	const dominios = [
		"@gmail.com",
		"@gmail.com.ar",
		"@hotmail.com",
		"@hotmail.com.ar",
	]
	const ExpresionRegular = new RegExp(`(${dominios.join("|")})$`, "gi")

	//gi para que busque globalmente y sin excepciones de mayusculas o minusculas
	//$ para que sea el final del string
	if (!clean || clean.length <= 10) {
		console.error(chalk.red("Email no valido"))
		return false
	}
	//si pasa la condicion se verifica que tenga un formato valido
	if (ExpresionRegular.test(clean) === false) {
		console.error(chalk.red("Email no valido"))
		return false
	} else {
		return true
	}
}
// console.log(validarEmail("gaspar@gmail.com")) devuelve true
export function validarNumero(telefono) {
	if (!telefono || typeof telefono != "number" || telefono.length < 9) {
		console.error(chalk.red("Telefono no valido"))
		return false
	}
	return true
}
export function validarDireccion(direccion) {
	let clean = direccion.trim()
	if (!clean || clean.length < 3) {
		console.error(chalk.red("Direccion no valida"))

		return false
	}
	return true
}
function validarPrecio(precio) {
	if (!precio || typeof precio != "number" || precio <= 0) {
		console.error(chalk.red("Precio no valido"))

		return false
	}
	return true
}
function validarStock(stock) {
	if (!stock || typeof stock != "number" || stock <= 0) {
		console.error(chalk.red("Stock no valido"))

		return false
	}
	return true
}
export function esOpcionValidaUsuario(opcion) {
	const validas = ["1", "2", "3", "4", "5", PASSWORD]
	return validas.includes(opcion)
}

export function validar(datoValidar, validador) {
	let input = prompt("Ingrese " + datoValidar + ": ")
	while (!validador(input)) {
		console.log(datoValidar + " inválido, intente nuevamente")
		input = prompt("Ingrese " + datoValidar + ": ")
	}
	return input
}
