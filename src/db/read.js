import fs from "fs"
export function read() {
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)

	const filePath = path.join(__dirname, "data.json")

	const data = fs.readFileSync(filePath, "utf-8")
	return data
}
