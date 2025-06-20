// BUTTON COMPONENT (Button.js)  ==> src/components/atoms/Button.js

import React from "react";

const Button = ({ children, type = "button", onClick, className }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-black transition duration-300 ease-in-out bg-blue-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
