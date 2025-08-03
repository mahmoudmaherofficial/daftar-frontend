import React from "react";
import "./input.css";

const Input = ({ className, type, placeholder, value, onChange, name, id, onBlur }) => {
  return (
    <div className="input-container">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
