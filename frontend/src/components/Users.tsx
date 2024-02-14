import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const getUsers = async (filter: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("JWT token is not found");
      }
      const response = await axios.get<{ data: User[] }>(
        "http://localhost:7001/api/v1/users?filter=" + filter,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      setUsers(data.data);
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error("No user found");
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An error occurred");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers(filter);
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-400"
        ></input>
      </div>
      <div>
        {users?.map((user) => (
          <User
            key={user._id}
            firstChar={user.firstname.charAt(0)}
            firstName={user.firstname}
            lastName={user.lastname}
          />
        ))}
      </div>
    </>
  );
};
export default Users;
