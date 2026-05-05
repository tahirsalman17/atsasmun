'use client';
import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const Whatsapp = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = "+447498072531";
  const chatRef = useRef(null);

  useEffect(() => {
    // Check if the device is mobile
    const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  useEffect(() => {
    // Close modal if clicking outside
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target)
      ) {
        setIsChatVisible(false);
      }
    };

    if (isChatVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isChatVisible]);

  // Generate WhatsApp URL with message
  const getWhatsAppUrl = (message) => {
    const encodedMessage = encodeURIComponent(message);
    if (isMobile) {
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
    return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  return (
    <div className="relative">
      {/* Floating Action Button (modelunitednation.org style) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsChatVisible((prev) => !prev);
        }}
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex flex-col items-center justify-center bg-[#4eb2e3] text-black px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow-2xl hover:bg-[#3ea0d1] transition-transform transform hover:scale-105"
        aria-label="Do you need assistance? We are here to help"
      >
        <span className="text-xs sm:text-sm tracking-wide">Do you need assistance?</span>
        <span className="text-xs sm:text-sm tracking-wide">We are here to help</span>
      </button>

      {/* Support Options Modal */}
      {isChatVisible && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 sm:bottom-28 sm:right-10 z-50 bg-white w-64 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-fade-in"
        >
          {/* Modal Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-800 text-sm">Contact Support</span>
            <button
              onClick={() => setIsChatVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 flex flex-col gap-3">
            <p className="text-xs text-gray-500 mb-1">Select an option to reach out to us:</p>
            
            {/* WhatsApp Option */}
            <a
              href={getWhatsAppUrl("Hello! I have questions regarding Atsas International MUN.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl transition-colors shadow-sm hover:shadow"
              aria-label="Chat on WhatsApp"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <FaWhatsapp size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">WhatsApp</span>
                <span className="text-[10px] text-white/90">Typically replies instantly</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
