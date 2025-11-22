export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-slate-800">
      
      {/* HEADER */}
      <header className="backdrop-blur bg-white/70 border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Tiny<span className="text-blue-600">Link</span>
          </h1>

          {/* <span className="text-xs text-slate-500 font-medium">
            MERN • URL Shortener
          </span> */}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-4 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} TinyLink • All Rights Reserved</span>
       
        </div>
      </footer>

    </div>
  );
}
