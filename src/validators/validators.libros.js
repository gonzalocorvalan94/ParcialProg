// validadores
// el validador retornara true o false
export function validarTitulo(titulo) {
	if (!titulo || typeof titulo != "string" || libro.id <= 0) {
		console.error("Titulo no valido")
		return false
	}
	return true
	// if (!libro.titulo || typeof libro.titulo != "string") {
	// 	err.push("Titulo no valido")
	// }
	// if (!libro.autor || typeof libro.autor != "string") {
	// 	err.push("Autor no valido")
	// }
	// if (!libro.genero || typeof libro.genero != "string") {
	// 	err.push("Genero no valido")
	// }

	// if (err.length != 0) {
	// 	console.error("Error/es: " + err.join(" | "))
	// 	return false
	// } else {
	// 	return true
	// }
}
