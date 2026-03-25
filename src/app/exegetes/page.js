  "use client";

  import React, { useState, useEffect } from "react";
  import Image from "next/image";
  import Link from "next/link";

  export default function AllExegetesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [allExegetes, setAllExegetes] = useState([]);
    const [filteredExegetes, setFilteredExegetes] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/exegetes');
        const data = await response.json();
        setAllExegetes(data);
        setFilteredExegetes(data);
      }
      fetchData();
    }, []);

    useEffect(() => {
      const normalize = (str) => 
        str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

      const filtered = allExegetes.filter((scholar) => {
        const searchStr = normalize(searchTerm);
        
        const nameMatch = normalize(scholar.name).includes(searchStr);
        const workMatch = normalize(scholar.majorWork).includes(searchStr);
        const schoolMatch = normalize(scholar.school).includes(searchStr);
        const arabicMatch = scholar.arabicName?.includes(searchTerm);

        return nameMatch || workMatch || schoolMatch || arabicMatch;
      });

      setFilteredExegetes(filtered);
    }, [searchTerm, allExegetes]);

    return (
      <main className="min-h-screen pt-32 pb-20 bg-slate-50">
        <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">The Great Exegetes</h1>
              <p className="text-slate-600 text-lg max-w-xl">
                Explore the lives and methodologies of the scholars who dedicated their lives to uncovering the depths of the Qur'anic text.
              </p>
            </div>

            <div className="flex items-center border pl-4 gap-2 bg-white border-primary/20 h-[52px] rounded-full overflow-hidden max-w-md w-full shadow-sm focus-within:border-primary focus-within:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07451e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search by name, work, or school..."
                className="w-full h-full outline-none text-sm text-primary placeholder:text-primary/50 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-primary hover:bg-hover cursor-pointer w-32 h-[42px] rounded-full text-sm font-bold text-white mr-[5px] transition-all active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            {filteredExegetes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExegetes.map((scholar) => (
                  <Link 
                    key={scholar.slug} 
                    href={`/exegetes/${scholar.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={scholar.image || "/images/placeholder.jpg"}
                        alt={scholar.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">View Biography →</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">
                          {scholar.school}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{scholar.lifespan}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {scholar.name}
                      </h3>
                      <p className="text-lg font-arabic text-primary/40 mt-1 mb-4" dir="rtl">
                        {scholar.arabicName}
                      </p>
                      
                      <p className="text-slate-500 text-sm line-clamp-2 mt-auto italic border-l-2 border-primary/10 pl-3">
                        "{scholar.majorWork}"
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-slate-200 shadow-inner">
                <div className="text-5xl mb-4 text-primary/20">🔍</div>
                <p className="text-slate-400 text-lg font-medium">No results found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="cursor-pointermt-4 text-primary font-bold hover:text-hover transition-colors underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }