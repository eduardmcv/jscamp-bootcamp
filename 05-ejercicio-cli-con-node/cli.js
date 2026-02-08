import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Función para formatear el tamaño de los archivos
function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Obtener argumentos
const args = process.argv.slice(2);

// Obtener el directorio (último argumento que no sea un flag)
const folder = args.find((arg) => !arg.startsWith("--")) ?? ".";

// Detectar flags
const hasAsc = args.includes("--asc");
const hasDesc = args.includes("--desc");
const hasFiles = args.includes("--files");
const hasFolders = args.includes("--folders");
const hasPermission = args.includes("--permission");

// Verificar permisos
if (!hasPermission) {
  console.error(
    "❌ Error: Debes habilitar los permisos necesarios para leer el directorio.",
  );
  console.error("💡 Usa el flag --permission para habilitar los permisos.");
  console.error("Ejemplo: node cli.js --permission");
  process.exit(1);
}

// Leer el directorio
let files;
try {
  files = await readdir(folder);
} catch (error) {
  console.error(`❌ No se pudo leer el directorio: ${folder}`);
  console.error(`Detalle del error: ${error.message}`);
  process.exit(1);
}

// Obtener información de cada archivo
const filePromises = files.map(async (file) => {
  const filePath = join(folder, file);
  let stats;

  try {
    stats = await stat(filePath);
  } catch (error) {
    return null;
  }

  const isDirectory = stats.isDirectory();
  const fileType = isDirectory ? "📁" : "📄";
  const fileSize = isDirectory ? "-" : formatSize(stats.size);

  return {
    name: file,
    isDirectory,
    fileType,
    fileSize,
  };
});

let filesInfo = await Promise.all(filePromises);

// Filtrar nulls por si hubo errores al obtener stats
filesInfo = filesInfo.filter((file) => file !== null);

// Filtrar por tipo (archivos o carpetas)
if (hasFiles && !hasFolders) {
  filesInfo = filesInfo.filter((file) => !file.isDirectory);
}
if (hasFolders && !hasFiles) {
  filesInfo = filesInfo.filter((file) => file.isDirectory);
}

// Ordenar
if (hasAsc) {
  filesInfo.sort((a, b) => a.name.localeCompare(b.name));
}
if (hasDesc) {
  filesInfo.sort((a, b) => b.name.localeCompare(a.name));
}

// Mostrar resultados
filesInfo.forEach((file) => {
  const paddedName = file.name.padEnd(25);
  const paddedSize = file.fileSize.padStart(10);
  console.log(`${file.fileType} ${paddedName} ${paddedSize}`);
});
