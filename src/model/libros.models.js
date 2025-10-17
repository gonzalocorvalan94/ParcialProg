export class Libro {
  constructor(id, titulo, autor, genero, stock, precio) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.stock = stock;
    this.precio = precio;
  }
  modificarStock(cantidad) {
    if (this.stock + cantidad < 0) {
      throw new Error(`No hay suficiente stock de "${this.titulo}"`);
    }
    this.stock += cantidad;
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
    this.libros = libros.length > 0 ? libros[0].titulo : '';
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
    this.total = this.calcularTotal(libros);
  }
  calcularTotal(libros) {
    return libros.reduce((acc, libro) => acc + libro.precio, 0);
  }
}

