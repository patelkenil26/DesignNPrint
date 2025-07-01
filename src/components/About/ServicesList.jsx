// src/components/about/ServicesList.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../../data/servicesData";

const ServicesList = () => (
  <motion.div
    className="py-8 px-4 font-poppins"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-2xl font-semibold text-center mb-6">Services</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-gray-600">
      {services.map((service) => (
        <div key={service.id} className="flex items-start gap-2">
          <span className="text-gray-500">+</span>
          <a
            href={"/services/"+service.id}
            className="text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
          >
            {service.name}
          </a>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ServicesList;
