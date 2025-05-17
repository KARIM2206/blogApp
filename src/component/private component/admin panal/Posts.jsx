import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Provider";
import BreadCrumb from "../../BreadCrumb";

const Posts = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [postId, setPostId] = useState("");
  const {
    setPostItem,
    postItem,
    setCurrentPage,
    currentPage,
    setUpdatePostData,
    token,
    limit,
    setRenderPostPage
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const totalPage = Math.ceil(postItem.length / limit);

  const handleUpdate = (postId) => {
    navigate(`/dashboard/posts/update/${postId}`);
    const singlePost = postItem.find((post) => post.id === postId);
    setUpdatePostData(singlePost);
  };

  const handleDelete = (postId) => {
    setIsDeleted(true);
    setPostId(postId);
  };

  const handleDeleteItem = async () => {
    try {
      const deleteApi = await fetch(
        `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!deleteApi.ok) {
        const errorResponse = await deleteApi.json();
        console.error("API Error Response:", errorResponse);
        alert(`Post deletion failed: ${errorResponse.message || "Unknown error"}`);
        return;
      }

      alert("Post deleted successfully!");
      setRenderPostPage(c => c + 1);
      setIsDeleted(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:ml-64">
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-full mx-auto">
           <BreadCrumb
          links={[
            { name: 'Dashboard', url: '/dashboard' },
            { name: 'Posts', url: '/dashboard/posts' },
          ]}
        />
          {/* Header with Add Post button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h1 className="text-xl   w-full flex justify-center items-center sm:text-2xl md:text-3xl font-bold text-gray-800">Blog Posts Dashboard</h1>
            <Link
              to="/dashboard/posts/create"
              className="bg-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm w-full sm:w-auto text-center"
            >
              Add New Post
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-800">
                  <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">ID</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Post Title</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Author</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Created</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {postItem?.length ? (
                  postItem.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50 transition duration-150">
                      <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{post.id}</td>
                      <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{post.title}</td>
                      <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{post.author.username}</td>
                      <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 sm:p-4 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleUpdate(post.id)}
                          className="bg-indigo-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-600 transition duration-200 text-xs sm:text-sm md:text-base"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition duration-200 text-xs sm:text-sm md:text-base"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                      No posts available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Delete Confirmation Modal */}
          {isDeleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm">Are you sure you want to delete this post?</p>
                <div className="flex justify-end gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsDeleted(false)}
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
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-4">
            <button
              className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-xs sm:text-sm md:text-base transition duration-200 ${
                currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((c) => c - 1)}
            >
              Previous
            </button>
            <span className="text-gray-700 text-xs sm:text-sm md:text-base">Page {currentPage} of {totalPage}</span>
            <button
              className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-xs sm:text-sm md:text-base transition duration-200 ${
                postItem.length < limit ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={postItem.length < limit}
              onClick={() => setCurrentPage((c) => c + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;