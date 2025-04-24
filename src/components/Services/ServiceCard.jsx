import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ image, title, index, onClick }) => {
  return (
    <motion.div
      className="border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="w-full h-[250px] overflow-hidden bg-white flex justify-center items-start">
        <img src={image} alt={title} className="object-contain max-h-full" />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
