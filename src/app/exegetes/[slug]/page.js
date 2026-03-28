import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export default async function ExegetePage({ params }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content", "verses", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary italic">Profile not found</h1>
          <Link href="/" className="text-primary hover:underline mt-4 block">Return Home</Link>
        </div>
      </div>
    );
  }

  const rawContent = fs.readFileSync(filePath, "utf8");
  const parts = rawContent.split("---");
  const metaLines = parts[1].trim().split("\n");
  const fullBody = parts[2].trim();

  const data = {};
  metaLines.forEach(line => {
    const [key, ...value] = line.split(":");
    if (key && value) data[key.trim()] = value.join(":").trim();
  });

  const sections = fullBody.split("##");

  const getSectionContent = (title) => {
    const section = sections.find(s => s.toLowerCase().includes(title.toLowerCase()));
    return section ? section.replace(new RegExp(title, "i"), "").trim() : "";
  };

  const biography = getSectionContent("Biography");
  const methodology = getSectionContent("Exegetical Methodology");
  const contributions = getSectionContent("Key Contributions");
  const works = getSectionContent("Major Works");

  return (
    <main className="min-h-screen pt-18 pb-20 bg-slate-50">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="bg-[linear-gradient(to_right,var(--color-primary),var(--color-coprimary))] text-white py-24 px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-60 h-80 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
            <Image 
              src={data.image || "/images/placeholder.jpg"} 
              alt={data.name} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <Link href="/exegetes" className="text-white/70 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-6 inline-block">
              ← Back to Collection
            </Link>
            <h1 className="text-6xl md:text-7xl font-bold mb-4">{data.name}</h1>
            <p className="text-4xl font-arabic text-white/80" dir="rtl">{data.arabicName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-primary mb-6 border-b-2 border-primary/10 pb-2">Biography</h2>
              <div className="whitespace-pre-wrap text-slate-700 leading-9 text-lg font-light">
                {biography}
              </div>

              {methodology && (
                <>
                  <h2 className="text-3xl font-bold text-primary mt-12 mb-6 border-b-2 border-primary/10 pb-2">Methodology</h2>
                  <div className="whitespace-pre-wrap text-slate-700 leading-9 text-lg font-light">
                    {methodology}
                  </div>
                </>
              )}

              {contributions && (
                <>
                  <h2 className="text-3xl font-bold text-primary mt-12 mb-6 border-b-2 border-primary/10 pb-2">Key Contributions</h2>
                  <div className="whitespace-pre-wrap text-slate-700 leading-9 text-lg font-light">
                    {contributions}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-primary font-bold uppercase text-xs tracking-widest mb-6 border-b pb-2">Quick Info</h3>
              <div className="space-y-6">
                 <div>
                  <span className="text-gray-400 block font-bold uppercase text-[10px] mb-1 tracking-tighter">Lifespan</span>
                  <p className="text-slate-900 font-semibold">{data.lifespan}</p>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold uppercase text-[10px] mb-1 tracking-tighter">Origin</span>
                  <p className="text-slate-900 font-semibold">{data.origin}</p>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold uppercase text-[10px] mb-1 tracking-tighter">School</span>
                  <p className="text-slate-900 font-semibold">{data.school}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-3xl shadow-xl text-white max-h-[50vh] flex flex-col">
              <h3 className="font-bold uppercase text-xs tracking-widest mb-6 border-b border-white/20 pb-2 shrink-0">Major Works</h3>
              <div className="whitespace-pre-wrap text-white/90 leading-relaxed text-md italic overflow-y-auto custom-scrollbar pr-2">
                {works}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}