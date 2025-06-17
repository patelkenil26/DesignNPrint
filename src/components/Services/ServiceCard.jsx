import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ image, title, index, onClick }) => {
  return (
    <motion.div
      className="border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {/* Image container without spacing */}
      <div className="w-full h-[160px] sm:h-[220px] overflow-hidden bg-white flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full"
        />
      </div>

      {/* Title section with minimal spacing */}
      <div className="px-2 py-3 text-center">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 hover:text-yellow-500 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
