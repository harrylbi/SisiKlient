import React from "react";

const Card = ({ title, value, icon, color = "blue", colSpan, className = "" }) => {
  // Define color classes based on the color prop
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-800",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-800",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
  };

  const { bg, text } = colorClasses[color] || colorClasses.blue;

  // Mapping colSpan ke class Tailwind grid column span
  // colSpan bisa berupa number (1,2,3...) atau string 'full'
  let colSpanClass = "";
  if (colSpan) {
    if (colSpan === "full") {
      colSpanClass = "col-span-full";
    } else if (typeof colSpan === "number") {
      colSpanClass = `col-span-${colSpan}`;
    }
  }

  return (
    <div className={`${bg} p-4 rounded-lg shadow ${colSpanClass} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-medium ${text}`}>{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
