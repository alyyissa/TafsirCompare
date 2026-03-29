import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";

async function getVerseData(slug) {
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

    const exegetesSection = content.match(/exegetes:([\s\S]*?)(?=criticalAnalysis:|$)/)?.[1] || "";
    const exegetesArray = [];
    const blocks = exegetesSection.split("- name:");
    
    blocks.forEach(block => {
      if (block.trim()) {
        const lines = block.split('\n');
        const name = lines[0].trim().replace(/^"|"$/g, '');
        const textMatch = block.match(/text:\s*"([\s\S]*?)"(?=\n\s*-|\n|$)/) || block.match(/text:\s*([\s\S]*?)(?=\n\s*-|\n|$)/);
        if (name && textMatch) {
          exegetesArray.push({ name, text: textMatch[1].trim() });
        }
      }
    });

    return {
      title: extract(/title:\s*(.*)/),
      arabicVerse: content.match(/arabicVerse:\s*([\s\S]*?)(?=transliteration:)/)?.[1]?.trim(),
      transliteration: extract(/transliteration:\s*([\s\S]*?)(?=translation:)/),
      translation: extract(/translation:\s*([\s\S]*?)(?=contextSignificance:)/),
      contextSignificance: extract(/contextSignificance:\s*([\s\S]*?)(?=themes:)/),
      criticalAnalysis: extract(/criticalAnalysis:\s*([\s\S]*?)$/),
      themes: content.match(/themes:[\s\S]*?(\n\s*-[\s\S]*?)(?=\n\w+:|$)/)?.[1]
        .split('\n').map(t => t.replace('-','').trim().replace(/"/g,'')).filter(Boolean),
      exegetes: exegetesArray
    };
  } catch (e) {
    return null;
  }
}

export default async function VerseDetailPage({ params }) {
  const { slug } = await params;
  const verse = await getVerseData(slug);

  if (!verse) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-red-500">Entry Not Found</div>;

  return (
    <main className="min-h-screen pt-24 pb-32 bg-[#f8fafc] text-slate-900">
      <div className="w-full px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 space-y-8">
        
        <header className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm w-full">
          <Link href="/verses" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-hover mb-6 block transition-all">
            ← Back to library
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-coprimary uppercase leading-tight mb-4">
            {verse.title}
          </h1>
          <div className="h-1.5 w-[30%] bg-primary rounded-full mb-6"></div>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium w-full">
            {verse.contextSignificance}
          </p>
        </header>

        <section className="bg-white border border-slate-200 p-10 md:p-16 rounded-[2.5rem] text-center shadow-md w-full">
          <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 mb-8">Original Scripture</h2>
          <div className="text-3xl leading-[1.7] text-primary font-arabic">
            {verse.arabicVerse}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm w-full">
          <div className="p-8 md:p-14 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-coprimary flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                Transliteration
              </h3>
              <p className="text-slate-500 italic text-lg md:text-xl leading-relaxed font-serif pl-6 border-l-2 border-slate-100">
                {verse.transliteration}
              </p>
            </div>

            <div className="h-px bg-slate-100 w-full"></div>

            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-coprimary flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>
                English Translation
              </h3>
              <p className="text-slate-900 text-xl font-bold leading-snug pl-6 border-l-2 border-primary/20">
                {verse.translation}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 w-full">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-lg font-black uppercase tracking-widest text-coprimary">Exegetical Lockers</h2>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 w-full">
            {verse.exegetes.map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2rem] hover:border-primary/30 transition-all group shadow-sm w-full">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Source {i + 1}</span>
                    <h4 className="text-xl font-black text-coprimary leading-tight uppercase tracking-tighter">{item.name}</h4>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-slate-700 text-lg leading-relaxed font-medium border-l-2 pl-8 border-primary/30 ">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {verse.criticalAnalysis && (
          <section className="bg-gradient-to-br from-primary to-coprimary p-10 md:p-16 rounded-[2.5rem] text-white shadow-xl w-full">
            <h2 className="text-lg font-black uppercase tracking-[0.2em] text-white mb-6">Synthesis & Analysis</h2>
            <p className="text-lg md:text-2xl font-bold leading-snug tracking-tight italic">
              "{verse.criticalAnalysis.replace(/^"|"$/g, '')}"
            </p>
          </section>
        )}

      </div>
    </main>
  );
}