import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-arabic",
});

export const metadata = {
  title: "TafseerCompare",
  description: "Comparative study of Quranic Exegesis",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoArabic.variable}`}>
      <body className="antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}