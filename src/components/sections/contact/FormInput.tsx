// src/components/contact/FormInput.jsx
import React from "react";

const FormInput = ({ type, name, value, onChange, placeholder, required = false }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 border border-border-subtle bg-surface text-text-main rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    required={required}
  />
);

export default FormInput;
