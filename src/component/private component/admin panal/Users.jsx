import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Provider';
import { Pen } from 'lucide-react';
import BreadCrumb from '../../BreadCrumb';
// Simulated API functions (commented out for testing with fake data)
// import { getUsers } from '../../../../utils/libs';

const Users = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [userId, setUserId] = useState("");
  const [renderUserPage, setRenderUserPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateRole, setUpdateRole] = useState("");
  const limit = 10;
  const totalPage = Math.ceil(users.length / limit);
  const lastIndex = limit * currentPage;
  const firstIndex = lastIndex - limit;
  const slice = users.slice(firstIndex, lastIndex);

  // Fake user data for testing
  const fakeUsers = [
    { id: 1, username: "JohnDoe", email: "john.doe@example.com", role: "admin" },
    { id: 2, username: "JaneSmith", email: "jane.smith@example.com", role: "editor" },
    { id: 3, username: "BobJohnson", email: "bob.johnson@example.com", role: "user" },
    { id: 4, username: "AliceBrown", email: "alice.brown@example.com", role: "user" },
    { id: 5, username: "MikeWilson", email: "mike.wilson@example.com", role: "editor" },
    { id: 6, username: "SarahDavis", email: "sarah.davis@example.com", role: "admin" },
    { id: 7, username: "TomClark", email: "tom.clark@example.com", role: "user" },
    { id: 8, username: "EmmaLewis", email: "emma.lewis@example.com", role: "editor" },
    { id: 9, username: "DavidWalker", email: "david.walker@example.com", role: "user" },
    { id: 10, username: "LauraHall", email: "laura.hall@example.com", role: "admin" },
    { id: 11, username: "ChrisYoung", email: "chris.young@example.com", role: "user" },
    { id: 12, username: "LisaAllen", email: "lisa.allen@example.com", role: "editor" },
  ];

  // Initialize fake data in Local Storage
  useEffect(() => {
    const storedUsers = localStorage.getItem("fakeUsers");
    if (!storedUsers) {
      localStorage.setItem("fakeUsers", JSON.stringify(fakeUsers));
      setUsers(fakeUsers);
    } else {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Update users from Local Storage when renderUserPage changes
  useEffect(() => {
    const storedUsers = localStorage.getItem("fakeUsers");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [renderUserPage]);

  // Commented out API fetch for testing
  /*
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      if (data && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [renderUserPage]);
  */

  const handleUpdate = (userId) => {
    setIsUpdated(true);
    setUserId(userId);
    const userArray = users.find(user => user.id === userId);
    if (userArray) {
      setUpdateRole(userArray.role);
    } else {
      console.error("User not found!");
    }
  };

  const updateUser = (event) => {
    event.preventDefault();
    try {
      // Update user role in Local Storage
      const storedUsers = JSON.parse(localStorage.getItem("fakeUsers")) || [];
      const updatedUsers = storedUsers.map(user =>
        user.id === parseInt(userId) ? { ...user, role: updateRole } : user
      );
      localStorage.setItem("fakeUsers", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      alert("User role updated successfully!");
      setRenderUserPage(prev => prev + 1);
      setIsUpdated(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  // Commented out API update for testing
  /*
  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const updateData = {
        name: updateRole
      };
      const postApi = await fetch(
        `http://ec2-3-76-10-130.eu-central-1.compute.amazonaws.com:4001/api/v1/users/role/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!postApi.ok) {
        const errorResponse = await postApi.json();
        console.error("API Error Response:", errorResponse);
        alert(`Post update failed: ${errorResponse.message || "Unknown error"}`);
        return;
      }

      alert("Updated Role User successfully!");
      setRenderUserPage(prev => prev + 1);
      setIsUpdated(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Something went wrong");
    }
  };
  */

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:ml-64 p-4 sm:p-6 md:p-8">
      <div className="max-w-full mx-auto">
         <BreadCrumb
                  links={[
                    { name: 'Dashboard', url: '/dashboard' },
                    { name: 'Users', url: '/dashboard/users' },
                  ]}
                />
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Users Dashboard</h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-800">
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">ID</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Username</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Email</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Role</th>
                <th className="p-3 sm:p-4 text-left font-semibold text-xs sm:text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.length ? (
                slice.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{user.id}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{user.username}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base">{user.email}</td>
                    <td className="p-3 sm:p-4 text-gray-700 text-xs sm:text-sm md:text-base capitalize">{user.role}</td>
                    <td className="p-3 sm:p-4">
                      <Pen size={24}
                        onClick={() => handleUpdate(user.id)}
                        // className="bg-indigo-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-600 transition duration-200 text-xs sm:text-sm md:text-base"
                      />
                    
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 sm:p-4 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Update Role Modal */}
        {isUpdated && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Update User Role</h2>
                <button
                  onClick={() => setIsUpdated(false)}
                  className="text-gray-600 hover:text-red-600 transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form className="flex flex-col gap-4" onSubmit={updateUser}>
                <select
                  value={updateRole}
                  onChange={(e) => setUpdateRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm sm:text-base"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
                >
                  Update Role
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Pagination */}
        {users.length > limit && (
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

export default Users;