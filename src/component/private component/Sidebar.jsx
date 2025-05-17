import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActiveLink, setIsActiveLink] = useState("/posts");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.replace("/dashboard", "") || "/posts";
    setIsActiveLink(currentPath);
  }, [location]);

  useEffect(() => {
    if (!location.pathname.startsWith("/dashboard")) {
      navigate(`/dashboard${isActiveLink}`);
    }
  }, []);

  const dashboardData = [
    { title: "Posts", url: "/posts" },
    { title: "Users", url: "/users" },
    { title: "Categories", url: "/categories" },
  ];

  const activeClass = (link) => {
    setIsActiveLink(link);
    setIsOpen(false);
  };

  return (
    <div className="flex ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 md:py-10 left-0 z-40 w-64 bg-indigo-900 text-white
           transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 min-h-screen flex flex-col mt-16 md:mt-0`}
      >
        {/* Navigation Bar with Logo and Close Button */}
        <div className="flex items-center justify-between px-4 py-16  bg-indigo-800 md:hidden">
          <span className="text-2xl font-bold">BlogEdu</span>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 mt-4 md:mt-0">
          {dashboardData.map((item, index) => (
            <Link
              key={index}
              to={`/dashboard${item.url}`}
              onClick={() => activeClass(item.url)}
              className={`block py-2.5 px-4 rounded-lg mb-1 transition duration-200 hover:bg-indigo-700 ${
                item.url === isActiveLink ? "bg-indigo-600" : ""
              } capitalize text-sm md:text-base`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Burger Menu for Sidebar */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 text-indigo-900 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;