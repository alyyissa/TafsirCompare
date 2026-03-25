"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VersesPage() {
  const [allVerses, setAllVerses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/verses');
        const data = await response.json();
        setAllVerses(data);
      } catch (err) {
        console.error("Failed to fetch verses", err);
      }
    }
    fetchData();
  }, []);

  const scrollToVerse = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth"
      });
    }
  };

  if (allVerses.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
      <div className="text-[#004713] font-black tracking-[0.5em] uppercase text-xs animate-pulse">
        Initializing ProLocker Library...
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fdfdfd] pt-32 pb-40 text-slate-900">
      {/* ARCHITECTURAL HEADER */}
      <div className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="max-w-screen-2xl mx-auto border-l-[3px] border-[#004713] pl-10">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-[#004713] mb-8 uppercase leading-none">
            The Verses
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed font-serif italic">
            A vertical archive of linguistic precision. Each entry represents a "Locker" of thematic depth and exegetical analysis.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-24">
          
          {/* MINIMALIST SIDEBAR NAV */}
          <aside className="hidden lg:block w-64 sticky top-40 h-fit">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Archive Index</p>
            <nav className="flex flex-col border-l border-slate-100">
              {allVerses.map((v) => (
                <button
                  key={v.slug}
                  onClick={() => scrollToVerse(v.slug)}
                  className="group relative text-left pl-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-[#004713] transition-all border-l-2 border-transparent hover:border-[#004713] -ml-[1.5px]"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2">→</span>
                  {v.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* VERSE FEED */}
          <div className="flex-1 space-y-48">
            {allVerses.map((verse, index) => (
              <section 
                key={verse.slug} 
                id={verse.slug} 
                className="scroll-mt-40 transition-all duration-1000"
              >
                {/* THE BORDERED VERSE FRAME */}
                <div className="border-[1px] border-slate-200 rounded-[4rem] p-10 md:p-20 bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.03)] hover:border-[#004713]/20 transition-colors">
                  
                  {/* TOP NAV BAR WITHIN CARD */}
                  <div className="flex justify-between items-center mb-20">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-[1px] bg-[#004713]"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#004713]">
                        Entry {index + 1}
                      </span>
                    </div>
                    <span className="text-slate-200 font-black text-2xl tracking-tighter">
                      / {verse.slug.split('-').pop()}
                    </span>
                  </div>

                  {/* VERSE IDENTITY */}
                  <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase mb-6 leading-tight">
                      {verse.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span className="text-[#004713]">{verse.interpretersCount}</span> Commentaries Found
                      </div>
                    </div>
                  </div>

                  {/* ARABIC SCRIPTURE BOX */}
                  <div className="relative mb-20 group">
                    <div className="absolute -inset-4 bg-[#004713]/5 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <blockquote 
                      className="relative bg-[#fdfdfd] border border-slate-100 py-16 px-10 md:px-20 rounded-[3rem] text-center"
                      lang="ar" 
                      dir="rtl"
                    >
                      <div className="text-5xl md:text-7xl leading-[1.7] md:leading-[1.6] text-[#004713] font-arabic drop-shadow-sm">
                        {verse.arabicVerse}
                      </div>
                    </blockquote>
                  </div>

                  {/* CONTENT GRID */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 mb-20">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#004713]/40">Transliteration</h4>
                      <p className="text-slate-500 italic text-xl leading-relaxed font-serif border-l-2 border-slate-50 pl-8">
                        {verse.transliteration}
                      </p>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#004713]/40">Translation</h4>
                      <p className="text-slate-900 text-2xl font-bold leading-relaxed tracking-tight pl-8 border-l-2 border-slate-50">
                        {verse.translation}
                      </p>
                    </div>
                  </div>

                  {/* THEMATIC BADGES */}
                  <div className="pt-12 border-t border-slate-50 flex flex-wrap gap-3 mb-20">
                    {Array.isArray(verse.themes) && verse.themes.map((theme, i) => (
                      <span 
                        key={i} 
                        className="px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] border border-slate-100 rounded-xl text-slate-400 hover:text-[#004713] hover:border-[#004713] transition-all cursor-crosshair"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  {/* ACTION FOOTER */}
                  <footer className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <Link 
                      href={`/verses/${verse.slug}`}
                      className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#004713] transition-colors group"
                    >
                      Browse full analysis <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                    </Link>

                    <Link 
                      href={`/compare/${verse.slug}`}
                      className="w-full md:w-auto px-16 py-6 bg-[#004713] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-[#004713]/30 hover:scale-[1.02] active:scale-95 transition-all text-center"
                    >
                      Compare Interpretations
                    </Link>
                  </footer>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}