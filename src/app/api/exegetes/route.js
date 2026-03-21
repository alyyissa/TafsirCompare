import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "content", "exegetes");
  const fileNames = fs.readdirSync(directoryPath);

  const allExegetes = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directoryPath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parts = fileContent.split("---");
    const metaLines = parts[1].trim().split("\n");
    const data = {};
    
    metaLines.forEach(line => {
      const [key, ...value] = line.split(":");
      if (key && value) data[key.trim()] = value.join(":").trim();
    });

    return { slug, ...data };
  });

  return NextResponse.json(allExegetes);
}