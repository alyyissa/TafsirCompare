"use client";

import Link from "next/link";

const VerseCard = ({
  slug,
  title,
  arabicVerse,
  transliteration,
  translation,
  themes,
  interpretersCount,
}) => {
  return (
    <div className="bg-white rounded-[2rem] border-2 border-slate-200 p-6 md:p-8 shadow-sm hover:border-primary/30 transition-all duration-300 w-full max-w-4xl mx-auto flex flex-col gap-5">
      
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <h2 className="text-lg md:text-xl font-black text-coprimary uppercase tracking-tight">
          {title}
        </h2>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-100 shrink-0">
          <span className="text-primary">{interpretersCount}</span> 
          <span className="hidden sm:inline">Exegetes</span>
        </div>
      </div>

      <div className="py-6">
        <p 
          dir="rtl" 
          className="text-2xl md:text-3xl text-right text-primary leading-relaxed font-arabic"
        >
          {arabicVerse}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="px-1">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-1">Transliteration</h4>
          <p className="text-sm md:text-base italic text-slate-500 font-serif leading-relaxed">
            {transliteration}
          </p>
        </div>

        <div className="bg-slate-50/80 p-5 rounded-2xl border-l-[3px] border-primary">
          <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 mb-1 text-left">Translation</h4>
          <p className="text-slate-800 text-md md:text-lg leading-snug font-bold">
            {translation}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-2">
        {themes && themes.map((theme, index) => (
          <div 
            key={index}
            className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-white text-slate-400 border border-slate-200 rounded-full hover:border-primary hover:text-primary transition-colors cursor-default"
          >
            {theme}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-100">
        <Link 
          href={`/verses/${slug}`}
          className="px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-hover transition-all shadow-md shadow-primary/10"
        >
          Compare
        </Link>
      </div>
    </div>
  );
};

export default VerseCard;