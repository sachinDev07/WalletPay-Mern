import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Axios from "axios";

import Spinner from "../components/Spinner";
import useLoader from "../hooks/useLoader";
import { ValidationError } from "../types";
import { useToast } from "../context/ToastContext";
import axiosInstance from "../api/axios";

type UpdateProfileData = {
  firstname: string;
  lastname: string;
  oldPassword: string;
  newPassword: string;
};

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileData>();

  const {
    isLoading,
    startLoading,
    stopLoading,
    isError,
    setError,
    clearError,
  } = useLoader();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit = async (data: UpdateProfileData) => {
    clearError();
    try {
      startLoading();
      const response = await axiosInstance.put("/users/update", data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      clearError();
      showToast({ message: response.data.message, type: "SUCCESS" });
      navigate("/login");
    } catch (error) {
      if (Axios.isAxiosError<ValidationError>(error)) {
        if (error.response) {
          if (error.response.data.message) {
            setError(error.response.data.message);
          } else if (error.response.data.error[0].message) {
            setError(error.response.data.error[0].message);
          }
        }
      } else {
        setError("An error occurred");
      }
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <section className="mt-6 p-4 flex flex-col justify-center items-center">
      <div className="w-full md:max-w-[500px]">
        <p className="text-center text-lg font-bold underline dark:text-white">
          Update Your Profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 px-2 w-full">
          <div className="mb-1">
            <label className="font-medium text-left py-2 dark:text-white">
              First Name
              <input
                type="text"
                {...register("firstname", {
                  required: "This field is required",
                })}
                className="block w-full  px-2 py-1 border border-slate-200 rounded dark:text-black outline-none"
              />
            </label>
          </div>
          {errors.firstname && (
            <span className="text-red-500 text-sm">
              {errors.firstname.message}
            </span>
          )}
          <div className="mb-1 mt-3">
            <label className="font-medium text-left py-2 dark:text-white">
              Last Name
              <input
                type="text"
                {...register("lastname", {
                  required: "This field is required",
                })}
                className="block w-full  px-2 py-1 border border-slate-200 rounded dark:text-black  outline-none"
              />
            </label>
          </div>
          {errors.lastname && (
            <span className="text-red-500 text-sm">
              {errors.lastname.message}
            </span>
          )}
          <div className="mb-1 mt-3">
            <label className="font-medium text-left py-2 dark:text-white">
              Old Password
              <input
                type="text"
                {...register("oldPassword", {
                  required: "This field is required",
                })}
                className="block w-full  px-2 py-1 border border-slate-200 rounded dark:text-black outline-none"
              />
            </label>
          </div>
          {errors.oldPassword && (
            <span className="text-red-500 text-sm">
              {errors.oldPassword.message}
            </span>
          )}
          <div className="mb-1 mt-3">
            <label className="font-medium text-left py-2 dark:text-white">
              New Password
              <input
                type="text"
                {...register("newPassword", {
                  required: "This field is required",
                })}
                className="block w-full  px-2 py-1 border border-slate-200 rounded dark:text-black outline-none"
              />
            </label>
          </div>
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
          <div>
            {isError && (
              <p className="pt-2 text-red-400 text-center">{isError}</p>
            )}
          </div>
          <div className="mt-5 text-center">
            <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {isLoading ? <Spinner /> : "Update Profile"}
            </button>
          </div>
          <div className="mt-2 flex items-center before:border-t before:flex-1 before:border-gray-500 dark:before:border-white after:border-t after:flex-1 after:border-gray-500 dark:after:border-white mx-2">
            <Link to="/">
              <button
                type="submit"
                className="mx-4 text-gray-600 hover:text-black active:text-gray-800 dark:text-white dark:hover:text-slate-300"
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
