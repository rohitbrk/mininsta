const Error = () => {
  return (
    <div className="mt-6 flex justify-center font-semibold text-xl mx-16 my-1 p-1.5 inline-block bg-gray-200 rounded-full text-gray-700">
      <p className="text-gray-500 dark:text-gray-400">
        Error. Go To
        <a
          href="#"
          className="ml-1 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Home
          <svg
            className="w-4 h-4 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </p>
    </div>
  );
};

export default Error;
