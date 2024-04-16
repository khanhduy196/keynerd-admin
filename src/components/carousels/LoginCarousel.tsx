import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { SLIDE_DELAY } from "constants/carousel.constant";

const slides = [
  "/images/login-carousel-img-1.png",
  "/images/login-carousel-img-2.png",
  "/images/login-carousel-img-3.png",
];

const LoginCarousel: React.FC = () => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        bulletElement: "div",
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
        bulletClass:
          "inline-block w-6 h-2 rounded-full bg-neutral-0 opacity-30 cursor-pointer transition-width transition-opacity duration-300",
        bulletActiveClass: "!w-[3.75rem] !opacity-100",
      }}
      autoplay={{
        delay: SLIDE_DELAY,
      }}
      modules={[Pagination, Autoplay]}
      className="flex-1 h-full"
    >
      {slides.map((image, index) => (
        <SwiperSlide key={index} className="h-full w-full">
          <img
            src={image}
            alt="login slider image"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
      <div className="swiper-pagination flex gap-2 justify-center !bottom-14"></div>
    </Swiper>
  );
};

export default LoginCarousel;
