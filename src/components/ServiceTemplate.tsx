"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import ColorThief from "color-thief-browser";

const ServiceTemplate = ({
  title,
  description,
  types,
  advantages,
  bannerImg,
}: any) => {
  const [bgColor, setBgColor] = useState("rgba(255,255,255,0.6)");
  const [textColor, setTextColor] = useState("black");
  const imgRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bannerImg[0];
    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      setBgColor(`rgba(${r}, ${g}, ${b}, 0.5)`);
      setTextColor(luminance < 0.6 ? "white" : "black");
    };
  }, [bannerImg]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(/images/bg/designn.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="w-full relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🔷 Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: bgColor }}
      ></div>

      <div className="relative z-10">
        {/* 🔹 Top Content */}
        <div className="max-w-6xl mx-auto px-8 pt-4 grid md:grid-cols-2">
          {/* ➤ Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-2xl font-bold mb-4 lg:mt-16"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p className="mb-6 font-medium" style={{ color: textColor }}>
              {description}
            </p>
            <Link
              href={`/contact?subject=${encodeURIComponent(title)}`}
              className="inline-block font-bold px-6 py-2 rounded transition duration-300"
              style={{
                backgroundColor: bgColor.replace("0.5", "0.8"),
                color: textColor === "white" ? "white" : "black",
                border: `2px solid ${
                  textColor === "white" ? "black" : "white"
                }`,
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.backgroundColor = bgColor.replace(
                  "0.5",
                  "1"
                );
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.backgroundColor = bgColor.replace(
                  "0.5",
                  "0.8"
                );
              }}
            >
              Order Now
            </Link>
          </motion.div>

          {/* ➤ Right Swiper */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Swiper
              effect="creative"
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[EffectCards, Autoplay]}
              className="mySwiper w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] pt-4 pb-4"
            >
              {bannerImg.map((img: string, idx: number) => (
                <SwiperSlide
                  key={idx}
                  className="rounded-xl overflow-hidden flex justify-center items-center"
                >
                  <img
                    ref={idx === 0 ? imgRef : null}
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="max-h-[380px] w-auto object-contain drop-shadow-xl cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsModalOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* 🔸 Divider */}
        <div className="border-b border-black/40 mb-4 lg:max-w-6xl mx-auto"></div>

        {/* 🔻 Service Details */}
        <motion.div
          className="max-w-6xl mx-auto px-8 py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6" style={{ color: textColor }}>
            What We Offer
          </h3>
          <div className="grid sm:grid-cols-2 gap-10 mt-6">
            <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-md">
              <h4
                className="text-lg font-semibold mb-2"
                style={{ color: textColor }}
              >
                Types
              </h4>
              <ul className="list-disc ml-6" style={{ color: textColor }}>
                {types.map((type: string, idx: number) => (
                  <li key={idx}>{type}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-md">
              <h4
                className="text-lg font-semibold mb-2"
                style={{ color: textColor }}
              >
                Advantages
              </h4>
              <ul className="list-disc ml-6" style={{ color: textColor }}>
                {advantages.map((adv: string, idx: number) => (
                  <li key={idx}>{adv}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center px-4">
            {/* 🖼️ Image container */}
            <div className="relative " >
              {/* ❌ Close Button inside image top-right */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-black/60 text-white hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-xl z-50 shadow-md transition-all duration-200"
              >
                &times;
              </button>

              {/* 🖼️ Image */}
              <img
                src={bannerImg[currentIndex]}
                alt={`Modal Slide ${currentIndex + 1}`}
                className="max-h-[80vh] w-auto object-contain rounded-md border-4 border-white drop-shadow-xl"
              />

              {/* ⬅️ Prev Button */}
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? bannerImg.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black rounded-full w-10 h-10 flex items-center justify-center text-2xl z-40"
              >
                ‹
              </button>

              {/* ➡️ Next Button */}
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === bannerImg.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black rounded-full w-10 h-10 flex items-center justify-center text-2xl z-40"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceTemplate;
