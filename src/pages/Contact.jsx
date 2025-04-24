import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been submitted successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

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
        { label: "Street", value: "Modern Corner Opp. National Handloom," },
        { label: "Area", value: "Nr. J R Amin Petrol Pump & Jolly Auto, Above Hira Auto Naroda," },
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
          <span className="font-semibold">{detail.label}:</span> {detail.value}
        </p>
      ))}
    </motion.div>
  ))}
</motion.div>



      {/* Google Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="h-96 my-6"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.108104614258!2d72.6454167!3d23.0686389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f48bd51c41%3A0x0!2zMjPCsDA0JzA3LjEiTiA3MsKwMzgnNDcuMSJF!5e0!3m2!1sen!2sin!4v1695718540206!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
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
        <ContactForm />

      </motion.div>
    </div>
  );
};

export default Contact;
