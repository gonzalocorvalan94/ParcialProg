import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { manejarMenuAdmin } from './menuAdmin.js';
import { manejarMenuUsuario, mostrarMenuUsuario } from './menuUsuario.js';
import { esOpcionValidaUsuario, validar, validarDNI } from '../validators/validators.libros.js';
import { PASSWORD } from '../utils/constantes.js';
import {ingreso} from './ingreso.js'
import { menuActivo } from '../utils/constantes.js';
const prompt = PromptSync();

menuActivo.activo = true;

export function menu() {
  while (menuActivo.activo) {

    let DNIingresado = prompt(chalk.blue(`Bienvenido: Ingrese su documento: `))
    while(!validarDNI(DNIingresado)){
      DNIingresado = prompt(chalk.red("Intente nuevamente: "))
    }
    ingreso(DNIingresado)

    if(!ingreso(DNIingresado)){
      menuActivo.activo = false
    }
    
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
      menuActivo.activo = manejarMenuAdmin();
    } else {
      menuActivo.activo = manejarMenuUsuario(opcion);
    }
  }
}

menu()