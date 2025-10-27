import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { listarPrestamos } from '../service/service.prestamos.js';
import {
  agregarLibro,
  eliminarLibro,
  listarLibros,
  modificarLibro,
} from '../service/service.libros.js';

const prompt = PromptSync();

export function mostrarMenuAdmin() {
  console.log(
    chalk.green(`
  --- Menú Administrador ---
  1. Listar libros
  2. Agregar libro
  3. Modificar libro
  4. Eliminar libro
  5. Listar Prestamos
  6. Volver al menu anterior
  7. Salir
  `)
  );
}

export function manejarMenuAdmin() {
  let seguirEnAdmin = true;

  mostrarMenuAdmin();

  while (seguirEnAdmin) {
    let opcion_admin = prompt(chalk.blue('Ingrese una opción: '));

    switch (opcion_admin) {
      case '1':
        listarLibros();
        mostrarMenuAdmin();
        break;
      case '2':
        agregarLibro();
        mostrarMenuAdmin();
        break;
      case '3':
        modificarLibro();
        mostrarMenuAdmin();
        break;
      case '4':
        eliminarLibro();
        mostrarMenuAdmin();
        break;
      case '5':
        listarPrestamos();
        mostrarMenuAdmin();
        break;
      case '6':
        seguirEnAdmin = false;
        break;
      case '7':
        console.log(chalk.green('Hasta luego!'));
        return false;
      default:
        console.log(chalk.red('Opción inválida. Intente de nuevo.'));
    }
  }
  return true;
}
