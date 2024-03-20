import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import CharacterLogo from "./CharacterLogo";
import { FaSignOutAlt } from "react-icons/fa";

interface SmallScreenProfileMenuProps {
  username: string;
  email: string;
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onclick: () => void;
}

const SmallScreenProfileMenu = ({
  username,
  email,
  showProfileMenu,
  setShowProfileMenu,
  onclick,
}: SmallScreenProfileMenuProps) => {
  return (
    <section
      className={`absolute top-0 z-10 ${
        showProfileMenu
          ? "translate-x-full transition duration-300 ease-in-out"
          : "translate-x-0 transition duration-300 ease-in-out"
      } bg-white w-full h-full p-4`}
    >
      <FaArrowLeftLong
        onClick={() => setShowProfileMenu(true)}
        className="text-xl cursor-pointer"
      />
      <div className="">
        <div className="flex flex-col items-center p-2">
          <CharacterLogo
            character={username.charAt(0).toUpperCase()}
            width="w-16"
            height="h-16"
            bgColor="bg-slate-200"
            textColor=""
            textSize="text-3xl md:text-2xl"
          />
          <p className="mt-[8px] text-center font-bold">{username}</p>
          <p className="text-sm">{email}</p>
        </div>
        <div className="my-2 border-t-2 border-slate-300">
          <div className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer rounded-md">
            <FaUser />
            <button className="w-full text-start font-medium space-x-2">
              Update Profile
            </button>
          </div>
          <div
            onClick={onclick}
            className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer rounded-md"
          >
            <FaSignOutAlt />
            <button className="w-full text-start font-medium">Sign Out</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallScreenProfileMenu;
