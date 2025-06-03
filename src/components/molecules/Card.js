import React from "react";

const Card = ({ title, value, icon, color = "black", colSpan, className = "" }) => {
  // Warna background & text untuk gaya brutalisme (warna solid & kontras)
  const colorClasses = {
    black: {
      bg: "bg-white",       // background putih polos
      text: "text-black",   // teks hitam
      border: "border-black",
    },
    red: {
      bg: "bg-red-500",
      text: "text-white",
      border: "border-red-900",
    },
    blue: {
      bg: "bg-blue-500",
      text: "text-white",
      border: "border-blue-900",
    },
    green: {
      bg: "bg-green-500",
      text: "text-white",
      border: "border-green-900",
    },
    yellow: {
      bg: "bg-yellow-400",
      text: "text-black",
      border: "border-yellow-900",
    },
  };

  const { bg, text, border } = colorClasses[color] || colorClasses.black;

  let colSpanClass = "";
  if (colSpan) {
    if (colSpan === "full") {
      colSpanClass = "col-span-full";
    } else if (typeof colSpan === "number") {
      colSpanClass = `col-span-${colSpan}`;
    }
  }

  return (
    <div
      className={`${bg} ${text} ${border} border-4 p-6 rounded-none shadow-none font-mono ${colSpanClass} ${className}`}
      style={{ boxShadow: "none" }}
    >
      <div className="flex items-center justify-between mb-3 border-b-4 border-current pb-2">
        <h3 className="text-lg font-bold tracking-wide">{title}</h3>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      <p className="text-3xl font-extrabold">{value}</p>
    </div>
  );
};

export default Card;
