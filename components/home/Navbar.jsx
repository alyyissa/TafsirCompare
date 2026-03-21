"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/", type: "page" },
    { name: "Exegetes", path: "/exegetes", type: "page" },
    { name: "Verses", path: "/verses", type: "page" },
    { name: "FAQ", path: "#faq", type: "scroll" },
    { name: "About the Study", path: "/about", type: "page" },
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.name === "FAQ") {
      return pathname === "/";
    }
    return true;
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (link) => {
    setOpen(false);
    if (link.type === "scroll") {
      const sectionId = link.path.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 90;
        const elementPosition = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-transform duration-300 border-b border-borderColor bg-white py-5 shadow-2xl
      ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="flex items-center justify-between w-full mx-auto px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 relative text-gray-600">
        
        <Link 
          href="/" 
          className="flex items-center gap-3 cursor-pointer z-[60]"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-10 w-10">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-primary whitespace-nowrap">TafseerCompare</span>
        </Link>

        <div className={`
          max-sm:fixed max-sm:inset-0 max-sm:h-screen max-sm:w-full 
          flex flex-col sm:flex-row items-center justify-center sm:justify-end flex-1
          gap-8 sm:gap-6 md:gap-8 transition-all duration-300 z-50 bg-white
          ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full sm:translate-x-0"}
        `}>
          {filteredLinks.map((link, index) => (
            link.type === "page" ? (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpen(false)}
                className="text-xl sm:text-[15px] lg:text-[16px] font-semibold text-primary transition-colors whitespace-nowrap hover:text-hover"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => handleNavClick(link)}
                className="text-xl sm:text-[15px] lg:text-[16px] font-semibold text-primary transition-colors whitespace-nowrap bg-transparent border-none outline-none p-0 cursor-pointer hover:text-hover"
              >
                {link.name}
              </button>
            )
          ))}
        </div>

        <button 
          className='sm:hidden ml-4 cursor-pointer bg-white border-none flex items-center text-primary z-[60]' 
          onClick={() => setOpen(!open)}
        > 
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;