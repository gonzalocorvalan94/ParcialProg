//
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "data.json"); //(__dirname,'nombre_de_la_db')

export function leerDatos() {
  try {
    const data = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("No se encontro datos", error);
    return { libros: [], clientes: [], prestamos: [] };
  }
}

export function guardar(data) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("error al guardar:", error);
  }
}
