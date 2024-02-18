import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";

type FormData = {
  email: string;
  password: string;
};

interface UserDetails {
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post<UserDetails>(
        "http://localhost:7001/api/v1/users/signin",
        data,
      );
      const responseData = response.data;
      const token = responseData.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", responseData.firstname);
      toast.success(responseData.message);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError<ValidationError>(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          console.error(error);
          toast.error("An error occurred");
        }
      } else {
        console.error(error);
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label className="font-medium text-left py-2">
                Email
                <input
                  {...register("email", {
                    required: "This field is required",
                  })}
                  type="email"
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
                  {...register("password", {
                    required: "This field is required",
                  })}
                  type="password"
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
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <BottomWarning
            label={"Don't have an account?"}
            bottomText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
