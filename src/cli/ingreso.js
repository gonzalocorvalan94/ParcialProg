import chalk from 'chalk';
import PromptSync from 'prompt-sync';
import { leerDatos } from '../db/fileManager.js';
import { registrarCliente } from '../service/service.clientes.js';

const prompt = PromptSync();

export function ingreso(DNIingresado) {
  const data = leerDatos();
  let usuario = data.clientes.find((u) => u.dni === DNIingresado);

  if (!usuario) {
    console.log(
      chalk.blue('Usted no se encuentra registrado. Vamos a hacerlo')
    );
    const resultado = registrarCliente(DNIingresado); //

    if (resultado === false) {
      console.log(chalk.yellow('Operación cancelada. Volviendo al inicio...'));
      return null;
    }

    usuario = resultado;
  }

  console.log(chalk.blue(`Bienvenido, ${usuario.nombre}!`));
  return usuario;
}
