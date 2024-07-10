import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import CharacterLogo from "./CharacterLogo";
import { FaSignOutAlt } from "react-icons/fa";

interface SmallScreenProfileMenuProps {
  username: string;
  email: string;
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleLogout: () => void;
}

const SmallScreenProfileMenu = ({
  username,
  email,
  showProfileMenu,
  setShowProfileMenu,
  onHandleLogout,
}: SmallScreenProfileMenuProps) => {
  return (
    <section
      className={`fixed top-0 right-0 z-10 ${
        showProfileMenu
          ? "translate-x-0 transition duration-300 ease-in-out"
          : "translate-x-[100%] transition duration-300 ease-in-out"
      } bg-white w-screen h-screen p-4 overflow-hidden dark:bg-black`}
    >
      <FaArrowLeftLong
        onClick={() => setShowProfileMenu(false)}
        className="text-xl cursor-pointer dark:text-white"
      />
      <div className="">
        <div className="flex flex-col items-center p-2">
          <CharacterLogo
            character={username?.charAt(0).toUpperCase()}
            width="w-16"
            height="h-16"
            bgColor="bg-slate-200 dark:bg-white"
            textColor=""
            textSize="text-3xl md:text-2xl"
          />
          <p className="mt-[8px] text-center font-bold dark:text-white">
            {username}
          </p>
          <p className="text-sm dark:text-white">{email}</p>
        </div>
        <div className="my-2 border-t-2 border-slate-300">
          <Link to="/update-profile" onClick={() => setShowProfileMenu(false)}>
            <div className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer rounded-md dark:text-white dark:hover:text-black dark:hover:bg-slate-300">
              <FaUser />
              <button className="w-full text-start font-medium space-x-2">
                Update Profile
              </button>
            </div>
          </Link>
          <div
            onClick={onHandleLogout}
            className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer rounded-md dark:text-white dark:hover:text-black dark:hover:bg-slate-300"
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
