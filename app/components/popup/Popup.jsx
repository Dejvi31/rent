import React, { useState, useEffect, useRef } from "react";

const Popup = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const popupRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <section
        ref={popupRef}
        className="max-w-lg w-full mx-auto overflow-y-auto bg-white rounded-lg shadow-lg p-5 relative"
      >
        <button
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          ❌
        </button>
        {children}
      </section>
    </section>
  );
};

export default Popup;
