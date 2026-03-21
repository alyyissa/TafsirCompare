import React from "react";

export default function AboutStudyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="px-4 sm:px-6 max-w-5xl mx-auto">
                
                {/* Main Container with Heavy Border */}
                <div className="bg-white border-2 border-primary/20 rounded-[40px] shadow-2xl shadow-emerald-900/5 overflow-hidden">
                    
                    {/* Header Section */}
                    <header className="p-10 md:p-16 border-b-2 border-primary/10 text-center bg-slate-50/50">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            Project Documentation
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                            About the Study
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            A formal inquiry into the historical development and linguistic 
                            frameworks of Quranic Exegesis.
                        </p>
                    </header>

                    {/* Content Body with Internal Borders */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        
                        {/* Section 1: Overview */}
                        <section className="p-10 md:p-14 border-b-2 md:border-b-0 md:border-r-2 border-primary/10">
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                01. The Mission
                            </h2>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Bridging Traditions</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Our study serves as a digital bridge between traditional 
                                hermeneutics and modern analytical tools. We centralize 
                                scholarly methodologies to provide a clear trajectory of 
                                how understanding has evolved.
                            </p>
                        </section>

                        {/* Section 2: Integrity */}
                        <section className="p-10 md:p-14">
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                02. Academic Rigor
                            </h2>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Verified Sources</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Information is extracted directly from primary manuscripts 
                                and peer-reviewed academic editions. We prioritize 
                                accuracy over brevity to maintain scholarly integrity.
                            </p>
                        </section>

                        {/* Full Width Section: Stats/Metrics */}
                        <section className="col-span-1 md:col-span-2 p-10 md:p-14 border-t-2 border-primary/10 bg-primary/[0.02]">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center p-6 border border-primary/10 rounded-3xl bg-white shadow-sm">
                                    <div className="text-3xl font-black text-primary mb-1">8th</div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Century Origin</div>
                                </div>
                                <div className="text-center p-6 border border-primary/10 rounded-3xl bg-white shadow-sm">
                                    <div className="text-3xl font-black text-primary mb-1">100%</div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Verified Data</div>
                                </div>
                                <div className="text-center p-6 border border-primary/10 rounded-3xl bg-white shadow-sm">
                                    <div className="text-3xl font-black text-primary mb-1">Open</div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Access</div>
                                </div>
                                <div className="text-center p-6 border border-primary/10 rounded-3xl bg-white shadow-sm">
                                    <div className="text-3xl font-black text-primary mb-1">Peer</div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Reviewed</div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Methodology */}
                        <section className="col-span-1 md:col-span-2 p-10 md:p-16 border-t-2 border-primary/10">
                            <div className="max-w-2xl mx-auto text-center">
                                <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">
                                    Research Methodology
                                </h2>
                                <p className="text-slate-600 italic text-lg leading-relaxed mb-10">
                                    "Comparing the narrative approaches of traditionalists (Ma'thur) 
                                    against the rationalist schools (Ra'y) to map the intellectual 
                                    diversity of the Islamic world."
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Bottom Branding Footer */}
                    <footer className="p-8 bg-slate-900 text-center">
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                            TafsirCompare • Academic Research Division • 2026
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
}