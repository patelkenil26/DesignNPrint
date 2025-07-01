// src/components/about/JourneySection.jsx
import React from "react";
import { motion } from "framer-motion";

const JourneySection = ({ title, description }) => (
  <motion.div
    className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 mx-4 my-6 font-poppins"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-800 font-semibold">{description}</p>
  </motion.div>
);

export default JourneySection;
