//cosas utiles.
import { leerDatos, guardar } from "../db/fileManager.js"
// import PromptSync from "prompt-sync"
// let prompt = PromptSync()
// devuelve el objeto y el indice
export function getLibrobyID(id) {
	const data = leerDatos()
	let input = Number(id)
	const libro = data.libros.find((libro) => libro.id == input)
	const index = data.libros.finIndex((libro) => libro.id == input)
	return { libro: libro, index: index }
}
export function createID() {
	const data = leerDatos()
	const newIndex = data.libros[data.libros.length - 1].id + 1
	return newIndex
}
