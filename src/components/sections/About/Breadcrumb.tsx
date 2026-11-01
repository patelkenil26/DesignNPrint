"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Breadcrumb = ({ paths }: any) => (
  <motion.div
    className="my-4 px-4 text-sm text-text-muted font-poppins"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {paths.map((path: any, index: number) => (
      <span key={index}>
        {path.link ? (
          <Link href={path.link} className="text-secondary hover:text-secondary-hover hover:underline transition-colors">
            {path.name}
          </Link>
        ) : (
          <span className="text-text-main font-medium">{path.name}</span>
        )}
        {index < paths.length - 1 && " › "}
      </span>
    ))}
  </motion.div>
);

export default Breadcrumb;
