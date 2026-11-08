// components/contact/ContactHero.jsx
import React from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-50 py-8"
    >
      <h1 className="text-center text-3xl font-bold">Get in Touch With Us</h1>
    </motion.div>
  );
};

export default ContactHero;
