import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";
import {
  SignInRequesPayload,
  SignInResponse,
  SignUpRequestPayload,
  SignUpResponse,
  ValidationError,
} from "../types";
import axios from "axios";

export type AuthState = {
  token: string;
  user: {
    id: string;
    role: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  user: {
    id: localStorage.getItem("id") || "",
    role: localStorage.getItem("role") || "",
    firstname: localStorage.getItem("firstname") || "",
    lastname: localStorage.getItem("lastname") || "",
    email: localStorage.getItem("email") || "",
  },
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

export const signup = createAsyncThunk<
  SignUpResponse,
  SignUpRequestPayload,
  { rejectValue: string }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<SignUpResponse>(
      "/users/signup",
      data,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)) {
      if (error.response) {
        if (error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else if (error.response.data.error[0].message) {
          return rejectWithValue(error.response.data.error[0].message);
        }
      }
    } else {
      return rejectWithValue("An error occurred");
    }
    console.error(error);
  }
  return rejectWithValue("Can't Signup, Something went wrong");
});

export const signin = createAsyncThunk<
  SignInResponse,
  SignInRequesPayload,
  { rejectValue: string }
>("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<SignInResponse>(
      "/users/signin",
      data,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError>(error)) {
      if (error.response) {
        if (error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else if (error.response.data.error[0].message) {
          return rejectWithValue(error.response.data.error[0].message);
        }
      }
    } else {
      return rejectWithValue("An error occurred");
    }
    console.error(error);
  }
  return rejectWithValue("Can't Signin, Something went wrong");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
