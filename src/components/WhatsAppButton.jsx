import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919725281074"; // ← Enter number without `+` (India code: 91)
  const message = "Hello! I want to inquire about your printing services.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed  z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
