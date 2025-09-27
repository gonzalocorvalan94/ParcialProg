import chalk from 'chalk';
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
const passwd = 'admin';
let salir = true;

while (salir) {
  console.log(
    chalk.blue(`
    --- Bienvenidos a nuestra biblioteca ---
    
    Seleccione una opción (1-4)

    1. Listar libros
    2. Consultar libro por nombre
    3. Devolver libro
    4. Salir

    Si usted es administrador, escriba la contraseña.
    `)
  );

  const opcion = prompt(chalk.blue("Ingrese una opción: "));

  
  if (opcion === passwd) {
    console.log(chalk.green(`
      --- Menú del Administrador ---
      1. Listar libros
      2. Agregar libro
      3. Modificar libro
      4. Eliminar libro
      5. Salir
    `));

    const opcion_admin = prompt(chalk.blue("Ingrese una opción (1-5): "));

    switch (opcion_admin) {
      case "1":
        //funcion de listar libros
        break;
      case "2":
        //funcion de agregar libro
        break;
      case "3":
        //funcion de moficiar libro
        break;
      case "4":
        //funcion de eliminar libro
        break;
      case "5":
        salir = false;
        break;
      default:
        console.log(chalk.red("Opción inválida"));
    }
  } else {
    switch (opcion) {
      case "1":
        //funcion de listar libros
        break;
      case "2":
        //funcion de consultar libro por nombre
        break;
      case "3":
        //funcion de devolver libro
        break;
      case "4":
        salir = false;
        break;
      default:
        console.log(chalk.red("Opción inválida (usuario)"));
    }
  }
}
