import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoSection from "../components/contact/ContactInfoSection";
import ContactMap from "../components/contact/ContactMap";
import ContactForm from "../components/contact/ContactForm";

const ContactPage = () => {
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subjectFromURL = queryParams.get("subject");
    if (subjectFromURL && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location]);

  return (
    <div className="font-poppins">
      <ContactHero />
      <ContactInfoSection />
      <ContactMap />

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

export default ContactPage;
