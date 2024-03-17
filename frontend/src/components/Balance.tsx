import refreshIcon from "../assets/img/refreshIcon.png";

type BalanceProps = {
  value: number | null;
  refresh: boolean;
  onclick: () => void;
};

const Balance = ({ value, refresh, onclick }: BalanceProps) => {
  return (
    <div className="flex items-center">
      <img
        src={refreshIcon}
        alt="icon for refreshing user balance"
        title="Refresh"
        onClick={onclick}
        className={`${
          refresh ? "animate-spin" : ""
        } mr-2 w-5 h-5 cursor-pointer`}
      />
      <div className="font-bold text-lg">Your balance:</div>
      <div className="font-medium ml-4 text-lg">
        Rs {value?.toLocaleString()}
      </div>
    </div>
  );
};

export default Balance;
