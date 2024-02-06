const Navbar = () => {
  return (
    <header className="shadow h-14 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">Payment App</div>
      <div className="flex justify-between items-center space-x-4">
        <div className="font-bold">Hello</div>
        <div className="rounded-full h-10 w-10 bg-slate-200 text-xl font-bold flex justify-center items-center">
          S
        </div>
      </div>
    </header>
  );
};

export default Navbar;
