import { useState } from "react";
import { FiExternalLink, FiCopy } from "react-icons/fi";

export default function CreatedPopup({ shortUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const openLink = () => {
    window.open(shortUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-200">

       
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          🎉 Short Link Created!
        </h2>

        {/* Short URL Input */}
        <div className="relative mb-5">
          <input
            type="text"
            value={shortUrl}
            readOnly
            className="w-full border border-green-400 bg-green-50 text-gray-800 rounded-xl px-4 py-3 pr-20 text-sm"
          />

       
          <button
            onClick={openLink}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-700"
          >
            <FiExternalLink size={18} />
          </button>

          
          <button
            onClick={handleCopy}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700"
          >
            {copied ? (
              <span className="text-green-700 text-sm font-semibold">✓</span>
            ) : (
              <FiCopy size={18} />
            )}
          </button>
        </div>

       
        <div className="flex justify-center gap-3">
          <button
            onClick={openLink}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Visit URL
          </button>

          <button
            onClick={handleCopy}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-6 block mx-auto text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
