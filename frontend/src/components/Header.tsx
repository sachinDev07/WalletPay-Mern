import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileAtom } from "../atoms";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

import useLogout from "../hooks/useLogout";
import NotificationIcon from "./NotificationIcon";
import CharacterLogo from "./CharacterLogo";
import { UserProfileModalContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationProvider";

const Header = () => {
  const username = useRecoilValue(profileAtom);
  const setUsername = useSetRecoilState(profileAtom);
  const navigate = useNavigate();
  const logout = useLogout();
  const { userProfileToggle, setUserProfileToggle } = useContext(UserProfileModalContext);
  const { setNotificationToggle } = useContext(NotificationContext);
  const userFullName = localStorage.getItem("fullname") as string;

  const signOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Err: ", error);
    }
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") as string);
  }, [setUsername]);
  return (
    <header className="shadow h-14 px-4 md:px-28 flex justify-between items-center">
      <div className="text-xl font-bold hover:scale-105 transition duration-150 ease-in-out">
        WalletPay
      </div>
      <div className="flex justify-between items-center space-x-4">
        <NotificationIcon />
        <button
          onClick={(e) =>{ 
            e.stopPropagation();
            setUserProfileToggle(prev => !prev)
            setNotificationToggle(false);
          }}
          className="rounded-full h-8 w-8 md:h-10 md:w-10 bg-slate-200 text-xl font-bold flex justify-center items-center cursor-pointer active:bg-slate-300"
        >
          {username.charAt(0).toUpperCase()}
        </button>
        {userProfileToggle && (
          <div className="absolute top-14 right-24 border-2 border-slate-400 rounded-md w-64 bg-white shadow-lg">
            <div className="flex flex-col items-center p-2">
              <CharacterLogo
                character={username.charAt(0).toUpperCase()}
                width="w-16"
                height="h-16"
                bgColor="bg-slate-200"
                textColor=""
                textSize="text-lg md:text-2xl"
              />
              <div className="mt-[4px] text-center font-bold">
                {userFullName}
              </div>
            </div>
            <div className="my-2 border-t-2 border-slate-300">
              <div className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer">
                <FaUser />
                <button className="w-full text-start space-x-2">
                  Update Profile
                </button>
              </div>
              <div onClick={signOut} className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer">
                <FaSignOutAlt />
                <button  className="w-full text-start ">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
