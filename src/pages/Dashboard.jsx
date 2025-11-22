import { useEffect, useState } from "react";
import AddLinkForm from "@/components/AddLinkForm";
import LinkTable from "@/components/LinkTable";
import Loader from "@/components/Loader";
import Layout from "@/layout/layouts";
import NotFound from "@/components/notfound";
import CreatedPopup from "@/components/CreatedPopup";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { value } = useParams();  // short code from URL
  const [notFound, setNotFound] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);

  /* -----------------------------------------------------
    FETCH ALL LINKS (Dashboard table)
  ----------------------------------------------------- */
  const loadLinks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch {
      console.error("Failed to fetch links");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  /* -----------------------------------------------------
    AUTO-OPEN REDIRECT PAGE IN NEW TAB
    (This is the correct production behavior)
  ----------------------------------------------------- */
  useEffect(() => {
    if (!value) return;

    // Backend will handle 301 redirect for us
    const backendRedirectUrl = `${import.meta.env.VITE_API_URL}/api/links/${value}`;

    // Open redirect route in new tab
    window.open(backendRedirectUrl, "_blank");
  }, [value]);

  /* -----------------------------------------------------
    SHOW NOT FOUND PAGE IF API RETURNS 404
    (Optional: if you have a dedicated NotFound UI)
  ----------------------------------------------------- */
  useEffect(() => {
    const checkCodeExists = async () => {
      if (!value) return;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/links/${value}`, {
        method: "HEAD",
      });

      if (res.status === 404) setNotFound(true);
    };

    checkCodeExists();
  }, [value]);

  if (notFound) return <NotFound />;


  return (
    <Layout>
      {/* HEADER */}
      <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4 ">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-sm text-slate-500">
            Manage your short links, track clicks, and view analytics.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow text-sm hover:bg-blue-700 transition"
        >
          + Create Short Link
        </button>
      </div>

      {/* SEARCH */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by code or URL..."
          className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* TABLE OR LOADER */}
      <div className="mt-6 overflow-x-auto">
        {loading ? <Loader /> : <LinkTable links={links} onDelete={loadLinks} />}
      </div>

      {/* POPUP: CREATE LINK */}
      {showForm && (
        <AddLinkForm
          onClose={() => setShowForm(false)}
          onSuccess={(shortUrl) => {
            setShowForm(false);
            loadLinks();
            setCreatedUrl(shortUrl);
          }}
        />
      )}

      {/* POPUP: CREATED SUCCESSFULLY */}
      {createdUrl && (
        <CreatedPopup shortUrl={createdUrl} onClose={() => setCreatedUrl(null)} />
      )}
    </Layout>
  );
}
