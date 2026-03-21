"use client";

import Card from "../subComponent/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import Title from "../subComponent/Title";
import { useEffect } from "react";

export default function ExegetesSwiper({ exegetes }) {

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    }, []);
  
  return (
    <div className="my-10" 
    data-aos="fade-up"
    data-aos-delay="200">
      <Title
        title="Prominent Exegetes"
        subtitle="Discover the influential scholars who have shaped the interpretation of the Quran throughout history"
        align="center"
      />
      <div
        className="px-3 sm:px-4 md:px-11 lg:px-13 xl:px-12 2xl:px-16
        my-10 w-full"
      >
          <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}

          slidesPerView={1}
          slidesPerGroup={1}

          autoplay={{
            delay: 3000,
            disableOnInteraction: true
          }}

          pagination={{ clickable: true }}
          loop
          grabCursor

          breakpoints={{
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3
            }
          }}

          className="!pb-12"
        >
            {exegetes.map((exegete) => (
              <SwiperSlide key={exegete.slug}>
                  <Card {...exegete} />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </div>
  );
}