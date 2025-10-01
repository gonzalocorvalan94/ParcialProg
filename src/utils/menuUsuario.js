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
  let seguirEnUsuario = true;

  while (seguirEnUsuario) { //hacemos que el menu de usuario se pregunte constantemente hasta que marque algo valido
    switch (opcion) {
      case '1':
        /* listar libros */ break;
      case '2':
        /* consultar */ break;
      case '3':
        /* pedir*/ break;
      case '4':
        /* devolver */ 
      case '5':
        console.log(chalk.green('Hasta luego!'));
        return false; //retornamos falso para que corte el bucle. No hace falta el break, el return mata todo
      case 'admin':
        mostrarMenuAdmin();
        manejarMenuAdmin();
        return seguirEnUsuario = false;
      default:
        console.log(chalk.red('Opción inválida222'));
    }

    if (seguirEnUsuario) {
      opcion = prompt(
        chalk.blue(
          'Ingrese una opcion o ingrese la contraseña de administrador: ' //aca pregunta de nuevo
        )
      );
    }
  }
  return true;
}