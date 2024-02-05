import { Link } from "react-router-dom";

type BottomWarningProps = {
  label: string;
  bottomText: string;
  to: string;
};

const BottomWarning = ({ label, bottomText, to }: BottomWarningProps) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div className="font-medium">{label}</div>
      <Link to={to} className="font-bold pointer underline pl-1 cursor-pointer">
        {bottomText}
      </Link>
    </div>
  );
};

export default BottomWarning;
