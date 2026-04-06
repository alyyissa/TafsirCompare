"use client";

import React, { useState, useEffect } from "react";
import VerseCard from "../../../components/subComponent/VerseCard";

export default function VersesPage() {
  const [allVerses, setAllVerses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        console.error(err);
      }
    }
    fetchData();

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredVerses = allVerses.filter((verse) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      verse.title.toLowerCase().includes(searchStr) ||
      verse.translation.toLowerCase().includes(searchStr) ||
      verse.themes?.some(theme => theme.toLowerCase().includes(searchStr))
    );
  });

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
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfdfd] pt-24 pb-32 text-slate-900 relative">
      <div className={`fixed inset-0 z-[60] bg-white transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Archive Index</p>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-primary font-bold text-xs uppercase tracking-widest">Close</button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-2">
              {allVerses.map((v) => (
                <button
                  key={v.slug}
                  onClick={() => scrollToVerse(v.slug)}
                  className="w-full text-left py-4 px-6 rounded-2xl bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 active:bg-primary active:text-white transition-colors"
                >
                  {v.title.replace('Surah ', '')}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="border-l-[3px] border-primary pl-6 md:pl-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary uppercase leading-none">
              The Verses
            </h1>
            <p className="text-slate-500 text-sm md:text-lg font-medium max-w-xl leading-relaxed font-serif italic mt-4">
              A vertical archive of linguistic precision. Each entry represents a "Locker" of thematic depth.
            </p>
          </div>

          <div className="flex items-center border pl-4 gap-2 bg-white border-primary/20 h-[52px] rounded-full overflow-hidden max-w-md w-full shadow-sm focus-within:border-primary focus-within:shadow-md transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07451e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search for a verse, theme, or keyword..."
              className="w-full h-full outline-none text-sm text-primary placeholder:text-primary/50 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
          <aside className="hidden lg:flex flex-col w-72 sticky top-32 h-[calc(100vh-160px)]">
            <div className="flex items-center justify-between mb-6 shrink-0 pr-4">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Archive Index</p>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-2 py-0.5 rounded-md">{allVerses.length} Total</span>
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
            <div className="flex items-center justify-between mb-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                  Showing {filteredVerses.length} {filteredVerses.length === 1 ? 'Result' : 'Results'}
                </span>
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full transition-all cursor-pointer group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Clear
                  </button>
                )}
              </div>
              <div className="h-px bg-slate-100 flex-1"></div>
            </div>

            {filteredVerses.length > 0 ? (
              filteredVerses.map((verse, index) => (
                <section key={verse.slug} id={verse.slug} className="scroll-mt-32">
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
              ))
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No verses match your search</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-primary text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer">Clear Search</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-full shadow-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          Index
        </button>
        
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="p-4 bg-white border border-slate-200 text-primary rounded-full shadow-2xl active:scale-95 transition-transform flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-10 right-10 z-50 p-4 bg-primary text-white rounded-2xl shadow-2xl hover:bg-hover transition-all duration-300 hover:-translate-y-1 active:scale-95 items-center justify-center group cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </main>
  );
}