"use client";

import React, { useState, useEffect } from "react";
import VerseCard from "../../../components/subComponent/VerseCard";

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

  return (
    <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-32 text-slate-900">
      
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-12">
        <div className="max-w-screen-2xl mx-auto border-l-[3px] border-primary pl-6 md:pl-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary mb-4 uppercase leading-none">
            The Verses
          </h1>
          <p className="text-slate-500 text-sm md:text-lg font-medium max-w-xl leading-relaxed font-serif italic">
            A vertical archive of linguistic precision. Each entry represents a "Locker" of thematic depth and exegetical analysis.
          </p>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          <aside className="hidden lg:flex flex-col w-72 sticky top-32 h-[calc(100vh-160px)]">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6 shrink-0">
              Archive Index
            </p>
            
            <nav className="flex-1 overflow-y-auto overflow-x-hidden pr-4 border-l border-slate-100 custom-scrollbar">
              <div className="flex flex-col">
                {allVerses.map((v) => (
                  <button
                    key={v.slug}
                    onClick={() => scrollToVerse(v.slug)}
                    className="w-full cursor-pointer group relative text-left pl-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-all border-l-2 border-transparent hover:border-primary -ml-[1px] whitespace-nowrap"
                  >
                    {v.title.replace('Surah ', '')}
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          <div className="flex-1 flex flex-col gap-12 md:gap-20"> 
            {allVerses.map((verse, index) => (
              <section 
                key={verse.slug} 
                id={verse.slug} 
                className="scroll-mt-32"
              >
                <VerseCard 
                  index={index}
                  slug={verse.slug}
                  title={verse.title}
                  arabicVerse={verse.arabicVerse}
                  transliteration={verse.transliteration}
                  translation={verse.translation}
                  themes={verse.themes}
                  interpretersCount={verse.interpretersCount}
                />
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}