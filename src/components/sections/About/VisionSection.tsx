// src/components/about/VisionSection.jsx
import React from "react";
import { motion } from "framer-motion";

const VisionSection = ({ title, description }) => (
  <motion.div
    className="bg-secondary-bg border-l-4 border-secondary px-6 py-4 mx-4 my-6 font-poppins rounded-r-md"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-text-main">{title}</h3>
    <p className="text-text-subtle">{description}</p>
  </motion.div>
);

export default VisionSection;
