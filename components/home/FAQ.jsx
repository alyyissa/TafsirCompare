"use client";

import React, { useState } from 'react';
import Title from "../subComponent/Title";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Are there any special discounts or early bird offers?",
      answer: "Yes! We offer limited-time early bird discounts and bundle packages for group registrations. Be sure to sign up early to grab the best deals."
    },
    {
      question: "What are the dates and locations for the product launch events?",
      answer: "The launch events will take place in New York on July 18th, San Francisco on July 25th, and virtually on August 1st. Detailed schedules will be emailed after registration."
    },
    {
      question: "Can I bring a guest to the product launch?",
      answer: "Yes, you may bring one guest with you. Please ensure that both names are included during registration as seats are limited."
    },
    {
      question: "How do I register for the event?",
      answer: "Simply visit our official website and click the 'Register' button at the top of the page. You’ll receive a confirmation email within minutes."
    },
    {
      question: "Is parking available at the event venue?",
      answer: "Yes, most venues have dedicated parking areas for attendees. You’ll receive parking details in your confirmation email."
    },
    {
      question: "How can I contact the event organizers?",
      answer: "For any inquiries, you can email us at events@yourcompany.com or call our support line at +1 (800) 123-4567 between 9 AM – 5 PM."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="my-16">
      <Title 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our methodology and resources"
        align="center"
      />
      
      <div className="mx-auto px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16 mt-10">
        <div className="divide-y divide-priamry">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="accordion">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className={`cursor-pointer w-full text-base outline-none font-semibold py-6 flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-slate-900 hover:text-primary'
                  }`}
                >
                  <div className="flex-1 invisible hidden sm:block"></div>
                  
                  <span className="text-center px-4">{item.question}</span>
                  
                  <div className="flex-1 flex justify-end">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512" 
                      className="w-[14px] h-[14px] fill-current shrink-0 transition-transform duration-300"
                    >
                      <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
                      <path 
                        className={`transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} 
                        d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z" 
                      />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out text-center ${
                    isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;