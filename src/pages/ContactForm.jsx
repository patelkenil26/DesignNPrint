import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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

    const whatsappNumber = "919725281074"; // <-- yaha apna number daal with country code
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    // Optional: Reset form after sending
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form className="max-w-2xl mx-auto space-y-4" onSubmit={handleSubmit}>
      {["name", "email", "phone", "subject", "message"].map((field, i) => (
        <div key={field}>
          {field !== "message" ? (
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}*`}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ) : (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder="Your Message*"
              rows="5"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
      >
        Send on WhatsApp
      </button>
    </form>
  );
};

export default ContactForm;
