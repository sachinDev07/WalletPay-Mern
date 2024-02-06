const Balance = ({ value }: { value: number }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-medium ml-4 text-lg">
        Rs {value.toLocaleString()}
      </div>
    </div>
  );
};

export default Balance;
