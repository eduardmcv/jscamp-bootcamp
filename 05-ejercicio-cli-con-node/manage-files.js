import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, basename, extname } from "node:path";

const content = await readFile("file.txt", "utf-8");
console.log(content);

const outputDir = join("output", "files", "documents");
await mkdir(outputDir, { recursive: true });

const uppercaseContent = content.toUpperCase();
const outputFilePath = join(outputDir, "file-uppercase.txt");

console.log("The extension of the original file is:", extname("file.txt"));
console.log("The base name of the original file is:", basename("file.txt"));

await writeFile(outputFilePath, uppercaseContent);
console.log("File has been processed and saved as file-uppercase.txt");
