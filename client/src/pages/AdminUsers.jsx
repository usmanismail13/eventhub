import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

const response = await axios.get(
  "http://localhost:5000/api/admin/users",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
console.log(response.data);

setUsers(response.data);

    setUsers(response.data);
  };

  fetchUsers();
}, []);

  return (
  <div>
    <h1>Admin Users</h1>

    {users.map((user) => (
      <div key={user._id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <hr />
      </div>
    ))}
  </div>
);
};

export default AdminUsers;