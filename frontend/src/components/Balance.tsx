import RotateSpinIcon from "./RotateSpinIcon";

type BalanceProps = {
  value: number | null;
  refresh: boolean;
  onclick: () => void;
};

const Balance = ({ value, refresh, onclick }: BalanceProps) => {
  return (
    <div className="flex items-center">
      <div onClick={onclick} className={`${refresh ? "animate-spin" : "" } mr-2 w-5 h-5 cursor-pointer`}>
        <RotateSpinIcon />
      </div>
      <div className="font-bold text-lg dark:text-white">Your balance:</div>
      <div className="font-medium ml-4 text-lg dark:text-white">
        Rs {value?.toLocaleString()}
      </div>
    </div>
  );
};

export default Balance;
