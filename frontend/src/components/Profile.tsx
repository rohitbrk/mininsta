// @ts-nocheck
import { useContext, useState } from "react";
import { AuthContext, Store } from "../App";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const {
    setCreatingPost,
    creatingPost,
    handleDeleteAccount,
    handleLogout,
    setMyPosts,
    myPosts,
  } = useContext(Store);

  const [dropdown, setDropdown] = useState(false);
  const dropdownElements = [
    {
      name: creatingPost ? "Posts" : "Create",
      onClick: () => {
        setCreatingPost(true);
        setDropdown(false);
      },
    },
    {
      name: myPosts ? "All Posts" : "My Posts",
      onClick: () => {
        setMyPosts((prev) => !prev);
        setDropdown(false);
      },
    },
    {
      name: "Logout",
      onClick: handleLogout,
    },
    {
      name: "Delete",
      onClick: () => handleDeleteAccount(user.name),
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => setDropdown((prev) => !prev)}
        >
          <div className="flex font-semibold text-base">
            <img
              className="w-6 h-6 mt-1 mb-2 mr-1 rounded-full shadow-lg"
              src={user.picture}
            />
            <p className="mt-1">{user.given_name}</p>
          </div>

          <svg
            className="h-5 w-5 text-gray-400 display-block mt-2"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {dropdown ? (
        <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col items-center py-1">
            {dropdownElements.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                className="w-32 block flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Profile;
