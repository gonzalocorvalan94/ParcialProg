import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { listarPrestamos } from '../service/service.prestamos.js';
import {
  agregarLibro,
  eliminarLibro,
  listarLibros,
  modificarLibro,
} from '../service/service.libros.js';
import { eliminarCliente, listarUsuarios, modificarCliente } from '../service/service.clientes.js';

const prompt = PromptSync();

export function mostrarMenuAdmin() {
  console.log(
    chalk.green(`
  --- Menú Administrador ---
  1. Listar libros
  2. Agregar libro
  3. Modificar libro
  4. Eliminar libro
  5. Listar prestamos
  6. Listar clientes
  7. Modificar clientes
  8. Eliminar clientes
  9. Volver al menu anterior
  10. Salir
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
        listarUsuarios();
        mostrarMenuAdmin();
        break;
      case '7':
        modificarCliente();
        mostrarMenuAdmin();
        break;
      case '8':
        eliminarCliente();
        mostrarMenuAdmin();
        break;
      case '9':
        seguirEnAdmin = false;
        break;
      case '10':
        console.log(chalk.green('Hasta luego!'));
        return false;
      default:
        console.log(chalk.red('Opción inválida. Intente de nuevo.'));
    }
  }
  return true;
}
