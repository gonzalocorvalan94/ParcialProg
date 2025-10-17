import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos } from '../db/fileManager.js';
import { registrarCliente } from '../service/service.libros.js';
import { menuActivo } from '../utils/constantes.js';

const prompt = PromptSync();

export function ingreso(DNIingresado) {
  const data = leerDatos();

  const usuario = data.clientes.find((u) => u.dni === DNIingresado);

 if (!usuario) {
  console.log(chalk.blue(`Usted no se encuentra registrado. Vamos a hacerlo`));
  const resultado = registrarCliente();

  if (resultado === false) return false; // ⬅️ si canceló, salimos
}

  console.log(chalk.blue(`Bienvenido!`));
}
