import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const Contact = () => {
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subjectFromURL = queryParams.get("subject");
    if (subjectFromURL && formRef.current) {
      // scroll to the form section smoothly
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200); // small delay to wait for DOM render
    }
  }, [location]);

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-8"
      >
        <h1 className="text-center text-3xl font-bold">Get in Touch With Us</h1>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-center my-6 gap-4 px-4"
      >
        {[
          {
            title: "Office Address",
            details: [
              {
                label: "Street",
                value: "Modern Corner Opp. National Handloom,",
              },
              {
                label: "Area",
                value:
                  "Nr. J R Amin Petrol Pump & Jolly Auto, Above Hira Auto Naroda,",
              },
              { label: "City", value: "Ahmedabad, Gujarat 382330" },
            ],
          },
          {
            title: "24/7 Quick Contact",
            details: [
              { label: "Phone 1", value: "+91 9586192475" },
              { label: "Phone 2", value: "+91 9913290354" },
              { label: "Email", value: "designnprintsamd@gmail.com" },
            ],
          },
          {
            title: "Working Hours",
            details: [
              { label: "Monday - Saturday", value: "9:00 AM to 6:00 PM" },
              { label: "Sunday", value: "We are Closed" },
            ],
          },
        ].map((info, index) => (
          <motion.div
            key={index}
            className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-xs w-full mb-4 flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-center">{info.title}</h3>
            {info.details.map((detail, i) => (
              <p key={i} className="text-sm mt-2 text-center">
                <span className="font-semibold">{detail.label}:</span>{" "}
                {detail.value}
              </p>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Google Map Section */}
      <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="my-10 w-full max-w-7xl mx-auto px-3"
    >
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.108104614258!2d72.6454167!3d23.0686389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f48bd51c41%3A0x0!2zMjPCsDA0JzA3LjEiTiA3MsKwMzgnNDcuMSJF!5e0!3m2!1sen!2sin!4v1695718540206!5m2!1sen!2sin"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Location"
        ></iframe>
      </div>

      {/* 📍 Get Directions Button */}
      <div className="text-center mt-6">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=23.0686389,72.6454167"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full shadow hover:bg-yellow-600 transition duration-300"
        >
          📍 Get Directions
        </a>
      </div>
    </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gray-50 py-8 px-4"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Leave Your Message
        </h2>
        <ContactForm ref={formRef} />
      </motion.div>
    </div>
  );
};
export default Contact;
