import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Menu, X } from "lucide-react"; // Optional: or use Unicode or SVG icons

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const getUserInitial = () => {
    if (!user) return "";
    return user.displayName
      ? user.displayName.charAt(0).toUpperCase()
      : user.email.charAt(0).toUpperCase();
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center">
          <img
            src="/RenderXSvgLogo.svg"
            alt="Render-X Logo"
            className="h-14 w-auto object-contain"
          />
          <Link to="/home">
            <span className="text-2xl font-extrabold text-emerald-400 ml-2">
              Render-X
            </span>
          </Link>
        </div>

        {/* Hamburger toggle (mobile) */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Center nav (desktop) */}
        <ul className="hidden lg:flex space-x-8 text-lg items-center">
          {["Home", "Games", "Tournaments", "Booking", "Shop"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="relative group transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Auth or Initial */}
        <div className="hidden lg:flex space-x-4 text-lg items-center">
          {user ? (
            <div
              onClick={() => navigate("/profile")}
              className="h-10 w-10 flex items-center justify-center bg-emerald-500 rounded-full text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform"
              title="Go to Profile"
            >
              {getUserInitial()}
            </div>
          ) : (
            <Link to="/auth" className="relative group transition">
              Register / Login
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4 flex flex-col text-center">
          {["Home", "Games", "Tournaments", "Booking", "Shop"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={closeMenu}
              className="block py-2 text-lg border-b border-gray-700"
            >
              {item}
            </Link>
          ))}

          {user ? (
            <div
              onClick={() => {
                navigate("/profile");
                closeMenu();
              }}
              className="h-10 w-10 mx-auto flex items-center justify-center bg-emerald-500 rounded-full text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform"
            >
              {getUserInitial()}
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={closeMenu}
              className="py-2 text-lg text-blue-400"
            >
              Register / Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
