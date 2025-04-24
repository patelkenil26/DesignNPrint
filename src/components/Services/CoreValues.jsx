import React from "react";
import { FaCheckCircle, FaBullhorn, FaLightbulb, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const coreValues = [
  {
    icon: <FaCheckCircle className="text-blue-500 text-4xl mx-auto" />,
    title: "Quality Control",
    description: "Top-notch quality with timely delivery and trusted customer service.",
  },
  {
    icon: <FaBullhorn className="text-green-500 text-4xl mx-auto" />,
    title: "Mission",
    description: "To deliver impactful and professional printing solutions.",
  },
  {
    icon: <FaLightbulb className="text-yellow-500 text-4xl mx-auto" />,
    title: "Innovation",
    description: "Adapting to latest trends and customer needs every day.",
  },
  {
    icon: <FaHandshake className="text-red-500 text-4xl mx-auto" />,
    title: "Integrity",
    description: "Committed to transparency and ethical business values.",
  },
];

const CoreValues = () => (
  <section className="bg-gray-900 text-white py-12 mt-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 ">
      {coreValues.map((item, index) => (
        <motion.div
          key={item.title}
          className="text-center "
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 ">{item.icon}</div>
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-2 text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CoreValues;
