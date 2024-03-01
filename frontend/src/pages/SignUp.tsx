import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

interface UserDetails {
  data: FormData;
  message: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post<UserDetails>(
        "http://localhost:7001/api/v1/users/signup",
        data,
      );
      const responseData = response.data;
      toast.success(responseData.message);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label className="font-medium text-left py-2">
                First Name
                <input
                  type="text"
                  {...register("firstname", {
                    required: "This field is required",
                  })}
                  placeholder="First name"
                  className="block w-full  px-2 py-1 border border-slate-200 rounded"
                />
              </label>
            </div>
            {errors.firstname && (
              <span className="text-red-500">{errors.firstname.message}</span>
            )}
            <div className="mb-2">
              <label className="font-medium text-left py-2">
                Last Name
                <input
                  type="text"
                  {...register("lastname", {
                    required: "This field is required",
                  })}
                  placeholder="Last name"
                  className="block w-full  px-2 py-1 border border-slate-200 rounded"
                />
              </label>
            </div>
            {errors.lastname && (
              <span className="text-red-500">{errors.lastname.message}</span>
            )}
            <div className="mb-2">
              <label className="font-medium text-left py-2">
                Email Address
                <input
                  type="email"
                  {...register("email", { required: "This field is required" })}
                  placeholder="Enter your email address"
                  className="block w-full  px-2 py-1 border border-slate-200 rounded"
                />
              </label>
            </div>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <div className="mb-2">
              <label className="font-medium text-left py-2">
                Password
                <input
                  type="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                  placeholder="Enter your password"
                  className="block w-full  px-2 py-1 border border-slate-200 rounded"
                />
              </label>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <div className="pt-4 text-center">
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <BottomWarning
            label={"Already have an account?"}
            bottomText={"Sign in"}
            to={"/login"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
