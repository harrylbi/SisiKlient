import React from "react";

const buttonBaseStyle = {
  padding: "0.5rem 1rem", // ↓ ukuran padding dikurangi
  border: "4px solid black", // ↓ ketebalan border dikurangi
  backgroundColor: "#FF3B3F",
  color: "black",
  fontWeight: "900",
  textTransform: "uppercase",
  letterSpacing: "1px", // sedikit dikurangi
  cursor: "pointer",
  boxShadow: "4px 4px 0 black", // ↓ ukuran shadow dikurangi
  transition: "all 0.2s ease-in-out",
  userSelect: "none",
  fontSize: "0.875rem", // tambahkan ukuran font (14px)
};

const hoverStyle = {
  backgroundColor: "black",
  color: "#FF3B3F",
  boxShadow: "none",
  borderColor: "black",
};

const Button = ({ children, type = "button", onClick, className }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      style={{
        ...buttonBaseStyle,
        ...(hover ? hoverStyle : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
};

export default Button;
