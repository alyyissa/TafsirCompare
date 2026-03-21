import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[80dvh] w-full overflow-hidden 
    px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mt-[80px]">
      <Image
        src="/images/wallpaper2.jpg"
        alt="Tafsir comparison background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-15 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl">
          Truth Emerges When Tafsir Is Compared, Not Repeated
        </h1>

        <h3 className="text-lg md:text-2xl text-gray-200 max-w-2xl">
          Presenting Tafsir Through Context, Logic, and Evidence
        </h3>
      </div>
    </section>
  );
};

export default Hero;