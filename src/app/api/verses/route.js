import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const directoryPath = path.join(process.cwd(), "content", "verses");
  if (!fs.existsSync(directoryPath)) return NextResponse.json([]);

  const fileNames = fs.readdirSync(directoryPath);

  const allVerses = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directoryPath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parts = fileContent.split("---");
    const metaBlock = parts[1] || "";
    
    // Title
    const title = metaBlock.match(/title:\s*"(.*)"/)?.[1] || metaBlock.match(/title:\s*(.*)/)?.[1];
    
    // Arabic Verse (Captures until transliteration starts)
    const arabic = metaBlock.match(/arabicVerse:\s*([\s\S]*?)(?=transliteration:)/)?.[1]?.trim();
    
    // Transliteration (Captures until translation starts)
    const translit = metaBlock.match(/transliteration:\s*([\s\S]*?)(?=translation:)/)?.[1]?.trim().replace(/^"|"$/g, '');
    
    // Translation (Captures until interpretersCount or context)
    const trans = metaBlock.match(/translation:\s*"(.*)"/)?.[1] || metaBlock.match(/translation:\s*([\s\S]*?)(?=interpretersCount:|contextSignificance:)/)?.[1]?.trim();
    
    // Count
    const count = metaBlock.match(/interpretersCount:\s*(\d+)/)?.[1];
    
    // Themes
    const themesMatch = metaBlock.match(/themes:[\s\S]*?(\n\s*-[\s\S]*?)(?=\n\w+:|$)/);
    const themes = themesMatch ? themesMatch[1].split('\n').map(t => t.replace('-','').trim().replace(/"/g,'')).filter(Boolean) : [];

    return { 
      slug, 
      title, 
      arabicVerse: arabic, 
      transliteration: translit,
      translation: trans, 
      interpretersCount: count,
      themes 
    };
  });

  return NextResponse.json(allVerses);
}