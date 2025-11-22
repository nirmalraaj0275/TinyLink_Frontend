import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LinkTable({ links, onDelete }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleDelete = async (code) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/links/${code}`);
      await onDelete();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete link.");
    }
  };

  const copyShortUrl = async (code) => {
    const origin = import.meta.env.VITE_API_URL;
    const shortUrl = `${origin}/${code}`;

    await window.navigator.clipboard.writeText(shortUrl);


    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1200);
  };

  if (!links.length) {
    return (
      <p className="mt-6 text-sm text-slate-500">
        No links yet. Click <b>“+ Create Short Link”</b> to add your first one.
      </p>
    );
  }


  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-xl text-sm border border-slate-200">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="p-3 text-left font-semibold">Short Code</th>
            <th className="p-3 text-left font-semibold">Destination</th>
            <th className="p-3 text-left font-semibold">Clicks</th>
            <th className="p-3 text-left font-semibold">Last Clicked</th>
            <th className="p-3 text-left font-semibold w-40">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {links.map((l) => {
            const shortUrl = `${import.meta.env.VITE_API_URL}/${l.code}`;

            return (
              <tr key={l.code} className="hover:bg-slate-50 transition-all">

                {/* SHORT CODE */}
                <td className="p-3">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition"
                  >
                    {l.code}
                  </a>
                </td>

                {/* LONG URL */}
                <td className="p-3 max-w-xs">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate text-slate-700 hover:text-blue-600 hover:underline"
                  >
                    {l.url}
                  </a>
                </td>

                {/* TOTAL CLICKS */}
                <td className="p-3 font-semibold text-slate-700 text-center">
                  {l.totalClicks ?? 0}
                </td>

                {/* LAST CLICKED */}
                <td className="p-3 text-slate-500">
                  {l.lastClicked
                    ? new Date(l.lastClicked).toLocaleString()
                    : "—"}
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-3 flex gap-2">

                  {/* COPY BUTTON WITH ANIMATION */}
                  <button
                    onClick={() => copyShortUrl(l.code)}
                    className={`px-3 py-1 text-xs rounded-lg border transition relative overflow-hidden
                      ${copiedCode === l.code
                        ? "border-green-500 text-white bg-green-500"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                      }`}
                  >
                    {copiedCode === l.code ? "Copied!" : "Copy"}

                    {/* Ripple Effect */}
                    <span className="absolute inset-0 animate-ripple bg-white opacity-20"></span>
                  </button>

                  {/* STATS BUTTON */}
                  <Link
                    to={`/code/${l.code}`}
                    className="px-3 py-1 text-xs border rounded-lg border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                  >
                    Stats
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(l.code)}
                    className="px-3 py-1 text-xs border rounded-lg border-red-500 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Ripple Animation Keyframes */}
      <style>
        {`
          .animate-ripple {
            animation: ripple 0.6s ease-out;
          }
          @keyframes ripple {
            from { transform: scale(0); opacity: 0.5; }
            to { transform: scale(4); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
