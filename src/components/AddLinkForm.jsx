import { useState } from "react";

export default function AddLinkForm({ onClose, onSuccess }) {
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRandomCode = () =>
    Math.random().toString(36).substring(2, 10).slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const codeToSend = code.trim() || generateRandomCode();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToSend, url: longUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const shortUrl = `${import.meta.env.VITE_API_URL}/${codeToSend}`;
      onSuccess(shortUrl);
      onClose();

    } catch {
      setError("Network error");
    }

    setLongUrl("");
    setCode("");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-[fadeIn_0.25s_ease]">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create Short Link
        </h2>

        {/* Error message */}
        {error && (
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg mb-3">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Long URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination URL <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="https://example.com/article"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="w-full border-2 border-green-400 text-gray-800 rounded-xl px-4 py-3 pr-16 text-sm bg-green-50 outline-none"
            />
          </div>

          {/* Custom Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Code (optional)
            </label>

            <input
              type="text"
              placeholder="my-custom-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border-2 border-green-400 text-gray-800 rounded-xl px-4 py-3 pr-16 text-sm bg-green-50 outline-none"
            />


            <p className="mt-1 text-xs text-gray-500">
              (6–8 characters recommended: letters + numbers)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2 justify-between">

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-transform hover:scale-105"
            >
              {loading ? "Creating..." : "Create Link"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-transform hover:scale-105">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
