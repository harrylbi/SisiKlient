import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontWeight: "900",
        fontSize: "1rem",
        color: "#000",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        borderBottom: "3px solid black",
        paddingBottom: "0.25rem",
        userSelect: "none",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </label>
  );
};

export default Label;
