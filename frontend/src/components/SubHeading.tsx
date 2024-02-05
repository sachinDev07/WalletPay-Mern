import { LabelProps } from "../types";

const SubHeading = ({ label }: LabelProps) => {
  return (
    <div className="text-slate-400 text-center text-md pt-1 px-2 pb-4">
      {label}
    </div>
  );
};

export default SubHeading;
