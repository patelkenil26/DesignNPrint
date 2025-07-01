// src/components/contact/ContactForm.jsx
import React, { useState, useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";

const ContactForm = forwardRef((props, ref) => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subjectFromURL = queryParams.get("subject");
    if (subjectFromURL) {
      setFormData((prev) => ({
        ...prev,
        subject: subjectFromURL,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formData;
    const encodedMessage = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0AMessage: ${message}`;
    const whatsappURL = `https://wa.me/919725281074?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form ref={ref} className="max-w-2xl mx-auto space-y-4" onSubmit={handleSubmit}>
      <FormInput
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name*"
        required
      />
      <FormInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email*"
        required
      />
      <FormInput
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone*"
        required
      />
      <FormInput
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Card Name*"
        required
      />
      <FormTextarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message*"
        rows="5"
        required
      />
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
      >
        Send on WhatsApp
      </button>
    </form>
  );
});

export default ContactForm;
