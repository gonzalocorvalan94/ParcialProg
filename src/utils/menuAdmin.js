import chalk from 'chalk';
import PromptSync from 'prompt-sync';
const prompt = PromptSync();

export function mostrarMenuAdmin() {
  console.log(
    chalk.green(`
  --- Menú Administrador ---
  1. Listar libros
  2. Agregar libro
  3. Modificar libro
  4. Eliminar libro
  5. Volver al menu anterior
  6. Salir
  `)
  );
}

export function manejarMenuAdmin(opcion_admin) {
  let seguirEnAdmin = true;
  while (seguirEnAdmin) {
    //necesitamos este bucle para que cicle hasta que ingrese una opcion valida
    switch (opcion_admin) {
      case '1':
        /* listar libros */ break;
      case '2':
        /* agregar */ break;
      case '3':
        /* modificar */ break;
      case '4':
        /* eliminar */ break;
      case '5':
        seguirEnAdmin = false;
        break; //no hace nada, pero el bucle hace que vuelva al menu anterior
      case '6':
        console.log(chalk.green('Hasta luego!'));
        return false; //retornamos falso para que se corte el bucle. No hace falta el break, el return mata todo

      default:
        console.log(chalk.red('Opción inválida'));
      //si marca opcion invalida, se muestra todo el menu de nuevo
    }

    if (seguirEnAdmin) {
      opcion_admin = prompt(chalk.blue('Ingrese una opción: ')); //Aca vuelve a preguntar en caso de que ingrese opcion invalida
    }
  }
  return true;
}
