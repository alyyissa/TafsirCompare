import fs from "fs";
import path from "path";
import matter from "gray-matter";

const exegetesDirectory = path.join(process.cwd(), "content/exegetes");

export function getExegetes() {
  const files = fs.readdirSync(exegetesDirectory);

  return files.map((file) => {
    const filePath = path.join(exegetesDirectory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);

    return data;
  });
}