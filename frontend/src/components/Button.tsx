interface ButtonProps {
  onclick: () => void;
  label: string;
}

const Button = ({ onclick, label }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      type="button"
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm py-2 px-2 md:px-5 md:py-2.5 me-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      {label}
    </button>
  );
};

export default Button;
