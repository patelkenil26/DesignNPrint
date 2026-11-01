// components/navbar/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919725281074"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50 bg-whatsapp text-text-light p-3 rounded-full shadow-lg hover:bg-whatsapp-hover transition duration-300"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppButton;
