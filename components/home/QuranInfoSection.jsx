"use client";

import React from 'react';
import Image from 'next/image';


import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const QuranInfoSection = () => {
    useEffect(() => {
          AOS.init({
            duration: 1000,
            once: false
          });
        }, []);
  return (
    <div className="py-16 px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16"
    data-aos="fade-up"
    data-aos-delay="200"
    >
      <div className="lg:max-w-7xl max-w-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Container */}
          <div className="relative aspect-[308/213] rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="/images/info3.jpg" 
              alt="Quranic Study Illustration" 
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">
              The Qur'an as Clarification
            </h2>
            
            <div className="mb-6">
              <p className="text-2xl font-arabic text-primary leading-relaxed mb-4 text-right sm:text-left" dir="rtl">
                وَنَزَّلْنَا عَلَيْكَ الْكِتَابَ تِبْيَانًا لِّكُلِّ شَيْءٍ وَهُدًى وَرَحْمَةً وَبُشْرَىٰ لِلْمُسْلِمِينَ
              </p>
              <div className="text-slate-700 italic border-l-4 border-primary pl-4 py-1">
                <p>
                  “And We have sent down to you the Book as clarification for all things and as guidance and mercy and good tidings for the Muslims.”
                </p>
                <span className="block mt-1 font-semibold not-italic">— Qur’an 16:89</span>
              </div>
            </div>

            <p className="text-slate-600 text-[16px] leading-7">
              This verse beautifully captures the essence of our comparative study—exploring how different exegetes have understood the Qur’an as a source of clarification, guidance, and mercy for humanity.
            </p>

            <ul className="list-disc text-[15px] text-slate-600 space-y-2 pl-4 mt-6">
              <li>Comparative analysis of classical and modern tafseer.</li>
              <li>Linguistic depths of the Quranic Arabic.</li>
              <li>Thematic exploration of guidance and mercy.</li>
              <li>Scholarly perspectives on various verses.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuranInfoSection;