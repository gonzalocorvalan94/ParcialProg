import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { manejarMenuAdmin, mostrarMenuAdmin } from './menuAdmin.js';

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

export function manejarMenuUsuario(opcion) {
  switch (opcion) {
    case '1':
      console.log('Listar');
      break;
    case '2':
      console.log('Consultar');
      break;
    case '3':
      console.log('Pedir');
      break;
    case '4':
      console.log('Devolver');
      break;
    case '5':
      console.log(chalk.green('Hasta luego!'));
      return false; //retornamos falso para que corte el bucle. No hace falta el break, el return mata todo
  }

  return true;
}
