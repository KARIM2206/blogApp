import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context/Provider";

const Navbar = () => {
  const { user, setUser, token, setToken, isLogged, setIsLogged } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isLogged) {
      setLoading(false);
    }
  }, [isLogged]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setIsLogged(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/blogger.png"
            alt="blog icon"
            className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
          />
          <span className="ml-2 text-lg sm:text-xl font-bold text-indigo-900">BlogEdu</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              {loading ? (
                <p className="text-gray-600 text-sm">Loading...</p>
              ) : (
                <p className="text-gray-800 text-sm">Hello, {user?.username || "Guest"}</p>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/dashboard/posts"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                admin
              </Link>
              <Link
                to="/login"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition duration-200"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Burger Menu for Navbar */}
        <button
          className="md:hidden text-indigo-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu for Navbar */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 flex flex-col gap-4">
            {token ? (
              <>
                {loading ? (
                  <p className="text-gray-600 text-sm">Loading...</p>
                ) : (
                  <p className="text-gray-800 text-sm">Hello, {user?.username || "Guest"}</p>
                )}
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition duration-200 text-left"
                >
                  Logout
                </button>
                 
              </>
            ) : (
              <>
           
           <Link
  to="/dashboard/posts"
  onClick={() => setIsMenuOpen(false)}
  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm
   font-medium text-white hover:bg-indigo-700 focus:outline-none
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 text-left"
>
  admin
</Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition duration-200 text-left"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition duration-200 text-left"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;