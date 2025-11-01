// service.libros.js
import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos, guardar } from '../db/fileManager.js';
import { Prestamo } from '../model/libros.models.js';
import {
  validarTitulo,
  validarFechaDevolucion,
  validar,
} from '../validators/validators.libros.js';
import { generarFechaActual } from '../utils/utils.libros.js';
import { createID } from '../utils/utils.libros.js';

const prompt = PromptSync();

export function crearPrestamo(usuario) {
  const data = leerDatos();
  const cliente = data.clientes.find((c) => c.dni === usuario.dni);

  if (!cliente) {
    console.log(chalk.red('Cliente no encontrado.'));
    return;
  }

  const tituloLibro = validar(
    'Ingrese el título del libro que desea ',
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

  const fechaPrestamo = generarFechaActual();

  const fechaDevolucion = validar(
    'la fecha de devolución (DD/MM/AAAA): ',
    validarFechaDevolucion
  );

  const nuevoId = createID('prestamos');

  const nuevoPrestamo = new Prestamo(
    nuevoId,
    cliente,
    libro,
    fechaPrestamo,
    fechaDevolucion
  );

  data.prestamos.push(nuevoPrestamo);
  guardar(data);

  console.log(
    chalk.green(
      `Préstamo creado correctamente para ${cliente.nombre}. El precio es de $${libro.precio}`
    )
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
