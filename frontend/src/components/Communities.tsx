import { useState } from "react";
const Communities = () => {
  const communities = ["Travel", "Food", "Culture"];
  const [showCommunities, setShowCommunities] = useState(false);

  return (
    <div className="w-full h-auto mt-[150px] mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
      <div className="flex justify-between font-semibold">
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Communities
        </div>

        {showCommunities ? (
          <button onClick={() => setShowCommunities((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setShowCommunities((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <>
        {showCommunities ? (
          <ul className="flex flex-col">
            <hr className="h-px mx-8 mt-4 mb-1 bg-gray-300 border-0" />
            {communities.map((item) => (
              <li
                key={item}
                className="block text-xl font-small leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 text-center align-baseline font-bold leading-none text-primary-700"
              >
                <a className="cursor-pointer text-gray-600 font-medium hover:text-blue-600">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Communities;
