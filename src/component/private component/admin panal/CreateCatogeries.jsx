import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from 'lucide-react';
import { AuthContext } from "../../Context/Provider";
import BreadCrumb from "../../BreadCrumb"; // Adjust path based on your project structure

const CreateCategories = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    try {
      if (!name || !slug) {
        alert("Name and slug are required.");
        return;
      }

      // Fake data creation for testing
      const newCategory = {
        id: Date.now(), // Use timestamp as unique ID
        name,
        slug,
        createdAt: new Date().toISOString(),
      };

      // Update Local Storage
      const storedCategories = JSON.parse(localStorage.getItem("fakeCategories")) || [];
      const updatedCategories = [...storedCategories, newCategory];
      localStorage.setItem("fakeCategories", JSON.stringify(updatedCategories));

      alert("Category created successfully!");
      setName("");
      setSlug("");
      navigate("/dashboard/categories");

      // Commented out API call for testing
      /*
      const postApi = await fetch(
        "http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ name, slug }),
        }
      );

      if (!postApi.ok) {
        const errorResponse = await postApi.json();
        console.error("API Error Response:", errorResponse);
        alert(`Category creation failed: ${errorResponse.message || "Unknown error"}`);
        return;
      }

      alert("Category created successfully!");
      setName("");
      setSlug("");
      navigate("/dashboard/categories");
      */
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:ml-64 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Breadcrumb */}
        <BreadCrumb
          links={[
            { name: "Dashboard", url: "/dashboard" },
            { name: "Categories", url: "/dashboard/categories" },
            { name: "Create Category", url: null },
          ]}
        />

        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Create New Category
        </h1>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-600 text-sm sm:text-base font-medium">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-gray-600 text-sm sm:text-base font-medium">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter slug"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm text-sm sm:text-base"
            >
              <Plus size={20} />
              Publish Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategories;