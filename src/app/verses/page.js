"use client";

import React, { useState, useEffect } from "react";
import VerseCard from "../../../components/subComponent/VerseCard";

export default function VersesPage() {
  const [allVerses, setAllVerses] = useState([]);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/verses');
        const data = await response.json();
        setAllVerses(data);

        const hash = window.location.hash;
        if (hash) {
          const targetId = hash.replace('#', '');
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              window.scrollTo({
                top: element.offsetTop - 120,
                behavior: "smooth"
              });
            }
          }, 150);
        }
      } catch (err) {
        console.error("Failed to fetch verses", err);
      }
    }
    fetchData();

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-32 text-slate-900 relative">
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
            <div className="flex items-center justify-between mb-6 shrink-0 pr-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Archive Index
              </p>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                {allVerses.length} Verses
              </span>
            </div>
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

          <div className="flex-1 flex flex-col gap-8"> 
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

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 p-4 bg-primary text-white rounded-2xl shadow-2xl hover:bg-hover transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center justify-center group cursor-pointer"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transition-transform group-hover:-translate-y-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </main>
  );
}