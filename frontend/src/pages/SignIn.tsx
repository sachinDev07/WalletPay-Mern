import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useLoader from "../hooks/useLoader";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../api/axios";
import { ValidationError } from "../types";
import { useToast } from "../context/ToastContext";

type FormData = {
  email: string;
  password: string;
};

interface UserDetails {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  message: string;
  accessToken: string;
}

const SignIn = () => {
  const { isLoading, startLoading, stopLoading, isError, setError, clearError } = useLoader();
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      startLoading();
      const response = await axios.post<UserDetails>(
        `${BASE_URL}/users/signin`,
        data,
        options,
      );

      const { id, firstname, lastname, email, role, accessToken, message } =
        response.data;

      setAuth({ id, firstname, lastname, role, accessToken, message });
      localStorage.setItem("id", id);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
        }),
      );
      clearError();
      showToast({ message: message, type: "SUCCESS"})
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError<ValidationError>(error)) {
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist.toString());
  }, [persist]);

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
            <div className="ml-[1px] space-x-1 flex items-center">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
                className="mt-1"
              />
              <div>
                <label htmlFor="persist">Trust this device ?</label>
              </div>
            </div>
            {isError && (
              <p className="w-full mt-4 text-red-400 text-center">{isError}</p>
            )}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2"
              >
                {isLoading ? <Spinner /> : "Sign In"}
              </button>
            </div>
          </form>
          <BottomWarning
            label={"Don't have an account?"}
            bottomText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
