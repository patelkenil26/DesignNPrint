// src/components/about/MissionCard.jsx
import React from "react";
import { motion } from "framer-motion";

const MissionCard = ({ icon, title, description }) => (
  <motion.div
    className="text-center p-4 bg-primary-surface text-text-light rounded-lg shadow-md hover:shadow-lg border border-border-dark font-poppins"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="text-accent text-3xl mb-2">{icon}</div>
    <h4 className="font-bold text-lg">{title}</h4>
    <p className="text-sm mt-2">{description}</p>
  </motion.div>
);

export default MissionCard;
