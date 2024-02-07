import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignUp = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox lable={"first Name"} placeholder={"John"} />
          <InputBox lable={"last Name"} placeholder={"Doe"} />
          <InputBox lable={"Email"} placeholder={"example@gmail.com"} />
          <InputBox lable={"Password"} placeholder={"1x2y3z@password"} />
          <div className="pt-4 text-center">
            <Button label={"Sign up"} />
          </div>
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
