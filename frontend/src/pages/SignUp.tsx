import { ChangeEvent, FormEvent, useState } from "react";

import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signupApi() {
    try {
      const response = await axios.post<UserDetails>(
        "https://localhost:7001/api/v1/users/signup",
        { firstname, lastname, email, password },
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signupApi();
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <form onSubmit={handleSubmit} action="">
            <InputBox
              onchange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstname(e.target.value)
              }
              lable={"first Name"}
              placeholder={"John"}
            />
            <InputBox
              onchange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastname(e.target.value)
              }
              lable={"last Name"}
              placeholder={"Doe"}
            />
            <InputBox
              onchange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              lable={"Email"}
              placeholder={"example@gmail.com"}
            />
            <InputBox
              onchange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              lable={"Password"}
              placeholder={"1x2y3z@password"}
            />
            <div className="pt-4 text-center">
              <Button label={"Sign up"} />
            </div>
          </form>

          <BottomWarning
            label={"Already have an account?"}
            bottomText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
