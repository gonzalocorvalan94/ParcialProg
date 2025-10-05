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
  disminuirStock() {
    if (this.stock > 0) {
      this.stock -= 1;
    } else {
      throw new Error(`No hay stock disponible de "${this.titulo}"`);
    }
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
  constructor(id, cliente, libros, fechaEntrega, fechaDevolucion) {
    this.id = id;
    this.cliente = cliente.nombre;
    this.libros = libros.map((libro) => libro.titulo);
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
    this.total = this.calcularTotal(libros);
  }
  calcularTotal(libros) {
    return libros.reduce((acc, libro) => acc + libro.precio, 0);
  }
}
