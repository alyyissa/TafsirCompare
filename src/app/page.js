import Exegetes from "../../components/home/Exegetes";
import FAQ from "../../components/home/FAQ";
import Hero from "../../components/home/Hero";
import QuranInfoSection from "../../components/home/QuranInfoSection";


export default function Home() {
  return (
    <>
      <Hero />
      <QuranInfoSection />
      <Exegetes />
      <FAQ />
    </>
  );
}
