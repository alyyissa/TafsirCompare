import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export default async function AllExegetesPage() {
  const directoryPath = path.join(process.cwd(), "content", "exegetes");
  const fileNames = fs.readdirSync(directoryPath);

  const allExegetes = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directoryPath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const parts = fileContent.split("---");
    const metaLines = parts[1].trim().split("\n");
    const data = {};
    
    metaLines.forEach(line => {
      const [key, ...value] = line.split(":");
      if (key && value) data[key.trim()] = value.join(":").trim();
    });

    return { slug, ...data };
  });

  return (
    <main className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mb-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-primary mb-4">The Great Exegetes</h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Explore the lives and methodologies of the scholars who dedicated their lives to uncovering the depths of the Qur'anic text.
          </p>
        </div>
      </div>

      <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allExegetes.map((scholar) => (
            <Link 
              key={scholar.slug} 
              href={`/exegetes/${scholar.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={scholar.image || "/images/placeholder.jpg"}
                  alt={scholar.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white text-sm font-bold tracking-widest uppercase">View Biography →</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-primary/60 bg-primary/5 px-2 py-1 rounded">
                    {scholar.school}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{scholar.lifespan}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {scholar.name}
                </h3>
                <p className="text-xl font-arabic text-primary/40 mt-1 mb-4" dir="rtl">
                  {scholar.arabicName}
                </p>
                
                <p className="text-slate-500 text-sm line-clamp-2 mt-auto italic">
                  "{scholar.majorWork}"
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}