//clase que maneja el objeto del libro
export class Libro {
	constructor(id, titulo, autor, genero, stock, precio) {
		this.id = id
		this.titulo = titulo
		this.autor = autor
		this.genero = genero
		this.stock = stock
		this.precio = precio
	}
}
