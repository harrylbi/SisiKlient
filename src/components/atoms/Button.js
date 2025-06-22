// BUTTON COMPONENT (Button.js)  ==> src/components/atoms/Button.js

import React from "react";

const Button = ({ children, type = "button", onClick, className }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 border-2 border-black bg-white text-black text-sm uppercase font-bold tracking-wide
        hover:bg-black hover:text-white transition-none rounded-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
