// validadores
// el validador retornara true o false
import chalk from "chalk"
import { type } from "os"
import Promptsync from "prompt-sync"
export function validarTitulo(titulo) {
	let clean = titulo.trim()
	if (!clean) {
		console.error("Titulo no valido")
		return false
	}
	return true
}
export function validarAutor(autor) {
	let clean = autor.trim()
	if (!clean || clean.length < 3) {
		console.error("Autor no valido")
		return false
	}
	return true
}
export function validarGenero(genero) {
	let clean = genero.trim()
	if (!clean || clean.length < 3) {
		console.error("Genero no valido")
		return false
	}
	return true
}
// usuarios
export function validarNombre(nombre) {
	let clean = nombre.trim()
	if (!clean || clean.length < 3) {
		console.error("Nombre no valido")

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
		console.error("Email no valido")
		return false
	}
	//si pasa la condicion se verifica que tenga un formato valido
	if (ExpresionRegular.test(clean) === false) {
		console.error("Email no valido")
		return false
	} else {
		return true
	}
}
// console.log(validarEmail("gaspar@gmail.com")) devuelve true
export function validarNumero(telefono) {
	if (!telefono || typeof telefono != "number" || telefono.length < 9) {
		console.error("Telefono no valido")
		return false
	}
	return true
}
export function validarDireccion(direccion) {
	let clean = titulo.trim()
	if (!clean || clean.length < 3) {
		console.error("Direccion no valida")

		return false
	}
	return true
}
export function validar(validador) {
	const input = prompt("Ingrese campo")
	while (!validador(input)) {
		input = prompt("Ingrese campo")
	}
	return input
}
