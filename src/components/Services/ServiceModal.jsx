import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4 },
  }),
};

const ServiceModal = ({ isOpen, service, close, next, prev }) => {
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  if (!service) return null;

  const handleNext = () => {
    setDirection(1);
    next();
  };

  const handlePrev = () => {
    setDirection(-1);
    prev();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(3px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
           onClick={close}
        >
          <motion.div
            className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-2 right-2 text-white bg-black/60 hover:bg-red-600 rounded-full p-2 text-2xl z-50 shadow-md transition-all duration-200"
            >
              <IoIosClose />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black rounded-full p-2 text-2xl z-50"
            >
              <IoIosArrowBack />
            </button>

            {/* Image animation */}
            <div className="w-full flex justify-center items-center pb-2">
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={service.image}
                  src={service.image}
                  alt={service.title}
                  className=" max-h-[60vh] w-full "
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                />
              </AnimatePresence>
            </div>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black rounded-full p-2 text-2xl z-50"
            >
              <IoIosArrowForward />
            </button>

            {/* Title */}
            <h2 className="text-center text-xl font-semibold text-black pt-4">
              {service.title}
            </h2>

            {/* Go to Service */}
            <div className="text-center pb-6">
              <a
                href={service.link || "#"}
                className="inline-block mt-4 bg-gray-600 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded transition duration-200"
              >
                Go to Service
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
