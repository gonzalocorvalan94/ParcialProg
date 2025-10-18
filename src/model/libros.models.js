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
  constructor(id, cliente, libro, fechaEntrega, fechaDevolucion) {
    this.id = id;
    this.cliente = cliente.nombre; 
    this.libros = libro.titulo;    
    this.fechaEntrega = fechaEntrega;
    this.fechaDevolucion = fechaDevolucion;
    this.total = libro.precio;     
  }
}
