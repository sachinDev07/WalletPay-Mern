import React from "react";

const SearchBar = ({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="my-2">
      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="w-full px-2 py-1 border rounded dark:text-black border-slate-400 outline-none"
      ></input>
    </div>
  );
};

export default SearchBar;
