const Input = ({ type = "text", id, placeholder, value, onChange, required, ...props }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 mt-1 border-2 border-black text-black bg-white
      font-mono text-sm rounded-none focus:outline-none focus:ring-0"
      {...props}
    />
  );
};
