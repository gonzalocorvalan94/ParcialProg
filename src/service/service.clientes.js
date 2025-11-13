import chalk from "chalk"
import PromptSync from "prompt-sync"
import { leerDatos, guardar } from "../db/fileManager.js"
import { Usuario } from "../model/libros.models.js"
import {
	validarNombre,
	validarNumero,
	validarDireccion,
	validarDNI,
	validar,
} from "../validators/validators.libros.js"
import pool from "../db/conection.js"

const prompt = PromptSync()

export function listarUsuarios() {
	const data = leerDatos()
	const clientes = data.clientes

	if (!clientes || clientes.length === 0) {
		console.error(chalk.red("No hay clientes registrados"))
		return
	}

	console.table(
		clientes.map((usuario) => ({
			Nombre: usuario.nombre,
			DNI: usuario.dni,
			Teléfono: usuario.telefono,
			Dirección: usuario.direccion,
		}))
	)
}

export function registrarCliente(dniExistente) {
	const data = leerDatos()

	const nombre = validar("nombre del usuario", validarNombre)

	const dni = dniExistente

	const telefono = validar("teléfono del usuario", validarNumero)
	const direccion = validar("dirección del usuario", validarDireccion)

	const confirmacion = prompt(
		chalk.red("¿Está seguro que desea registrar el usuario? (s/n): ")
	)

	if (confirmacion.toLowerCase() !== "s") {
		return false
	}

	const nuevoCliente = new Usuario(nombre, dni, telefono, direccion)
	data.clientes.push(nuevoCliente)
	guardar(data)

	console.log(chalk.green("Se creó el cliente correctamente"))
	return nuevoCliente
}

export function modificarCliente() {
	const data = leerDatos()
	const dni = prompt(
		chalk.blue("Ingrese el DNI del usuario que desea modificar: ")
	)
	const index = data.clientes.findIndex((c) => c.dni === dni)

	if (index === -1) {
		console.log(chalk.red("Usuario no encontrado"))
		return
	}

	const nombre = validar("nombre del usuario", validarNombre)

	// Validar DNI: que sea válido y que no exista en otro cliente
	let nuevoDNI
	while (true) {
		nuevoDNI = validar("DNI del usuario", validarDNI)

		// Si el DNI ingresado pertenece al mismo usuario que estamos modificando, está ok
		// Sino, verificamos que no exista en otro cliente
		const dniExiste = data.clientes.some(
			(c, i) => c.dni === nuevoDNI && i !== index
		)

		if (dniExiste) {
			console.log(
				chalk.red("Ese DNI ya pertenece a otro usuario. Intente otro.")
			)
		} else {
			break // DNI válido y único
		}
	}

	const telefono = validar("teléfono del usuario", validarNumero)
	const direccion = validar("dirección del usuario", validarDireccion)

	const confirmacion = prompt(
		chalk.red("¿Está seguro que desea modificar el usuario? (s/n): ")
	)
	if (confirmacion.toLowerCase() !== "s") {
		console.log(chalk.blue("Operación cancelada"))
		return
	}

	const usuarioModificado = new Usuario(nombre, nuevoDNI, telefono, direccion)
	data.clientes[index] = usuarioModificado
	guardar(data)

	console.log(chalk.green("Usuario modificado correctamente"))
}

export function eliminarCliente() {
	const data = leerDatos()
	const dni = validar("DNI del usuario", validarDNI)
	const index = data.clientes.findIndex((c) => c.dni === dni)

	if (index === -1) {
		console.log(chalk.red("Usuario no encontrado"))
		return
	}

	const confirmacion = prompt(
		chalk.red("¿Está seguro que desea eliminar al usuario? (s/n): ")
	)
	if (confirmacion.toLowerCase() !== "s") {
		console.log(chalk.blue("Operación cancelada"))
		return
	}

	data.clientes.splice(index, 1)
	guardar(data)
	console.log(chalk.green("Usuario eliminado correctamente"))
}
