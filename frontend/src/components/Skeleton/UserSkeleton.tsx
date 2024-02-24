const UserSkeleton = () => {
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-8 w-8 md:h-12 md:w-12 bg-slate-200 flex justify-center mt-1 mr-2"></div>

        <div className="flex flex-col rounded-sm justify-center h-6 w-20 bg-slate-200">
          <div></div>
        </div>
      </div>

      <div className="flex flex-col rounded-md justify-center h-8 w-28 bg-slate-200"></div>
    </div>
  );
};

export default UserSkeleton;
