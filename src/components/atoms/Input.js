import React from "react";

const baseStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  marginTop: "0.25rem",
  border: "5px solid black",
  backgroundColor: "#fff",
  fontWeight: "700",
  fontSize: "1rem",
  color: "black",
  boxSizing: "border-box",
  userSelect: "text",
  outline: "none",
  transition: "all 0.2s ease-in-out",
};

const focusStyle = {
  borderColor: "#FF3B3F",
  backgroundColor: "#ffeaea",
  boxShadow: "0 0 0 4px #FF3B3F80",
};

const Input = ({
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        ...baseStyle,
        ...(isFocused ? focusStyle : {}),
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default Input;
