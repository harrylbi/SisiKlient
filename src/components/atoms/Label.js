const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-bold uppercase text-black tracking-widest mb-1"
    >
      {children}
    </label>
  );
};
