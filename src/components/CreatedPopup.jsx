import React, { useState } from "react";
import { FiExternalLink, FiCopy } from "react-icons/fi";

export default function CreatedPopup({ shortUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openRedirect = () => {
    window.open(shortUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-7 border border-gray-200 animate-scaleIn">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          🎉 Link Created Successfully
        </h2>

        {/* URL Box */}
        <div className="relative mb-6">
          <input
            type="text"
            value={shortUrl}
            readOnly
            className="w-full border-2 border-green-400 text-gray-800 rounded-xl px-4 py-3 pr-16 text-sm bg-green-50 outline-none"
          />

          {/* Visit Button */}
          <button
            onClick={openRedirect}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-700 transition"
          >
            <FiExternalLink size={20} />
          </button>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700 transition"
          >
            {copied ? (
              <span className="text-green-700 text-sm font-semibold animate-bounce">
                ✓
              </span>
            ) : (
              <FiCopy size={20} />
            )}
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={openRedirect}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Visit URL
          </button>

          <button
            onClick={copyToClipboard}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-transform hover:scale-105"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 text-gray-600 hover:text-gray-900 underline block mx-auto transition"
        >
          Close
        </button>
      </div>

    </div>
  );
}
