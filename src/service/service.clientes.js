import chalk from "chalk";
import PromptSync from "prompt-sync";
import { leerDatos, guardar } from "../db/fileManager.js";
import { Usuario } from "../model/libros.models.js";
import {
  validarNombre,
  validarNumero,
  validarDireccion,
  validarDNI,
  validar,
} from "../validators/validators.libros.js";

const prompt = PromptSync();

export function listarUsuarios() {
  const data = leerDatos();
  const clientes = data.clientes;

  if (!clientes || clientes.length === 0) {
    console.error(chalk.red("No hay clientes registrados"));
    return;
  }

  clientes.forEach((usuario, index) => {
    console.log(
      chalk.blue(
        `${index + 1}. ${usuario.nombre} - DNI: ${usuario.dni} - Tel: ${
          usuario.telefono
        } - Dirección: ${usuario.direccion}`
      )
    );
  });
}

export function registrarCliente(dniExistente) {
  const data = leerDatos();

  const nombre = validar("nombre del usuario", validarNombre);

  const dni = dniExistente;

  const telefono = validar("teléfono del usuario", validarNumero);
  const direccion = validar("dirección del usuario", validarDireccion);

  const confirmacion = prompt(
    chalk.red("¿Está seguro que desea registrar el usuario? (s/n): ")
  );

  if (confirmacion.toLowerCase() !== "s") {
    return false;
  }

  const nuevoCliente = new Usuario(nombre, dni, telefono, direccion);
  data.clientes.push(nuevoCliente);
  guardar(data);

  console.log(chalk.green("Se creó el cliente correctamente"));
  return nuevoCliente;
}

export function modificarCliente() {
  const data = leerDatos();
  const dni = prompt(
    chalk.blue("Ingrese el DNI del usuario que desea modificar: ")
  );
  const index = data.clientes.findIndex((c) => c.dni === dni);

  if (index === -1) {
    console.log(chalk.red("Usuario no encontrado"));
    return;
  }

  const nombre = validar("nombre del usuario", validarNombre);
  const nuevoDNI = validar("DNI del usuario", validarDNI);
  const telefono = validar("teléfono del usuario", validarNumero);
  const direccion = validar("dirección del usuario", validarDireccion);

  const confirmacion = prompt(
    chalk.red("¿Está seguro que desea modificar el usuario? (s/n): ")
  );
  if (confirmacion.toLowerCase() !== "s") {
    console.log(chalk.blue("Operación cancelada"));
    return;
  }

  const usuarioModificado = new Usuario(nombre, nuevoDNI, telefono, direccion);
  data.clientes[index] = usuarioModificado;
  guardar(data);

  console.log(chalk.green("Usuario modificado correctamente"));
}

export function eliminarCliente() {
  const data = leerDatos();
  const dni = validar("DNI del usuario", validarDNI);
  const index = data.clientes.findIndex((c) => c.dni === dni);

  if (index === -1) {
    console.log(chalk.red("Usuario no encontrado"));
    return;
  }

  const confirmacion = prompt(
    chalk.red("¿Está seguro que desea eliminar al usuario? (s/n): ")
  );
  if (confirmacion.toLowerCase() !== "s") {
    console.log(chalk.blue("Operación cancelada"));
    return;
  }

  data.clientes.splice(index, 1);
  guardar(data);
  console.log(chalk.green("Usuario eliminado correctamente"));
}
