// MODAL COMPONENT (Modal.js)  ==> src/components/molecules/Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] w-full max-w-md p-6">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
          <h2 className="text-xl font-bold text-black">Edit Mahasiswa</h2>
          <button
            className="text-black hover:text-red-600 text-2xl font-bold leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Isi Modal */}
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
