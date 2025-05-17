import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen mx-0 overflow-hidden">
      <Sidebar />
      <main className="w-full h-full pt-16">
        <div className="h-full overflow-y-auto hide-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
