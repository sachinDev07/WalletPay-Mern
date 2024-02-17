import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileAtom } from "../atoms";
import { useEffect } from "react";

const Header = () => {
  const firstLetterOfUsername = useRecoilValue(profileAtom);
  const setFirstLetterOfUsername = useSetRecoilState(profileAtom);
  useEffect(() => {
    setFirstLetterOfUsername(
      localStorage.getItem("usernameFirstLetter") as string,
    );
  }, []);
  return (
    <header className="shadow h-14 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">WalletPay</div>
      <div className="flex justify-between items-center space-x-4">
        <div className="font-bold">Hello</div>
        <div className="rounded-full h-10 w-10 bg-slate-200 text-xl font-bold flex justify-center items-center cursor-pointer">
          {firstLetterOfUsername.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
