// components/navbar/ServiceDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../../data/servicesData";

const ServiceDropdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 w-52 z-50 shadow-xl rounded-xl bg-white overflow-hidden"
    >
      <ul className="max-h-72 overflow-y-auto text-blue-900 scrollbar-thin scrollbar-thumb-gray-400">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              to={`/services/${service.id}`}
              className="block px-4 py-2 hover:bg-yellow-500 hover:text-white transition-all"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServiceDropdown;
