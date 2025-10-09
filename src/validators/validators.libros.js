// validadores
// el validador retornara true o false
import chalk from "chalk";
import { type } from "os";
import PromptSync from "prompt-sync";
import { PASSWORD } from "../cli/menu.js";
const prompt = PromptSync();

export function validarTitulo(titulo) {
  let clean = titulo.trim();
  if (!clean) {
    console.error(chalk.red("Titulo no valido"));
    return false;
  }
  return true;
}
export function validarAutor(autor) {
  let clean = autor.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red("Autor no valido"));
    return false;
  }
  return true;
}
export function validarGenero(genero) {
  let clean = genero.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red("Genero no valido"));
    return false;
  }
  return true;
}
// usuarios
export function validarNombre(nombre) {
  let clean = nombre.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red("Nombre no valido"));

    return false;
  }
  return true;
}
export function validarEmail(email) {
  const clean = email.trim();
  const dominios = [
    "@gmail.com",
    "@gmail.com.ar",
    "@hotmail.com",
    "@hotmail.com.ar",
  ];
  const ExpresionRegular = new RegExp(`(${dominios.join("|")})$`, "gi");

  //gi para que busque globalmente y sin excepciones de mayusculas o minusculas
  //$ para que sea el final del string
  if (!clean || clean.length <= 10) {
    console.error(chalk.red("Email no valido"));
    return false;
  }
  //si pasa la condicion se verifica que tenga un formato valido
  if (ExpresionRegular.test(clean) === false) {
    console.error(chalk.red("Email no valido"));
    return false;
  } else {
    return true;
  }
}
// console.log(validarEmail("gaspar@gmail.com")) devuelve true
export function validarNumero(telefono) {
  if (!telefono || typeof telefono != "number" || telefono.length < 9) {
    console.error(chalk.red("Telefono no valido"));
    return false;
  }
  return true;
}
export function validarDireccion(direccion) {
  let clean = direccion.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red("Direccion no valida"));

    return false;
  }
  return true;
}

export function validarDNI(DNI) {
  const clean = DNI.trim();
  const validos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (clean.length <= 7) return false;
  for (let i = 0; i < clean.length; i++) {
    if (!validos.includes(clean[i])) {
      return false;
    }
  }

  return true;
}

export function validarFecha(fecha) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/AAAA
  if (!regex.test(fecha)) {
    console.error(chalk.red("Fecha no válida. Formato esperado: DD/MM/AAAA"));
    return false;
  }
  // opcional: verificar si realmente es una fecha existente
  const [dia, mes, anio] = fecha.split("/").map(Number);
  const date = new Date(anio, mes - 1, dia);
  if (
    date.getFullYear() !== anio ||
    date.getMonth() !== mes - 1 ||
    date.getDate() !== dia
  ) {
    console.error(chalk.red("Fecha no válida"));
    return false;
  }
  return true;
}

export function esOpcionValidaUsuario(opcion) {
  const validas = ["1", "2", "3", "4", "5", PASSWORD];
  return validas.includes(opcion);
}

export function validar(datoValidar, validador) {
  let input = prompt("Ingrese " + datoValidar + ": ");
  while (!validador(input)) {
    console.log(datoValidar + " inválido, intente nuevamente");
    input = prompt("Ingrese " + datoValidar + ": ");
  }
  return input;
}
