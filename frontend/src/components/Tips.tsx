const Tips = ({ tips }) => {
  return (
    <div className="w-full mt-[150px] mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        Tips
      </div>
      <>
        <ul className="flex flex-col">
          <hr className="h-px mx-8 mt-4 mb-2 bg-gray-300 border-0" />
          {tips?.map((item) => (
            <li
              key={item}
              className="block text-lg font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default Tips;
