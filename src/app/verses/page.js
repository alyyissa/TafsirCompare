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
    <main className="min-h-screen bg-[#fdfdfd] pt-32 pb-40 text-slate-900">
      
      {/* HEADER SECTION - Fixed mb-100 to mb-32 (or use custom [100px]) */}
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-10">
        <div className="max-w-screen-2xl mx-auto border-l-[3px] border-primary pl-6 md:pl-10">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-primary mb-6 uppercase leading-none">
            The Verses
          </h1>
          <p className="text-slate-500 text-base md:text-xl font-medium max-w-2xl leading-relaxed font-serif italic">
            A vertical archive of linguistic precision. Each entry represents a "Locker" of thematic depth and exegetical analysis.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block w-64 sticky top-40 h-fit">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Archive Index</p>
            <nav className="flex flex-col border-l border-slate-100">
              {allVerses.map((v) => (
                <button
                  key={v.slug}
                  onClick={() => scrollToVerse(v.slug)}
                  className="group relative text-left pl-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all border-l-2 border-transparent hover:border-primary -ml-[1.5px]"
                >
                  {v.title.replace('Surah ', '')}
                </button>
              ))}
            </nav>
          </aside>

          {/* VERSE FEED - Using flex-col and gap for reliable spacing */}
          <div className="flex-1 flex flex-col gap-16 md:gap-24"> 
            {allVerses.map((verse, index) => (
              <section 
                key={verse.slug} 
                id={verse.slug} 
                className="scroll-mt-40"
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
