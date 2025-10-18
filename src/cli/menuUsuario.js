import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { crearPrestamo, devolverLibro } from '../service/service.prestamos.js';
import { listarLibros, consultarPorNombre } from '../service/service.libros.js';

const prompt = PromptSync();

export function mostrarMenuUsuario() {
  console.log(
    chalk.blue(`
--- Biblioteca ---
1. Listar libros
2. Consultar libro por nombre
3. Solicitar libro
4. Devolver libro
5. Salir
  `)
  );
}

export function manejarMenuUsuario(usuario) {
  let seguirEnUsuario = true;

  while (seguirEnUsuario) {
    mostrarMenuUsuario();
    const opcion = prompt(chalk.blue('Ingrese una opción: '));

    switch (opcion) {
      case '1':
        listarLibros();
        break;
      case '2':
        consultarPorNombre();
        break;
      case '3':
        crearPrestamo(usuario);
        break;
      case '4':
        devolverLibro(usuario);
        break;
      case '5':
        console.log(chalk.green('Hasta luego!'));
        seguirEnUsuario = false;
        return false;
      default:
        console.log(chalk.red('Opción inválida, intente nuevamente.'));
    }
  }

  return true;
}
