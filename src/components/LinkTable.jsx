import { Link } from "react-router-dom";
import axios from "axios";

export default function LinkTable({ links, onDelete }) {
  const handleDelete = async (code) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/links/${code}`);
      await onDelete();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete link.");
    }
  };

  // ✅ SHORT URL SHOULD USE ONLY BACKEND ROOT + CODE
  const copyShortUrl = (code) => {
    const backend = import.meta.env.VITE_API_URL; // backend URL
    const shortUrl = `${backend}/${code}`;        // backend redirect route
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
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
      <table className="min-w-full bg-white rounded-xl shadow-lg text-sm border border-slate-200">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="p-3 text-left font-semibold">Short Code</th>
            <th className="p-3 text-left font-semibold">Destination</th>
            <th className="p-3 text-left font-semibold">Clicks</th>
            <th className="p-3 text-left font-semibold">Last Clicked</th>
            <th className="p-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {links.map((l) => (
            <tr
              key={l.code}
              className="hover:bg-slate-50 transition-all duration-200"
            >
              {/* Short Code (Backend redirect URL) */}
              <td className="p-3 font-mono">
                <a
                  href={`${import.meta.env.VITE_API_URL}/${l.code}`}   // <--- FIXED
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:text-blue-700"
                >
                  {l.code}
                </a>
              </td>

              {/* Long URL */}
              <td className="p-3 max-w-xs">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 hover:text-blue-600 hover:underline block truncate"
                >
                  {l.url}
                </a>
              </td>

              {/* Clicks */}
              <td className="p-3 font-semibold text-slate-700">
                {l.totalClicks ?? l.clicks ?? 0}
              </td>

              {/* Last Clicked */}
              <td className="p-3 text-slate-500">
                {l.lastClickedAt || l.lastClicked
                  ? new Date(l.lastClickedAt || l.lastClicked).toLocaleString()
                  : "—"}
              </td>

              {/* Action Buttons */}
              <td className="p-3 flex gap-2">
                {/* Copy */}
                <button
                  onClick={() => copyShortUrl(l.code)}
                  className="px-3 py-1 text-xs border rounded-lg border-slate-300 text-slate-600 hover:bg-slate-100 transition"
                >
                  Copy
                </button>

                {/* Stats */}
                <Link
                  to={`/code/${l.code}`}
                  className="px-3 py-1 text-xs border rounded-lg border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                >
                  Stats
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(l.code)}
                  className="px-3 py-1 text-xs border rounded-lg border-red-500 text-red-600 hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
