import fs from "fs";
import path from "path";
import matter from "gray-matter";

const versesDirectory = path.join(process.cwd(), "content/verses");

export function getAllVerses() {
  const files = fs.readdirSync(versesDirectory);

  return files.map((file) => {
    const filePath = path.join(versesDirectory, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return data;
  });
}