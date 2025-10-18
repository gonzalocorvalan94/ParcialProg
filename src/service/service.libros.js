// service.libros.js
import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos, guardar } from '../db/fileManager.js';
import { Libro, Usuario, Prestamo } from '../model/libros.models.js';
import { createID, getLibrobyID } from '../utils/utils.libros.js';
import {
  validarTitulo,
  validarAutor,
  validarGenero,
  validarNombre,
  validarID,
  validarNumero,
  validarFecha,
  validarDireccion,
  validarPrecio,
  validarDNI,
  validar,
  validarStock,
} from '../validators/validators.libros.js';

const prompt = PromptSync();

// ---------------- CLIENTES ----------------

export function listarUsuarios() {
  const data = leerDatos();
  const clientes = data.clientes;

  if (!clientes || clientes.length === 0) {
    console.error(chalk.red('No hay clientes registrados'));
    return;
  }

  clientes.forEach((usuario, index) => {
    console.log(
      chalk.blue(
        `${index + 1}. ${usuario.nombre} - DNI: ${usuario.dni} - Tel: ${
          usuario.telefono
        } - Dirección: ${usuario.direccion}`
      )
    );
  });
}

export function registrarCliente() {
  const data = leerDatos();

  const nombre = validar('nombre del usuario', validarNombre);
  const dni = validar('DNI del usuario', validarDNI);

  if (data.clientes.some((c) => c.dni === dni)) {
    console.log(chalk.red('Ya existe un cliente con ese DNI.'));
    return;
  }

  const telefono = validar('teléfono del usuario', validarNumero);
  const direccion = validar('dirección del usuario', validarDireccion);

  const confirmacion = prompt(
    chalk.red('¿Está seguro que desea registrar el usuario? (s/n): ')
  );
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue('Operación cancelada'));
    return false;
  }

  const nuevoCliente = new Usuario(nombre, dni, telefono, direccion);
  data.clientes.push(nuevoCliente);
  guardar(data);

  console.log(chalk.green('Se creó el cliente correctamente'));
}

export function modificarCliente() {
  const data = leerDatos();
  const dni = prompt(
    chalk.blue('Ingrese el DNI del usuario que desea modificar: ')
  );
  const index = data.clientes.findIndex((c) => c.dni === dni);

  if (index === -1) {
    console.log(chalk.red('Usuario no encontrado'));
    return;
  }

  const nombre = validar('nombre del usuario', validarNombre);
  const nuevoDNI = validar('DNI del usuario', validarDNI);
  const telefono = validar('teléfono del usuario', validarNumero);
  const direccion = validar('dirección del usuario', validarDireccion);

  const confirmacion = prompt(
    chalk.red('¿Está seguro que desea modificar el usuario? (s/n): ')
  );
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue('Operación cancelada'));
    return;
  }

  const usuarioModificado = new Usuario(nombre, nuevoDNI, telefono, direccion);
  data.clientes[index] = usuarioModificado;
  guardar(data);

  console.log(chalk.green('Usuario modificado correctamente'));
}

export function eliminarCliente() {
  const data = leerDatos();
  const dni = validar('DNI del usuario', validarDNI);
  const index = data.clientes.findIndex((c) => c.dni === dni);

  if (index === -1) {
    console.log(chalk.red('Usuario no encontrado'));
    return;
  }

  const confirmacion = prompt(
    chalk.red('¿Está seguro que desea eliminar al usuario? (s/n): ')
  );
  if (confirmacion.toLowerCase() !== 's') {
    console.log(chalk.blue('Operación cancelada'));
    return;
  }

  data.clientes.splice(index, 1);
  guardar(data);
  console.log(chalk.green('Usuario eliminado correctamente'));
}

// ---------------- LIBROS ----------------

export function listarLibros() {
  const data = leerDatos();

  if (!data.libros || data.libros.length === 0) {
    console.log(chalk.red('No hay libros registrados.'));
    return;
  }

  console.table(data.libros);
}

export function consultarPorNombre() {
  const data = leerDatos();
  const busqueda = prompt(
    'Ingrese el título o parte del título del libro: '
  ).toLowerCase();
  const resultados = data.libros.filter((l) =>
    l.titulo.toLowerCase().includes(busqueda)
  );

  if (resultados.length === 0) {
    console.log(chalk.red('No se encontraron libros con ese nombre.'));
    return;
  }

  console.table(resultados);
}

