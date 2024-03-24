import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import useLoader from "../hooks/useLoader";

const UpdateProfile = () => {
  const firstname = useRef<HTMLInputElement | null>(null);
  const lastname = useRef<HTMLInputElement | null>(null);
  const oldPassword = useRef<HTMLInputElement | null>(null);
  const newPassword = useRef<HTMLInputElement | null>(null);

  const { isLoading, startLoading, stopLoading, isError, setError, clearError } = useLoader();

  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      startLoading()
      await axios.put("/users/update", {
        firstname: firstname.current?.value,
        lastname: lastname.current?.value,
        oldPassword: oldPassword.current?.value,
        newPassword: newPassword.current?.value,
      });
      clearError();
      navigate("/login");
    } catch (error: any) {
      setError(error?.response?.data?.message);
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <section className="mt-4 p-4 flex flex-col justify-center items-center">
      <div className="w-full md:max-w-[500px]">
        <p className="text-center text-lg font-bold underline">
          Update Your Profile
        </p>
        <form onSubmit={handleOnSubmit} className="mt-8 px-2 w-full">
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              First Name
              <input
                ref={firstname}
                required
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              Last Name
              <input
                ref={lastname}
                required
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              Last Password
              <input
                ref={oldPassword}
                required
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              New Password
              <input
                ref={newPassword}
                required
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div>{isError && <p className="pt-2 text-red-400">{isError}</p>}</div>
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              { isLoading ? <Spinner /> : "Update Profile" }
            </button>
          </div>
          <div className="mt-2 flex items-center before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500 mx-2">
            <Link to="/">
              <button
                type="submit"
                className="mx-4 text-gray-600 hover:text-black active:text-gray-800"
              >
                Go To Homepage
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
