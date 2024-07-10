import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import useLoader from "../hooks/useLoader";
import Spinner from "../components/Spinner";
import { useToast } from "../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { signin } from "../redux/authSlice";
import { useEffect } from "react";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: FormData) => {
    startLoading();
    const resultAction = await dispatch(signin(data));
    if (signin.fulfilled.match(resultAction)) {
      clearError();
      showToast({ message: resultAction.payload.message, type: "SUCCESS" });
      navigate("/");
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
                  {...register("password", {
                    required: "This field is required",
                  })}
                  type="password"
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
  ) : null;
};

export default SignIn;
