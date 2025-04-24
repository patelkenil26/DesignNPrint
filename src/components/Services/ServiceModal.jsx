import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

const ServiceModal = ({ isOpen, service, close, next, prev }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div
            className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-2 right-2 text-black hover:text-red-500 bg-white rounded-full p-1 text-3xl z-50"
            >
              <IoIosClose />
            </button>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
            >
              <IoIosArrowBack />
            </button>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain px-2"
            />

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
            >
              <IoIosArrowForward />
            </button>
            <h2 className="text-center text-xl font-semibold text-black py-4">
              {service.title}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
