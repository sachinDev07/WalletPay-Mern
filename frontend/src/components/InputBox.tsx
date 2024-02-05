const InputBox = ({
  lable,
  placeholder,
}: {
  lable: string;
  placeholder?: string;
}) => {
  return (
    <div className="mb-2">
      <label className="font-medium text-left py-2">
        {lable}
        <input
          placeholder={placeholder}
          className="block w-full  px-2 py-1 border border-slate-200 rounded"
        />
      </label>
    </div>
  );
};

export default InputBox;
