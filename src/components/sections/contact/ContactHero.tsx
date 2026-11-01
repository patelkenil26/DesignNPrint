// components/contact/ContactHero.jsx
import React from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-surface-light border-b border-border-subtle py-8"
    >
      <h1 className="text-center text-3xl font-bold text-text-main">Get in Touch With Us</h1>
    </motion.div>
  );
};

export default ContactHero;
