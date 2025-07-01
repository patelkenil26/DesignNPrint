// components/contact/ContactInfoSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const contactSections = [
  {
    title: "Office Address",
    icon: <FaMapMarkerAlt className="inline mr-2 text-yellow-600" />,
    details: [
      { label: "Street", value: "Modern Corner Opp. National Handloom," },
      { label: "Area", value: "Nr. J R Amin Petrol Pump & Jolly Auto, Above Hira Auto Naroda," },
      { label: "City", value: "Ahmedabad, Gujarat 382330" },
    ],
  },
  {
    title: "24/7 Quick Contact",
    icon: <FaPhoneAlt className="inline mr-2 text-yellow-600" />,
    details: [
      { icon: <FaPhoneAlt className="text-lg text-gray-700" />, value: "+91 9725281074" },
      { icon: <FaPhoneAlt className="text-lg text-gray-700" />, value: "+91 9913290354" },
      { icon: <FaEnvelope className="text-lg text-gray-700" />, value: "designnprintsamd@gmail.com" },
    ],
  },
  {
    title: "Working Hours",
    icon: <FaClock className="inline mr-2 text-yellow-600" />,
    details: [
      { label: "Monday - Saturday", value: "9:00 AM to 6:00 PM" },
      { label: "Sunday", value: "We are Closed" },
    ],
  },
];

const ContactInfoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-wrap justify-center my-6 gap-4 px-4"
    >
      {contactSections.map((info, index) => (
        <motion.div
          key={index}
          className="bg-gray-100 p-6 rounded-xl shadow-md max-w-sm w-full mb-4 flex flex-col"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-4 flex justify-center items-center gap-2">
            {info.icon} {info.title}
          </h3>
          <div className="flex flex-col gap-3">
            {info.details.map((detail, i) => (
              <div key={i} className={`flex ${detail.icon ? "items-center" : "items-start"} gap-3`}>
                {detail.icon && <span>{detail.icon}</span>}
                <div className="text-sm text-gray-700 leading-tight">
                  {detail.label ? (
                    <>
                      <span className="font-semibold">{detail.label}:</span> <span>{detail.value}</span>
                    </>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactInfoSection;
