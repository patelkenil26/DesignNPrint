// src/components/contact/FormTextarea.jsx
import React from "react";

const FormTextarea = ({ name, value, onChange, placeholder, rows = 5, required = false }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required={required}
  />
);

export default FormTextarea;
