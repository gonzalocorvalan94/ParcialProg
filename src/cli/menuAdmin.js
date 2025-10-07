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
  5. Listar Prestamos
  6. Volver al menu anterior
  7. Salir
  `)
  );
}

export function manejarMenuAdmin() {
  let seguirEnAdmin = true;

  mostrarMenuAdmin(); // se muestra una vez al entrar

  while (seguirEnAdmin) {
    let opcion_admin = prompt(chalk.blue('Ingrese una opción: '));

    switch (opcion_admin) {
      case '1':
        console.log(chalk.blue('Listado de libros...')); //funcion correspondiente
        mostrarMenuAdmin(); // mostramos de nuevo solo después de una acción válida
        break;
      case '2':
        console.log(chalk.blue('Agregar libro...')); //funcion correspondiente
        mostrarMenuAdmin();
        break;
      case '3':
        console.log(chalk.blue('Modificar libro...')); //funcion correspondiente
        mostrarMenuAdmin();
        break;
      case '4':
        console.log(chalk.blue('Eliminar libro...')); //funcion correspondiente
        mostrarMenuAdmin();
        break;
      case '5':
        console.log(chalk.blue('Listar prestamos')); //funcion correspondiente
        break;
      case '6':
        seguirEnAdmin = false; // volver al menú usuario
        break;
      case '7':
        console.log(chalk.green('Hasta luego!'));
        return false; // cortar todo el programa
      default:
        console.log(chalk.red('Opción inválida. Intente de nuevo.'));
    }
  }
  return true;
}
