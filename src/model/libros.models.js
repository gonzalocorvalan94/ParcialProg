//clase que maneja el objeto del libro
//clase que maneja el objeto del usuario
//clase que maneja el objeto de los prestamos
export class Libro {
  constructor(id, titulo, autor, genero, stock, precio) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.stock = stock;
    this.precio = precio;
  }
}

export class Usuario {
  constructor(nombre, dni, telefono, direccion) {
    this.nombre = nombre;
    this.dni = dni;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}

export class Prestamo {
  constructor(cliente, libros, fechaEntrega, fechaDevolucion) {
    this.cliente = cliente;
    this.libros = libros;
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
  }
}
