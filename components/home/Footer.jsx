"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Exegetes", path: "/exegetes" },
    { name: "Verses", path: "/verses" },
    { name: "About the Study", path: "/about-the-study" },
  ];

  return (
    <footer className="bg-[linear-gradient(to_right,#07451e,#082e36)] py-10 px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 tracking-wide">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center md:justify-between max-md:flex-col gap-6">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-white whitespace-nowrap">TafseerCompare</span>
          </Link>

          <ul className="flex items-center justify-center flex-wrap gap-y-4 md:justify-end gap-x-6">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  href={link.path} 
                  className="text-white hover:underline text-base font-medium transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-white/10" />

        <p className="text-center text-gray-200 text-sm md:text-base">
          ©{new Date().getFullYear()} TafseerCompare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;