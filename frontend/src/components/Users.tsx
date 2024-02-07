import User from "./User";

export const Users = () => {
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-400"
        ></input>
      </div>
      <div>
        <User firstChar={"S"} firstName={"Sachin"} lastName={"Kumar"} />
      </div>
    </>
  );
};
export default Users;
