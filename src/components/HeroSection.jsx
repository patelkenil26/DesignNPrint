import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HeroSection.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

import { Autoplay, Pagination, Navigation, Mousewheel } from "swiper/modules";

const slidesData = [
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-1.jpg",
  "https://dizname.in/wp-content/uploads/2021/03/niketart_slider_2.jpg",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-2.png",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-4.png",
  "https://dizname.in/wp-content/uploads/2021/09/design-n-print-slider-5.png",
];

const HeroSection = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   if (progressCircle.current) {
  //     progressCircle.current.style.setProperty("--progress", 1 - progress);
  //   }
  //   if (progressContent.current) {
  //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  //   }
  // };

  return (
    <div className="relative bg-gray-900 text-center p-4 sm:p-8 ">
      {" "}
      {/* छोटे स्क्रीन पर कम पैडिंग */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        mousewheel={false}
        modules={[Autoplay, Pagination, Navigation, Mousewheel]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-auto sm:h-[650px] mySwiper rounded-2xl overflow-hidden"
        slidesPerView={1}
        freeMode={false}
        followFinger={true}
        loop={true}
      >
        {slidesData.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="h-[300px] sm:h-[650px] w-full">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
        <div
          className="autoplay-progress absolute bottom-2 sm:bottom-5 right-2 sm:right-5 flex items-center gap-2"
          slot="container-end"
        >
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            className="w-6 h-6 sm:w-8 sm:h-8"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-gray-300"
              strokeWidth="2"
            ></circle>
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-blue-600"
              strokeWidth="2"
              style={{ strokeDasharray: "126", strokeDashoffset: "0" }}
            ></circle>
          </svg>
          <span
            ref={progressContent}
            className="text-xs sm:text-sm font-medium text-gray-700"
          ></span>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSection;
