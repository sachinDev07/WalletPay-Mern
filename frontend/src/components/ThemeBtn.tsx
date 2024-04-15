import { ChangeEvent } from "react";
import useTheme from "../context/ThemeContext";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

const ThemeBtn = () => {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const onChangeBtn = (e: ChangeEvent<HTMLInputElement>) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer mr-2">
      <input
        type="checkbox"
        value=""
        className="sr-only" 
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
      />
      <div className="p-[6px] text-black hover:bg-gray-300 dark:bg-white dark:text-black bg-gray-200 rounded-full transition duration-150 ease-in-out">
        {themeMode === "light" ? <FiSun /> : <FaMoon />}
      </div>
    </label>
  );
};

export default ThemeBtn;
