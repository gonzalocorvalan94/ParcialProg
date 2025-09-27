// validadores
// el validador retornara true o false
import chalk from "chalk"
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
