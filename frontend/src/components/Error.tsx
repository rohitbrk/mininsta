import { svgs } from "../utils/svgs";

const Error = () => {
  return (
    <div className="mt-6 flex justify-center font-semibold text-xl mx-16 my-1 p-1.5 inline-block bg-gray-200 rounded-full text-gray-700">
      <p className="text-gray-500 dark:text-gray-400">
        Error. Go To
        <a
          href="/"
          className="ml-1 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Home
          {svgs.rightArrow}
        </a>
      </p>
    </div>
  );
};

export default Error;
