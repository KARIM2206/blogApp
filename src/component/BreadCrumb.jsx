import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ links = [] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm sm:text-base text-gray-600 py-2 sm:py-3">
      {links.length === 0 ? (
        <span className="text-gray-500">No breadcrumbs available</span>
      ) : (
        links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            {link.url ? (
              <Link
                to={link.url}
                className="text-indigo-600 hover:text-indigo-800 transition duration-200 font-medium"
              >
                {link.name}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{link.name}</span>
            )}
            {index < links.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </div>
        ))
      )}
    </nav>
  );
};

export default BreadCrumb;