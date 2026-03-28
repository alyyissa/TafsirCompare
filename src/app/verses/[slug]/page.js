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

  if (!verse) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold uppercase tracking-widest text-red-500">
        Entry Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-slate-50 text-slate-900">
      <div className="px-4 md:px-8 max-w-5xl mx-auto space-y-10">
        
        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm mb-10">
          
          <div className="my-6">
          <Link 
            href="/verses" 
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:text-coprimary transition-colors"
          >
            ← Back to library
          </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-primary mb-6 leading-tight">
            {verse.title}
          </h1>
          
          <div className="h-1.5 w-20 bg-primary rounded-full mb-8"></div>
          
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            {verse.contextSignificance}
          </p>

          {verse.themes && verse.themes.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {verse.themes.map((theme, i) => (
                <span key={i} className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                  {theme}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-16 shadow-sm flex flex-col items-center justify-center text-center my-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 my-8">
            Original Scripture
          </h2>
          <div className="text-4xl md:text-6xl leading-[1.8] text-primary font-arabic" dir="rtl">
            {verse.arabicVerse}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-coprimary mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full shrink-0"></span>
              English Translation
            </h2>
            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
              {verse.translation}
            </p>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-coprimary mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-slate-300 rounded-full shrink-0"></span>
              Transliteration
            </h2>
            <p className="text-lg text-slate-500 italic font-serif leading-relaxed">
              {verse.transliteration}
            </p>
          </section>
        </div>

        {verse.exegetes && verse.exegetes.length > 0 && (
          <div className="pt-6">
            <h2 className="text-2xl font-bold uppercase text-primary px-4 my-6">
              Exegetical Commentary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verse.exegetes.map((item, i) => (
                <section key={i} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col h-full">
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">
                      Source {i + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-coprimary">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="grow">
                    <p className="text-slate-700 text-lg leading-relaxed my-6">
                      {item.text}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {verse.criticalAnalysis && (
          <section className="bg-coprimary text-white border border-coprimary rounded-3xl p-8 md:p-12 shadow-lg mt-10">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">
              Synthesis & Analysis
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-90">
              "{verse.criticalAnalysis.replace(/^"|"$/g, '')}"
            </p>
          </section>
        )}

      </div>
    </main>
  );
}