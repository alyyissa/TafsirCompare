import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "content", "verses");
  
  if (!fs.existsSync(directoryPath)) return NextResponse.json([]);

  const fileNames = fs.readdirSync(directoryPath);

  const allVerses = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directoryPath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parts = fileContent.split("---");
    const metaLines = parts[1]?.trim().split("\n") || [];
    const data = {};
    
    metaLines.forEach(line => {
      const [key, ...value] = line.split(":");
      if (key && value) {
        const k = key.trim();
        const v = value.join(":").trim();
        if (k === "themes") {
          data[k] = v.split(",").map(t => t.trim().replace(/[\[\]]/g, ""));
        } else {
          data[k] = v;
        }
      }
    });

    return { slug, ...data };
  });

  return NextResponse.json(allVerses);
}