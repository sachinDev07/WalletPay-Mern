import Button from "./Button";

const User = ({
  firstChar,
  firstName,
  lastName,
}: {
  firstChar: string;
  firstName: string;
  lastName: string;
}) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstChar}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {firstName} {lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
};

export default User;
