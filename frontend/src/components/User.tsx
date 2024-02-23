import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface UserDetails {
  id: string;
  firstChar: string;
  firstName: string;
  lastName: string;
}

const User = ({ id, firstChar, firstName, lastName }: UserDetails) => {
  const username = localStorage.getItem("username") as string;
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/send?id=" + id + "&name=" + firstName);
  };
  
  return (
    username !== firstName && (
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 md:h-12 md:w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-lg md:text-xl font-bold">
              {firstChar.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div>
              {firstName.charAt(0).toUpperCase() + firstName.substring(1)} {lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Button onclick={handleNavigation} label={"Send Money"} />
        </div>
      </div>
    )
  );
};

export default User;
