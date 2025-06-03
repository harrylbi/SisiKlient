import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className="bg-yellow-300 border-4 border-black w-full max-w-md p-6"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          borderStyle: "solid",
          borderRadius: 0,
          boxShadow: "none",
        }}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
          <h2 className="text-xl font-extrabold uppercase tracking-widest text-black">
            Edit Mahasiswa
          </h2>
          <button
            onClick={onClose}
            className="text-black text-3xl font-bold hover:text-red-600 focus:outline-none"
            aria-label="Close modal"
            style={{ lineHeight: 1 }}
          >
            &times;
          </button>
        </div>

        {/* Isi Modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
