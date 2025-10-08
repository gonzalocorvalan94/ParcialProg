import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos } from '../db/fileManager.js';
import { registrarCliente } from '../service/service.libros.js';


const prompt = PromptSync();

export function ingreso(DNIingresado) {
  const data = leerDatos();

  const usuario = data.clientes.find((u) => u.dni === DNIingresado);

  if (!usuario) {
    console.log(`Usted no se encuentra registrado. Vamos a hacerlo`)

    registrarCliente();
  }

  console.log(`Bienvenido!`);
}
