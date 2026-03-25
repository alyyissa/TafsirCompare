"use client";
import React from "react";

export default function AboutStudyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white font-sans">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto">

        <div className="rounded-[40px] overflow-hidden border border-slate-200 bg-white shadow-xl">

          {/* HEADER */}
          <header className="p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 to-transparent">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Project Documentation
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">
              About the Study
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto italic leading-relaxed">
              "And We have revealed the Book to you explaining clearly everything,
              and a guidance and mercy and good news for those who submit" (16:89)
            </p>
          </header>

          <div className="p-8 md:p-14 space-y-16">

            {/* INTRO CARD */}
            <section className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
              <p className="font-bold text-slate-900 text-xl mb-4">
                In the name of Allāh, the Most Gracious, the Most Merciful.
              </p>

              <p className="text-slate-600 leading-relaxed text-lg mb-4">
                The Qur’an occupies a central and unparalleled place in the life of a Muslim...
              </p>

              <p className="text-slate-600 leading-relaxed text-lg">
                The aim of this study is to present a comparison of the works of some prominent Muslim exegetes...
              </p>
            </section>

            {/* PRINCIPLES */}
            <section>
              <h2 className="text-lg my-10 font-bold text-primary uppercase tracking-[0.4em] mb-10 text-center">
                Methodological Foundations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "The Qur’an explains itself",
                    text: "Interpretation begins from within the Qur’an itself..."
                  },
                  {
                    title: "Internal Consistency",
                    text: "No interpretation should contradict the Qur’an as a whole..."
                  },
                  {
                    title: "Tradition as a Supplement",
                    text: "Ahādīth support interpretation but are weighed against the Qur’an..."
                  },
                  {
                    title: "Contextual Necessity",
                    text: "Verses must be understood within their surrounding context..."
                  },
                  {
                    title: "Clarity over Ambiguity",
                    text: "Ambiguous verses are clarified through decisive ones..."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition"
                  >
                    <div className="text-primary font-black text-lg mb-2">
                      0{i + 1}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg my-10 font-bold text-primary uppercase tracking-[0.4em] mb-10 text-center">
                Selected Scholarly Voices
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Ibn Kathīr", desc: "Classical Sunni tradition." },
                  { name: "Al-Qurṭubī", desc: "Juridical insights and legal reasoning." },
                  { name: "Al-Rāzī", desc: "Philosophical and theological depth." },
                  { name: "Al-Ṭabarsī", desc: "Linguistic precision and sectarian discourse." },
                  { name: "Mawdūdī", desc: "Modern socio-political interpretation." },
                  { name: "Ṭabāṭabāʾī", desc: "Philosophical and theological approach." }
                ].map((exegete, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition cursor-pointer"
                  >
                    <h4 className="font-bold text-slate-900 mb-2">
                      {exegete.name}
                    </h4>
                    <p className="text-slate-500 text-sm">
                      {exegete.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* DISCLAIMER */}
            <section className="bg-slate-900 text-white rounded-3xl py-10 md:py-14">
              <h2 className="text-lg font-bold text-primary uppercase tracking-[0.4em] mb-6">
                Official Disclaimer
              </h2>

              <p className="text-slate-400 mb-4 leading-relaxed">
                Some of the tafsīr works referenced in this study are not fully available in English...
              </p>

              <p className="text-slate-400 mb-8 leading-relaxed">
                While every effort has been made to ensure accuracy...
              </p>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  Direct Inquiries
                </span>

                <a
                  href="mailto:info@tafsircompare.com"
                  className="text-xl font-bold hover:text-primary transition"
                >
                  info@tafsircompare.com
                </a>
              </div>
            </section>

          </div>

          <footer className="p-6 text-center text-xs uppercase tracking-widest text-slate-400 border-t">
            TafsirCompare • 2026
          </footer>

        </div>
      </div>
    </main>
  );
}