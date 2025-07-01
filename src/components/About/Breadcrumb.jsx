// src/components/about/Breadcrumb.jsx
import React from "react";
import { motion } from "framer-motion";

const Breadcrumb = ({ paths }) => (
  <motion.div
    className="my-4 px-4 text-sm text-gray-600 font-poppins"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {paths.map((path, index) => (
      <span key={index}>
        {path.link ? (
          <a href={path.link} className="text-blue-500 hover:underline">
            {path.name}
          </a>
        ) : (
          <span>{path.name}</span>
        )}
        {index < paths.length - 1 && " › "}
      </span>
    ))}
  </motion.div>
);

export default Breadcrumb;
