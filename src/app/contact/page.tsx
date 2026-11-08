"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactInfoSection from "@/components/sections/contact/ContactInfoSection";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactForm from "@/components/sections/contact/ContactForm";

const ContactContent = () => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subjectFromURL = searchParams.get("subject");
    if (subjectFromURL && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [searchParams]);

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
        ref={formRef}
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Leave Your Message
        </h2>
        <ContactForm />
      </motion.div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
