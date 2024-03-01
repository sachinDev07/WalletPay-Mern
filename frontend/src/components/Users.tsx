import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import User from "./User";
import SearchBar from "./SearchBar";
import UserSkeleton from "./Skeleton/UserSkeleton";
import SearchBarSkeleton from "./Skeleton/SearchBarSkeleton";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTotalPages } from "../redux/paginationSlice";

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

  const page = useAppSelector((store) => store.pagination.page);
  const dispatch = useAppDispatch();

  const getUsers = async (filter: string) => {
    try {
      const userIdToExclude = localStorage.getItem("id");
      if (!userIdToExclude) {
        toast.error("User is not authorized!");
      }

      const response = await axios.get<{totalUsers: number; data: User[];}>(
        `http://localhost:7001/api/v1/users?userIdToExclude=${userIdToExclude}&limit=5&page=${page}&filter=` +
          filter,
        {
          withCredentials: true,
        },
      );
      const data = response.data;
      setUsers(data.data);
      const totalNoOfPages = Math.ceil(data.totalUsers / 5);
      dispatch(getTotalPages(totalNoOfPages));
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
    const timeOutId = setTimeout(() => getUsers(filter), 400);

    return () => clearTimeout(timeOutId);
  }, [filter, page]);

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
        {users.length > 0 &&
          users?.map((user) => (
            <User
              key={user._id}
              id={user._id}
              firstChar={user.firstname.charAt(0)}
              firstName={user.firstname}
              lastName={user.lastname}
            />
          ))}
      </div>

      {users.length > 0 && filter === "" && <Pagination />}
    </>
  );
};
export default Users;
