import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

import NotificationIcon from "./NotificationIcon";
import CharacterLogo from "./CharacterLogo";
import { UserProfileModalContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationProvider";
import useMediaQuery from "../hooks/useMediaQuery";
import SmallScreenProfileMenu from "./SmallScreenProfileMenu";
import { ShowProfileContext } from "../context/ShowProfileContext";
import ThemeBtn from "./ThemeBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";

interface UserDetailsType {
  firstname: string;
  lastname: string;
  email: string;
}

const Header = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const username = authState.data.firstname + " " + authState.data.lastname;
  const { userProfileToggle, setUserProfileToggle } = useContext(
    UserProfileModalContext,
  );
  const { setNotificationToggle } = useContext(NotificationContext);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const { showProfileMenu, setShowProfileMenu } =
    useContext(ShowProfileContext);
  const userDetailsString = localStorage.getItem("userDetails") as string;
  const userDetails: UserDetailsType = JSON.parse(userDetailsString);

  function handleSignOut() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <header className="shadow h-14 px-4 md:px-28 flex justify-between items-center dark:shadow-slate-400 border-b-2 border-slate-400">
        <div className="text-xl font-bold hover:scale-105 transition duration-150 ease-in-out dark:text-white">
          <Link to="/">WalletPay</Link>
        </div>
        <div className="flex justify-between items-center gap-2">
          <ThemeBtn />
          {authState.isLoggedIn && <NotificationIcon />}
          {authState.isLoggedIn && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUserProfileToggle((prev) => !prev);
                setNotificationToggle(false);
                setShowProfileMenu(true);
              }}
              className="rounded-full h-7 w-7 md:h-8 md:w-8 bg-gray-200 hover:bg-gray-300 text-lg md:text-xl font-bold flex justify-center items-center cursor-pointer active:bg-slate-300 dark:bg-white dark:hover:bg-slate-200 transition duration-150 ease-in-out"
            >
              {username && username.charAt(0).toUpperCase()}
            </button>
          )}
          {isAboveMediumScreens && userProfileToggle && (
            <div className="absolute top-14 right-24 border-2 border-slate-400 rounded-md w-64 bg-white shadow-lg dark:bg-slate-800">
              <div className="flex flex-col items-center p-2">
                <CharacterLogo
                  character={username && username.charAt(0).toUpperCase()}
                  width="w-16"
                  height="h-16"
                  bgColor="bg-slate-200"
                  textColor=""
                  textSize="text-lg md:text-2xl"
                />
                <p className="mt-[4px] text-center font-bold dark:text-white">
                  {username && username}
                </p>
                <p className="text-sm dark:text-white">
                  {authState.data.email}
                </p>
              </div>
              <div className="my-2 border-t-2 border-slate-300">
                <Link to="/update-profile">
                  <div className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 dark:text-white dark:hover:text-black cursor-pointer">
                    <FaUser />
                    <button className="w-full text-start space-x-2">
                      Update Profile
                    </button>
                  </div>
                </Link>
                <div className="mt-2 p-2 flex items-center space-x-2 hover:bg-slate-300 cursor-pointer dark:text-white dark:hover:text-black">
                  <FaSignOutAlt />
                  <button
                    className="w-full text-start "
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {!isAboveMediumScreens && (
        <SmallScreenProfileMenu
          username={username}
          email={userDetails?.email}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          onHandleLogout={handleSignOut}
        />
      )}
    </>
  );
};

export default Header;
