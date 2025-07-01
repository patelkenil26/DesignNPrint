// components/contact/ContactMap.jsx
import React from "react";
import { motion } from "framer-motion";

const ContactMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="my-10 w-full max-w-7xl mx-auto px-3"
    >
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.063528913262!2d72.6462253!3d23.0683253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c080a6b2f5afd0f%3A0x9bcb1ab9f2fc72ca!2sDesign%20N%20Prints!5e0!3m2!1sen!2sin!4v1718798257421!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Design N Prints Location"
        ></iframe>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=23.0685788,72.64642"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full shadow hover:bg-yellow-600 transition duration-300"
        >
          📍 Get Directions
        </a>
      </div>
    </motion.div>
  );
};

export default ContactMap;
