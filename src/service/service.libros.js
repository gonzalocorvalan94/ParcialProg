//logica del crud
import { Libro } from "../model/libros.models.js"
import {
	validarTitulo,
	validarAutor,
	validarGenero,
	validarEmail,
	validarNombre,
	validarNumero,
	validarDireccion,
	validar,
} from "../validators/validators.libros.js"
import fs from "fs"
import path from "path"
// funcion para leer el archivo. Devuelve todo el objeto del archivo data.json
