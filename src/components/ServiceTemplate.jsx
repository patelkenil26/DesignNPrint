import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";



const ServiceTemplate = ({
  title,
  description,
  types,
  advantages,
  bannerImg ,
}) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <Link
            to={`/contact?subject=${encodeURIComponent(title)}`}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
          >
            Order Now
          </Link>
        </motion.div>

        {/* 🌀 Swiper Cards Effect */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Swiper
            effect="cards"
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Autoplay]}
            className="mySwiper w-[300px] sm:w-[400px] h-[280px] sm:h-[350px]"
          >
            {bannerImg.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Service Details */}
      <motion.div
        className="max-w-5xl mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold border-b-2 border-yellow-500 pb-1 mb-4">
          Service Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="text-lg font-semibold mb-2">Types</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {types.map((type, idx) => (
                <li key={idx}>{type}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-2">Advantages</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {advantages.map((adv, idx) => (
                <li key={idx}>{adv}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceTemplate;
