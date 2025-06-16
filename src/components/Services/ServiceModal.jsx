import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

const ServiceModal = ({ isOpen, service, close, next, prev }) => {
  if (!service) return null;

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
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-2 right-2 text-black hover:text-red-500 bg-white rounded-full  text-3xl z-50"
            >
              <IoIosClose />
            </button>

            {/* Previous Button */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
            >
              <IoIosArrowBack />
            </button>

            {/* Image with fixed size */}
           {/* Image with minimal gap */}
<div className="w-full flex justify-center items-center bg-white px-2 pt-4 pb-2">
  <img
    src={service.image}
    alt={service.title}
    className="w-full max-h-[60vh] "
  />
</div>


            {/* Next Button */}
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
            >
              <IoIosArrowForward />
            </button>

            {/* Title */}
            <h2 className="text-center text-xl font-semibold text-black pt-4">
              {service.title}
            </h2>

            {/* Go to Service Button */}
            <div className="text-center pb-6">
              <a
                href={service.link || "#"} // Add link in service data
                // target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-gray-600 hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded transition duration-200"
              >
                Go to Service
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
