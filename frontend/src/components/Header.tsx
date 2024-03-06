import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileAtom } from "../atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLogout from "../hooks/useLogout";
import NotificationIcon from "./NotificationIcon";

const Header = () => {
  const username = useRecoilValue(profileAtom);
  const setUsername = useSetRecoilState(profileAtom);
  const navigate = useNavigate();
  const logout = useLogout();

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
          onClick={signOut}
          className="rounded-full h-8 w-8 md:h-10 md:w-10 bg-slate-200 text-xl font-bold flex justify-center items-center cursor-pointer"
        >
          {username.charAt(0).toUpperCase()}
        </button>
      </div>
    </header>
  );
};

export default Header;
