import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { manejarMenuAdmin } from './menuAdmin.js';
import { manejarMenuUsuario } from './menuUsuario.js';
import { validarDNI } from '../validators/validators.libros.js';
import { PASSWORD } from '../utils/constantes.js';
import { ingreso } from './ingreso.js';
import { menuActivo } from '../utils/constantes.js';

const prompt = PromptSync();
menuActivo.activo = true;

export function menu() {
  let DNIingresado = prompt(
    chalk.blue(`Bienvenido a nuestra libreria. Ingrese su documento: `)
  );

  while (!validarDNI(DNIingresado)) {
    DNIingresado = prompt(chalk.red('Intente nuevamente: '));
  }

  const usuarioActual = ingreso(DNIingresado);
  if (!usuarioActual) {
    return menu();
  }

  while (menuActivo.activo) {
    let opcion = prompt(
      chalk.blue(
        'Si usted es administrador, ingrese la contraseña. Sino, presione enter: '
      )
    );

    if (opcion === PASSWORD) {
      menuActivo.activo = manejarMenuAdmin();
    } else {
      menuActivo.activo = manejarMenuUsuario(usuarioActual);
    }
  }
}

