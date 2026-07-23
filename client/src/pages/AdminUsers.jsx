import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  console.log("AdminUsers updated version");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/admin/users?time=${Date.now()}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const banUser = async (id) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/users/${id}/ban`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUsers();
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Admin Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg shadow-md p-5"
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {user.isBanned ? "Banned" : "Active"}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => banUser(user._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Ban User
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;