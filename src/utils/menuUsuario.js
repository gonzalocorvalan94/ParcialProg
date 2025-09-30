import chalk from 'chalk';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

export function mostrarMenuUsuario() {
  console.log(
    chalk.blue(`
  --- Biblioteca ---
  1. Listar libros
  2. Consultar libro por nombre
  3. Devolver libro
  4. Salir
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
        /* devolver */ break;
      case '4':
        console.log(chalk.green('Hasta luego!'));
        return false; //retornamos falso para que corte el bucle. No hace falta el break, el return mata todo

      default:
        console.log(chalk.red('Opción inválida'));
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
