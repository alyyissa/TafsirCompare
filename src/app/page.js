import Hero from "../../components/home/Hero";
import QuranInfoSection from "../../components/home/QuranInfoSection";
import Exegetes from "../../components/home/Exegetes";
import FAQ from "../../components/home/FAQ";
import FeaturedVerse from "../../components/home/FeaturedVerse";

export default function Home() {
  return (
    <>
      <Hero />
      <QuranInfoSection />
      <FeaturedVerse slug="surah-abas-1-4" />
      <Exegetes />
      <FAQ />
    </>
  );
}