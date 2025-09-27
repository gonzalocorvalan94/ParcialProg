// validadores
// el validador retornara true o false
import chalk from "chalk"
import { type } from "os"
import prompt from "prompt-sync"
export function validarTitulo(titulo) {
	let clean = titulo.trim()
	if (!clean || typeof clean != "string") {
		console.error("Titulo no valido")
		return false
	}
	return true
}
export function validarAutor(titulo) {
	let clean = titulo.trim()
	if (!clean || typeof clean != "string" || clean.length < 3) {
		console.error("Autor no valido")
		return false
	}
	return true
}
export function validarGenero(genero) {
	let clean = titulo.trim()
	if (!clean || typeof clean != "string" || clean.length < 3) {
		console.error("Genero no valido")
		return false
	}
	return true
}
// usuarios
export function validarNombre(nombre) {
	let clean = titulo.trim()
	if (!clean || typeof clean != "string" || clean.length < 3) {
		console.log("Nombre no valido")

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
	const ExpresionRegular = new RegExp(dominios.join("|"), "gi")
	//gi para que busque globalmente y sin excepciones de mayusculas o minusculas
	if (!clean || typeof clean != "string" || clean.length <= 10) {
		console.log("Email no valido")
		return false
	}
	//si pasa la condicion se verifica que tenga un formato valido
	if (ExpresionRegular.test(clean) === false) {
		console.log("Email no valido")
		return false
	} else {
		return true
	}
}
// console.log(validarEmail("gaspar@gmail.com")) devuelve true
export function validarNumero(telefono) {
	if (!telefono || typeof telefono != "number" || telefono.length < 9) {
		console.log("Telefono no valido")
		return false
	}
	return true
}
export function validarDireccion(direccion) {
	let clean = titulo.trim()
	if (!clean || typeof clean != "string" || clean.length < 3) {
		console.log("Direccion no valida")

		return false
	}
	return true
}
export function validar(validador) {
	const input = prompt("Ingrese campo")
}
