import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import "./globals.css";
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
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
