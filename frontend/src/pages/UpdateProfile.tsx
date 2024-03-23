import { Link } from "react-router-dom";

const UpdateProfile = () => {
  return (
    <section className="mt-4 p-4 flex flex-col justify-center items-center">
      <div className="w-full md:max-w-[500px]">
        <p className="text-center text-lg font-bold underline">
          Update Your Profile
        </p>
        <form action="" className="mt-8 px-2 w-full">
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              First Name
              <input
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              Last Name
              <input
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              Last Password
              <input
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="font-medium text-left py-2">
              New Password
              <input
                type="text"
                className="block w-full  px-2 py-1 border border-slate-200 rounded"
              />
            </label>
          </div>
          <div className="mt-12 text-center">
            <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Update Profile
            </button>
          </div>
          <div className="mt-2 flex items-center before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500 mx-2">
            <Link to="/">
              <button
                type="submit"
                className="mx-4 text-gray-600 hover:text-black active:text-gray-800"
              >
                Go To Homepage
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
