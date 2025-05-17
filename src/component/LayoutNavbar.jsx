// components/ProtectedLayout.js
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const LayoutNavbar = () => {
  return (
    <div className="flex flex-col h-screen">
    
      <header className="h-16 shadow-md  sm:h-14 text-white">
        <Navbar />
      </header>

      <main className="flex-1 overflow-auto pb-4  bg-gray-100">
        <Outlet />
      </main>

     <Footer />

       
   
    
    </div>
  );
};

export default LayoutNavbar;
