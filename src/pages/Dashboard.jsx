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

  const { value } = useParams();
  const [redirectionUrl, setRedirectionUrl] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [createdUrl, setCreatedUrl] = useState(null);

  /* -----------------------------------------------------
    1) HANDLE REDIRECTION WHEN VISITING /:value
  ----------------------------------------------------- */
  useEffect(() => {
    if (!value) return;

    const checkShortCode = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_CLIENT_URL}/api/links/${value}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        const data = await res.json();
        setRedirectionUrl(data.url);
      } catch {
        setNotFound(true);
      }
    };

    checkShortCode();
  }, [value]);

  /* -----------------------------------------------------
    2) OPEN LINK IN NEW TAB
  ----------------------------------------------------- */
  useEffect(() => {
    if (!redirectionUrl || notFound) return;

    let finalUrl = redirectionUrl.trim();

    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    window.open(finalUrl, "_blank");
  }, [redirectionUrl, notFound]);

  /* -----------------------------------------------------
    3) SHOW NOT FOUND PAGE
  ----------------------------------------------------- */
  if (notFound) return <NotFound />;

  /* -----------------------------------------------------
    4) FETCH ALL LINKS
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
    5) UI RENDER
  ----------------------------------------------------- */
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
