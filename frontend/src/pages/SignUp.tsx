import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";
import useLoader from "../hooks/useLoader";
import Spinner from "../components/Spinner";
import { FormData } from "../types";
import { useToast } from "../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { signup } from "../redux/authSlice";
import { useEffect } from "react";

const SignUp = () => {
  const {
    isLoading,
    startLoading,
    stopLoading,
    isError,
    setError,
    clearError,
  } = useLoader();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { showToast } = useToast();

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: FormData) => {
    startLoading();
    const resultAction = await dispatch(signup(data));
    if (signup.fulfilled.match(resultAction)) {
      clearError();
      showToast({ message: resultAction.payload.message, type: "SUCCESS" });
      navigate("/login");
    } else {
      if (resultAction.payload) {
        setError(resultAction.payload);
        stopLoading();
      }
    }
  };

  const handleFocus = () => {
    clearError();
  };

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/");
    }
  }, [authState.isLoggedIn, navigate]);

  return !authState.isLoggedIn ? (
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
                  onFocus={handleFocus}
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
                  onFocus={handleFocus}
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
                  onFocus={handleFocus}
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
                  onFocus={handleFocus}
                />
              </label>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            {isError && (
              <p className="w-full mt-4 text-red-400 text-center">{isError}</p>
            )}
            <div className="pt-4 text-center">
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  {isLoading ? <Spinner /> : "Sign Up"}
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
  ) : null;
};

export default SignUp;
