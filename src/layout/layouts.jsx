export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-slate-800">

      {/* ======= HEADER (Fixed Top) ======= */}
      <header className="backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
            Tiny<span className="text-blue-600">Link</span>
          </h1>

        </div>
      </header>

      {/* ======= MAIN CONTENT ======= */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 align-center">
        {children}
      </main>

      {/* ======= CURVED FOOTER DESIGN ======= */}
      <div className="relative">
        {/* Curved Shape */}

        
        {/* Footer Actual */}
        <footer className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-5 text-xs text-slate-500 flex justify-between items-center">
            <span>© {new Date().getFullYear()} TinyLink — All Rights Reserved</span>
          </div>
        </footer>
      </div>

    </div>
  );
}
