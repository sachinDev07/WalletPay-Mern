import { LabelProps } from "../types";

const Heading = ({ label }: LabelProps) => {
  return (
    <div className="text-black text-center text-4xl pt-6 font-bold">
      {label}
    </div>
  );
};

export default Heading;
