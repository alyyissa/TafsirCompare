import fs from "fs";
import path from "path";
import VerseCard from "../subComponent/VerseCard";

async function getSpecificVerse(slug) {
  try {
    const filePath = path.join(process.cwd(), "content", "verses", `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const parts = fileContent.split("---");
    const content = parts[1] || "";

    const extract = (regex) => {
      const match = content.match(regex);
      return match ? match[1].trim().replace(/^"|"$/g, '') : "";
    };

    const themesMatch = content.match(/themes:[\s\S]*?(\n\s*-[\s\S]*?)(?=\n\w+:|$)/);
    const themes = themesMatch 
      ? themesMatch[1].split('\n').map(t => t.replace('-', '').trim().replace(/"/g, '')).filter(Boolean)
      : [];

    return {
      slug,
      title: extract(/title:\s*(.*)/),
      arabicVerse: content.match(/arabicVerse:\s*([\s\S]*?)(?=transliteration:)/)?.[1]?.trim(),
      transliteration: extract(/transliteration:\s*([\s\S]*?)(?=translation:)/),
      translation: extract(/translation:\s*([\s\S]*?)(?=contextSignificance:)/),
      themes: themes,
      interpretersCount: 4 
    };
  } catch (e) {
    return null;
  }
}

export default async function FeaturedVerse({ slug }) {
  const verse = await getSpecificVerse(slug);

  if (!verse) return null;

  return (
    <section className="py-10 bg-[#fdfdfd]">
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-12">
        <div className="max-w-screen-2xl mx-auto border-l-[3px] border-primary pl-6 md:pl-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-primary uppercase">
            Featured Entry
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Deep-dive into linguistic precision
          </p>
        </div>
      </div>
      
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <VerseCard 
            index={0}
            slug={verse.slug}
            title={verse.title}
            arabicVerse={verse.arabicVerse}
            transliteration={verse.transliteration}
            translation={verse.translation}
            themes={verse.themes}
            interpretersCount={verse.interpretersCount}
          />
        </div>
      </div>
    </section>
  );
}