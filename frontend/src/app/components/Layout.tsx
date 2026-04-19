import { Outlet, useNavigate, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Inicio", path: "/" },
  { label: "Sobre Mí", path: "/sobre-mi" },
  { label: "Calculadora FinOps", path: "/calculadora-finops" },
];

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#CAF0F8", color: "#023E8A" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: "#023E8A" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={`${import.meta.env.BASE_URL}profile.png`}
              alt="Javi Plaza"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
              Javi Plaza
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "#0077B6" : "transparent",
                      color: isActive ? "#CAF0F8" : "#90E0EF",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0077B620";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4" style={{ backgroundColor: "#023E8A" }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg mb-1 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "#0077B6" : "transparent",
                    color: isActive ? "#CAF0F8" : "#90E0EF",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-sm"
        style={{ backgroundColor: "#023E8A", color: "#90E0EF" }}
      >
        <p>© 2026 Javi Plaza · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
