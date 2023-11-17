import { useContext, useState } from "react";
import { AuthContext, Store } from "../App";
import { deleteReq } from "../utils/api";
import { svgs } from "../utils/svgs";

const Profile = () => {
  const { user, logout, getAccessTokenSilently } = useContext(AuthContext);
  const { setErr } = useContext(Store);

  const {
    setCreatingPost,
    creatingPost,
    setMyPostsFlag,
    myPostsFlag,
    fetchPosts,
    setFilterText,
    userId,
  } = useContext(Store);

  const handleLogout = () => {
    setCreatingPost(false);
    logout();
  };

  const handleDeleteAccount = async (userId) => {
    const token = await getAccessTokenSilently();
    const axiosResponse = await deleteReq(
      `/user?userId=${userId}`,
      token,
      setErr
    );
    if (axiosResponse.data.status === "ok") {
      logout();
      fetchPosts(1);
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const dropdownElements = [
    {
      name: creatingPost ? "Posts" : "Create",
      onClick: () => {
        setCreatingPost((prev) => !prev);
        setDropdown(false);
      },
    },
    {
      name: myPostsFlag ? "All Posts" : "My Posts",
      onClick: () => {
        setFilterText("");
        setMyPostsFlag((prev) => !prev);
        setDropdown(false);
      },
    },
    {
      name: "Logout",
      onClick: handleLogout,
    },
    {
      name: "Delete",
      onClick: () => handleDeleteAccount(userId),
    },
  ];

  return (
    <div className="mt-2 relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => setDropdown((prev) => !prev)}
        >
          <div className="flex font-semibold text-base">
            <img
              className="w-6 h-6 mt-1 mb-2 mr-1 rounded-full shadow-lg"
              src={user?.picture}
            />
            <p className="mt-1">{user?.given_name}</p>
          </div>

          {svgs.profileDropdown}
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
