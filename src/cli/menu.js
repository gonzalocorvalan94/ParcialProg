import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { manejarMenuAdmin } from './menuAdmin.js';
import { manejarMenuUsuario, mostrarMenuUsuario } from './menuUsuario.js';
import { esOpcionValidaUsuario } from '../validators/validators.libros.js';

const prompt = PromptSync();
export const PASSWORD = 'admin';
let activo = true;

export function menu() {
  while (activo) {
    mostrarMenuUsuario();

    let opcion = prompt(
      chalk.blue(
        'Ingrese una opción o ingrese la contraseña de administrador: '
      )
    );

    while (!esOpcionValidaUsuario(opcion)) {
      opcion = prompt(
        chalk.red(
          'Opción inválida. Ingrese una opción o la contraseña de administrador: '
        )
      );
    }

    if (opcion === PASSWORD) {
      activo = manejarMenuAdmin();
    } else {
      activo = manejarMenuUsuario(opcion);
    }
  }
}

menu();
