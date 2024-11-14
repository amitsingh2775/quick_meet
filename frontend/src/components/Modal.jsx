import React from "react";
import { Button } from "@/components/ui/button"; // Adjust according to your theme
import { FaTimes } from "react-icons/fa"; // Close button icon

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // If the modal is not open, don't render it

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
