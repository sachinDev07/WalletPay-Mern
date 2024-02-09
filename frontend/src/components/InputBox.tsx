import { ChangeEvent } from "react";

interface InputBoxProps {
  lable: string;
  placeholder?: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ lable, placeholder, onchange }: InputBoxProps) => {
  return (
    <div className="mb-2">
      <label className="font-medium text-left py-2">
        {lable}
        <input
          onChange={onchange}
          placeholder={placeholder}
          className="block w-full  px-2 py-1 border border-slate-200 rounded"
        />
      </label>
    </div>
  );
};

export default InputBox;
