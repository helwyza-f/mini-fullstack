import { useEffect, useState } from "react";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mini-fullstack-ecru.vercel.app/user/users"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers(); // Panggil fungsi async
  }, []); // Dependency array kosong berarti akan berjalan sekali ketika komponen di-mount
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <h1>{user.fullname}</h1>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
