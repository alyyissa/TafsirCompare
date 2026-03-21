"use client";

import "aos/dist/aos.css";

const Title = ({ title, subtitle, align }) => {

  return (
    <div className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16">
      <div
        className={`flex flex-col justify-center items-center text-center
        ${align === "left" ? "md:items-start md:text-left" : ""}`}
      >
        <h1
          className="font-bold text-3xl md:text-[40px] text-primary mb-2"
        >
          {title}
        </h1>

        <p
          className="text-sm font-primary md:text-base text-coprimary mt-2 max-w-162.5 text-[18px]"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default Title;