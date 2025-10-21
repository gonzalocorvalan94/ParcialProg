import chalk from 'chalk';

import PromptSync from 'prompt-sync';

const prompt = PromptSync();

export function validarTitulo(titulo) {
  let clean = titulo.trim();
  if (!clean) {
    console.error(chalk.red('Titulo no valido'));
    return false;
  }
  return true;
}
export function validarAutor(autor) {
  let clean = autor.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red('Autor no valido'));
    return false;
  }
  return true;
}
export function validarGenero(genero) {
  let clean = genero.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red('Genero no valido'));
    return false;
  }
  return true;
}
// usuarios
export function validarNombre(nombre) {
  let clean = nombre.trim();
  if (!clean || clean.length < 3) {
    console.error(chalk.red('Nombre no valido'));

    return false;
  }
  return true;
}
export function validarEmail(email) {
  let clean = email.trim();
  const dominios = [
    '@gmail.com',
    '@gmail.com.ar',
    '@hotmail.com',
    '@hotmail.com.ar',
  ];
  const ExpresionRegular = new RegExp(`(${dominios.join('|')})$`, 'gi');

  //gi para que busque globalmente y sin excepciones de mayusculas o minusculas
  //$ para que sea el final del string
  if (!clean || clean.length <= 10) {
    console.error(chalk.red('Email no valido'));
    return false;
  }
  //si pasa la condicion se verifica que tenga un formato valido
  if (ExpresionRegular.test(clean) === false) {
    console.error(chalk.red('Email no valido'));
    return false;
  } else {
    return true;
  }
}
// console.log(validarEmail("gaspar@gmail.com")) devuelve true
export function validarNumero(telefono) {
  let clean = Number(telefono.trim());
  if (!clean || clean <= 6) {
    console.error(chalk.red('Telefono no valido'));
    return false;
  }
  return true;
}
export function validarDireccion(direccion) {
  if (typeof direccion !== 'string') {
    console.error(chalk.red('La dirección debe ser un texto'));
    return false;
  }

  const clean = direccion.trim();

  // Mínimo 5 caracteres
  if (clean.length < 5) {
    console.error(chalk.red('La dirección es demasiado corta'));
    return false;
  }

  // Solo se permiten letras, números, espacios y algunos signos comunes
  const regexCaracteresValidos = /^[a-zA-ZÀ-ÿ0-9\s.,°-]+$/;
  if (!regexCaracteresValidos.test(clean)) {
    console.error(chalk.red('La dirección contiene caracteres inválidos'));
    return false;
  }

  // Debe tener al menos una letra y un número
  const tieneLetra = /[a-zA-ZÀ-ÿ]/.test(clean);
  const tieneNumero = /\d/.test(clean);
  if (!tieneLetra || !tieneNumero) {
    console.error(
      chalk.red(
        'La dirección debe incluir letras y números (ej: "Av. Rivadavia 1234")'
      )
    );
    return false;
  }

  return true;
}

export function validarFecha(fecha) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/AAAA
  if (!regex.test(fecha)) {
    console.error(chalk.red('Fecha no válida. Formato esperado: DD/MM/AAAA'));
    return false;
  }

  return true;
}

export function validarDNI(DNI) {
  const clean = DNI.trim();
  const validos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (clean.length <= 7) {
    console.error(chalk.red('DNI inválido'));
    return false;
  }
  for (let i = 0; i < clean.length; i++) {
    if (!validos.includes(clean[i])) {
      console.error(chalk.red('DNI inválido'));
      return false;
    }
  }

  return true;
}

export function validarPrecio(precio) {
  let clean = Number(precio);
  if (!clean || clean <= 0) {
    console.error(chalk.red('Precio no valido'));
    return false;
  }
  return true;
}
export function validarStock(stock) {
  let clean = Number(stock);
  if (!clean || clean <= 0) {
    console.error(chalk.red('Stock no valido'));

    return false;
  }
  return true;
}

export function validar(datoValidar, validador) {
  let input = prompt('Ingrese ' + datoValidar + ': ');
  while (!validador(input)) {
    input = prompt('Ingrese ' + datoValidar + ': ');
  }
  return input;
}

export function validarID(id) {
  const num = Number(id);
  if (!num || num <= 0) {
    console.error(chalk.red('ID no válido'));
    return false;
  }
  return true;
}
