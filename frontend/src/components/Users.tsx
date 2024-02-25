import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import User from "./User";
import SearchBar from "./SearchBar";
import UserSkeleton from "./Skeleton/UserSkeleton";
import SearchBarSkeleton from "./Skeleton/SearchBarSkeleton";

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
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = async (filter: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User is not authorized!");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      getUsers(filter);
    }, 400);

    return () => clearTimeout(timeOutId);
  }, [filter]);

  if (loading) {
    return (
      <>
        <SearchBarSkeleton />
        {Array.from({ length: 5 }).map((_, index) => (
          <UserSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <SearchBar setFilter={setFilter} />
      <div>
        {users?.map((user) => (
          <User
            key={user._id}
            id={user._id}
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
