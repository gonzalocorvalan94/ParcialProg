import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { manejarMenuAdmin, mostrarMenuAdmin } from '../utils/menuAdmin.js';
import {
  manejarMenuUsuario,
  mostrarMenuUsuario,
} from '../utils/menuUsuario.js';

const prompt = PromptSync();
const PASSWORD = 'admin';
let activo = true;

export function menu() {
  while (activo) {
    //este bucle hace que siempre se muestre el menu a menos que toque la opcion de salir. Se podria ver despues como manejar esto. Pero de momento que quede asi.

    const opcion = prompt(
      chalk.blue(
        'Ingrese una opción o ingrese la contraseña de administrador: '
      )
    ); //no usemos number, porque no podria ingresar al menu de administrador si escribe "admin", ya que es un string

    if (opcion === PASSWORD) {
      //si escribe admin, mostramos el menu de administrador

      mostrarMenuAdmin();

      const opcion_admin = prompt(chalk.blue('Ingrese una opción: ')); //no usemos number, no es necesario.

      activo = manejarMenuAdmin(opcion_admin); //aca manejamos la actividad del bucle. Esta funcion devuelve true, salvo que elija salir, que devuelve falso y corta el menu
    } else {
      //sino, mostramos el menu de usuario

      activo = manejarMenuUsuario(opcion); //aca manejamos la actividad del bucle. Esta funcion devuelve true, salvo que elija salir, que devuelve falso y corta el menu
    }
  }
}

menu();