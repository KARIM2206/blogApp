// components/ProtectedLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 sm:h-14 shadow-md text-white sticky top-0 z-50 bg-gray-800">
        <Navbar />
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-100 py-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <Footer />
      </footer>
    </div>
  );
};

export default ProtectedLayout;