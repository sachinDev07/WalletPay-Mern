import { useEffect, useState } from "react";

import User from "./User";
import SearchBar from "./SearchBar";
import UserSkeleton from "./Skeleton/UserSkeleton";
import SearchBarSkeleton from "./Skeleton/SearchBarSkeleton";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTotalPages } from "../redux/paginationSlice";
import axiosInstance from "../api/axios";

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const page = useAppSelector((store) => store.pagination.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async (filter: string) => {
      try {
        const userIdToExclude = localStorage.getItem("id");
        if (!userIdToExclude) {
          return;
        }

        const response = await axiosInstance.get<{
          totalUsers: number;
          data: User[];
        }>(
          `/users?userIdToExclude=${userIdToExclude}&limit=5&page=${page}&filter=` +
            filter,
          { 
             headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
             },
             signal: controller.signal },
        );
        const data = response.data;
        isMounted && setUsers(data.data);
        const totalNoOfPages = Math.ceil(data.totalUsers / 5);
        dispatch(getTotalPages(totalNoOfPages));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timeOutId = setTimeout(() => getUsers(filter), 200);

    return () => {
      clearTimeout(timeOutId);
      isMounted = false;
      controller.abort();
    };
  }, [filter, page, dispatch]);

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
      <div className="font-bold mt-6 text-lg dark:text-white">Users</div>
      <SearchBar setFilter={setFilter} />
      <div className="mt-8">
        {users.length > 0 &&
          users?.map((user) => (
            <User
              key={user._id}
              id={user._id}
              firstChar={user?.firstname.charAt(0)}
              firstName={user?.firstname}
              lastName={user?.lastname}
            />
          ))}
      </div>

      {page > 0 && filter === "" && <Pagination />}
    </>
  );
};
export default Users;
