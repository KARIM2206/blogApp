import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, Trash2 } from 'lucide-react';
import { AuthContext } from '../../Context/Provider';
import BreadCrumb from '../../BreadCrumb';

// Commented out API import for testing with fake data
// import { getCatogeries } from '../../../../utils/libs';

const Categories = () => {
  const { setUpdateCategoriesData, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteItem, setDeleteItem] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const totalPage = Math.ceil(categories.length / limit);
  const lastIndex = limit * currentPage;
  const firstIndex = lastIndex - limit;
  const slice = categories.slice(firstIndex, lastIndex);

  // Fake categories data for testing
  const fakeCategories = [
    { id: 1, name: "Technology", slug: "technology", createdAt: "2025-01-10T10:00:00Z" },
    { id: 2, name: "Health", slug: "health", createdAt: "2025-01-15T12:00:00Z" },
    { id: 3, name: "Education", slug: "education", createdAt: "2025-02-01T09:00:00Z" },
    { id: 4, name: "Lifestyle", slug: "lifestyle", createdAt: "2025-02-10T14:00:00Z" },
    { id: 5, name: "Travel", slug: "travel", createdAt: "2025-03-05T11:00:00Z" },
    { id: 6, name: "Food", slug: "food", createdAt: "2025-03-15T16:00:00Z" },
    { id: 7, name: "Business", slug: "business", createdAt: "2025-04-01T08:00:00Z" },
    { id: 8, name: "Sports", slug: "sports", createdAt: "2025-04-10T13:00:00Z" },
    { id: 9, name: "Fashion", slug: "fashion", createdAt: "2025-04-20T15:00:00Z" },
    { id: 10, name: "Science", slug: "science", createdAt: "2025-05-01T10:00:00Z" },
    { id: 11, name: "Entertainment", slug: "entertainment", createdAt: "2025-05-10T12:00:00Z" },
    { id: 12, name: "Art", slug: "art", createdAt: "2025-05-15T14:00:00Z" },
     { id: 12, name: "Art", slug: "art", createdAt: "2025-05-15T14:00:00Z" },
  ];

  // Initialize fake data in Local Storage
  useEffect(() => {
    const storedCategories = localStorage.getItem("fakeCategories");
    if (!storedCategories) {
      localStorage.setItem("fakeCategories", JSON.stringify(fakeCategories));
      setCategories(fakeCategories);
    } else {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Update categories from Local Storage on change
  useEffect(() => {
    const storedCategories = localStorage.getItem("fakeCategories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, [deleteItem]);

  // Commented out API fetch for testing
  /*
  const fetchCategories = async () => {
    try {
      const data = await getCatogeries();
      if (data && jammedArray.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  */

  const handleUpdate = useCallback((categoryId) => {
    const singleCategory = categories.find(e => e.id === categoryId);
    setUpdateCategoriesData(singleCategory);
    navigate(`/dashboard/categories/update/${categoryId}`);
  }, [categories, navigate, setUpdateCategoriesData]);

  const handleDelete = useCallback((categoryId) => {
    setDeleteItem(true);
    setCategoryId(categoryId);
  }, []);

  const handleDeleteItem = useCallback(() => {
    try {
      // Update categories in Local Storage
      const storedCategories = JSON.parse(localStorage.getItem("fakeCategories")) || [];
      const updatedCategories = storedCategories.filter(e => e.id !== parseInt(categoryId));
      localStorage.setItem("fakeCategories", JSON.stringify(updatedCategories));
      setCategories(updatedCategories);

      alert("Category deleted successfully!");
      setDeleteItem(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  }, [categoryId]);

  // Commented out API delete for testing
  /*
  const handleDeleteItem = async () => {
    try {
      const deleteApi = await fetch(
        `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!deleteApi.ok) {
        const errorResponse = await deleteApi.json();
        console.error("API Error Response:", errorResponse);
        alert(`Category deletion failed: ${errorResponse.message || "Unknown error"}`);
        return;
      }

      alert("Category deleted successfully!");
      setCategories(c => c.filter(e => e.id !== categoryId));
      setDeleteItem(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };
  */

  return (
    <div className="flex flex-col min-h-screen  bg-gray-100 md:ml-64 p-4 sm:p-6 md:p-8">
      <div className="max-w-full mx-auto">
        <BreadCrumb
          links={[
            { name: 'Dashboard', url: '/dashboard' },
            { name: 'Categories', url: '/dashboard/categories' },
          ]}
        />
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Categories Dashboard</h1>
          <Link
            to="/dashboard/categories/create"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm w-full sm:w-auto text-center"
          >
            <Plus size={20} />
            Add New Category
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-800">
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">ID</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Category Name</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Slug</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Created At</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.length ? (
                slice.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{category.id}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{category.name}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{category.slug}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 sm:p-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleUpdate(category.id)}
                        className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-600 transition duration-200 text-xs sm:text-sm md:text-base"
                      >
                        <RefreshCw size={16} />
                        
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition duration-200 text-xs sm:text-sm md:text-base"
                      >
                        <Trash2 size={16} />
                       
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm">
                Are you sure you want to delete this category?
              </p>
              <div className="flex justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setDeleteItem(false)}
                  className="px-3 py-1 sm:px-4 sm:py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteItem}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-xs sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {categories.length > limit && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-4">
            <button
              className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-xs sm:text-sm md:text-base transition duration-200 ${
                currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(c => c - 1)}
            >
              Previous
            </button>
            <span className="text-gray-700 text-xs sm:text-sm md:text-base">Page {currentPage} of {totalPage}</span>
            <button
              className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-xs sm:text-sm md:text-base transition duration-200 ${
                currentPage >= totalPage ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={currentPage >= totalPage}
              onClick={() => setCurrentPage(c => c + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;