import { useContext, useState } from "react";
import { PostsDispatchContext } from "../context/PostsContext";
const PopularUsers = ({ popularUsers }) => {
  const postsDispatch = useContext(PostsDispatchContext);
  const [popularUsersButton, setPopularUsersButton] = useState(false);

  return (
    <div className="w-full h-auto mt-4 mx-4 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300">
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          Popular Users
        </div>
        {popularUsersButton ? (
          <button onClick={() => setPopularUsersButton((prev) => !prev)}>
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
          <button onClick={() => setPopularUsersButton((prev) => !prev)}>
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
        {popularUsersButton ? (
          <ul className="flex flex-col mt-4">
            <div className="flex justify-center">
              <hr className="w-72 h-px mb-2 bg-gray-200 border-0 " />
            </div>

            {popularUsers?.map((item) => (
              <li
                key={item}
                className="flex justify-center mb-1 block text-lg font-medium leading-tight inline-block whitespace-nowrap rounded-1 bg-primary-100 align-baseline font-bold leading-none text-gray-700"
              >
                <>{item}</>
                <button
                  onClick={() => {
                    postsDispatch({
                      type: "CUSTOM_POSTS",
                      payload: { name: item },
                    });
                  }}
                  className="ml-4 flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-1 text-center ml-2 mb-2"
                >
                  view
                </button>
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

export default PopularUsers;
