// src/components/about/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ title, imageUrl }) => (
  <motion.div
    className="bg-cover bg-center h-[300px] flex items-center justify-center text-white font-poppins"
    style={{ backgroundImage: `url(${imageUrl})` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className="text-4xl font-bold"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {title}
    </motion.h1>
  </motion.div>
);

export default HeroSection;
