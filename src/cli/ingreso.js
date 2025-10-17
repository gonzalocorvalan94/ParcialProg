// ingreso.js
import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos } from '../db/fileManager.js';
import { registrarCliente } from '../service/service.libros.js';

const prompt = PromptSync();

export function ingreso(DNIingresado) {
  const data = leerDatos();
  let usuario = data.clientes.find((u) => u.dni === DNIingresado);

  if (!usuario) {
    console.log(
      chalk.blue(`Usted no se encuentra registrado. Vamos a hacerlo`)
    );
    registrarCliente(DNIingresado);
    const dataActualizado = leerDatos();
    usuario = dataActualizado.clientes.find((u) => u.dni === DNIingresado);
  }

  console.log(chalk.blue(`Bienvenido, ${usuario.nombre}!`));
  return usuario;
}
