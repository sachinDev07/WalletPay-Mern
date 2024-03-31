import { useNavigate } from "react-router-dom";
import Button from "./Button";
import CharacterLogo from "./CharacterLogo";

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
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <CharacterLogo
          character={firstChar?.toUpperCase()}
          width="w-10 md:w-12 mr-2"
          height="h-10 md:h-12"
          bgColor="bg-slate-200 dark:bg-white"
          textColor=""
          textSize="text-lg md:text-xl"
        />
        <div className="flex flex-col justify-center h-full dark:text-white">
          <div>
            {firstName?.charAt(0).toUpperCase() + firstName?.substring(1)}{" "}
            {lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Button onclick={handleNavigation} label={"Send Money"} />
      </div>
    </div>
  );
};

export default User;
