import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface UserDetails {
  id: string;
  firstChar: string;
  firstName: string;
  lastName: string;
}

const User = ({ id, firstChar, firstName, lastName }: UserDetails) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/send?id=" + id + "&name=" + firstName);
  };
  return (
    <div className="flex justify-between mt-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl font-bold">
            {firstChar}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {firstName} {lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button onclick={handleNavigation} label={"Send Money"} />
      </div>
    </div>
  );
};

export default User;