export function agregarLibro() {
	const data = leerDatos()
	let id = createID(),
		titulo = validar("titulo", validarTitulo),
		autor = validar("autor", validarAutor),
		genero = validar("genero", validarGenero),
		stock = Number(validar("stock", validarStock)),
		precio = Number(validar("precio", validarPrecio))
	const nuevoLibro = new Libro(id, titulo, autor, genero, stock, precio)

	data.libros.push(nuevoLibro)
	guardar(data)
	console.table(data.libros)

	console.log(chalk.green("¡Usuario creado correctamente!"))
	return true
}

export function modificarLibro() {
  console.log(chalk.greenBright('Ingrese ID del libro a modificar'));

  const data = leerDatos();

  let id = Number(validar('ID', validarID));
  let libro = getLibrobyID(id);
  //ID devuelve un objeto con el libro y el index para el splice
  if (libro.libro) {
    let titulo = validar('titulo', validarTitulo),
      autor = validar('autor', validarAutor),
      genero = validar('genero', validarGenero),
      stock = Number(validar('stock', validarStock)),
      precio = Number(validar('precio', validarPrecio));
    const libroModificado = new Libro(id, titulo, autor, genero, stock, precio);
    data.libros.splice(libro.index, 1, libroModificado);
    guardar(data);
    console.table(data.libros);

    console.log(chalk.green('¡Usuario modificado correctamente!'));

    return true;
  } else {
    console.error(chalk.red('No se encontro el libro con el id ' + id));
    return false;
  }
}

export function eliminarLibro() {
  console.log(chalk.greenBright('Ingrese ID del libro a eliminar'));
  const data = leerDatos();

  let id = Number(validar('ID', validarID));
  let libro = getLibrobyID(id);
  if (libro.libro) {
    data.libros.splice(libro.index, 1);
    console.table(data.libros);
    guardar(data);
    console.table(data.libros);
    console.log(chalk.green('¡Usuario eliminado correctamente!'));

    return true;
  } else {
    console.error(chalk.red('No se encontro el libro con el id ' + id));
    return false;
  }
}

// ---------------- PRÉSTAMOS ----------------

export function crearPrestamo(usuario) {
  const data = leerDatos();
  const cliente = data.clientes.find((c) => c.dni === usuario.dni);

  if (!cliente) {
    console.log(chalk.red('Cliente no encontrado.'));
    return;
  }

  const tituloLibro = validar(
    'Ingrese el título del libro que desea: ',
    validarTitulo
  );
  const libro = data.libros.find(
    (l) => l.titulo.toLowerCase() === tituloLibro.toLowerCase()
  );

  if (!libro) {
    console.log(chalk.red('Libro no encontrado'));
    return;
  }

  if (libro.stock <= 0) {
    console.log(chalk.red('No hay stock disponible para este libro.'));
    return;
  }

  libro.stock--; // Reducir stock

  const fechaEntrega = validar(
    'Ingrese la fecha de entrega (DD/MM/AAAA): ',
    validarFecha
  );
  const fechaDevolucion = validar(
    'Ingrese la fecha de devolución (DD/MM/AAAA): ',
    validarFecha
  );

  const nuevoPrestamo = new Prestamo(
    data.prestamos.length
      ? data.prestamos[data.prestamos.length - 1].id + 1
      : 1,
    cliente,
    libro, // pasamos solo un libro
    fechaEntrega,
    fechaDevolucion
  );

  data.prestamos.push(nuevoPrestamo);
  guardar(data);

  console.log(
    chalk.green(`Prestamo creado correctamente para ${cliente.nombre}`)
  );
}

export function devolverLibro(usuario) {
  const data = leerDatos();
  const cliente = data.clientes.find((c) => c.dni === usuario.dni);

  if (!cliente) {
    console.log(chalk.red('Cliente no encontrado.'));
    return;
  }

  const tituloLibro = validar(
    'Ingrese título del libro a devolver: ',
    validarTitulo
  );
  const indicePrestamo = data.prestamos.findIndex(
    (p) => p.cliente === cliente.nombre && p.libros === tituloLibro
  );

  if (indicePrestamo === -1) {
    console.log(
      chalk.red('No se encontró un préstamo para este cliente con ese libro.')
    );
    return;
  }

  const libroReal = data.libros.find(
    (l) => l.titulo.toLowerCase() === tituloLibro.toLowerCase()
  );
  if (!libroReal) {
    console.log(chalk.red('No se encontró el libro en la base de datos.'));
    return;
  }

  libroReal.stock++;
  data.prestamos.splice(indicePrestamo, 1);
  guardar(data);

  console.log(chalk.green(`Libro "${tituloLibro}" devuelto correctamente.`));
}

export function listarPrestamos() {
  const data = leerDatos();
  if (!data.prestamos || data.prestamos.length === 0) {
    console.log(chalk.red('No hay préstamos registrados.'));
    return;
  }
  console.table(data.prestamos);
}
