// @ts-nocheck
import { svgs } from "../utils/svgs";
import Profile from "./Profile";

const Nav = ({ isAuthenticated, loginWithPopup, setFilterText }) => {
  const handleSignIn = async () => {
    const response_data = await loginWithPopup();
  };

  return (
    <div className="flex justify-between mb-6 px-4 border rounded bg-white hover:shadow-lg duration-300">
      <a href="/">
        <img src="/mininsta-logo.png" className="my-1 h-16 rounded-2xl" />
      </a>
      <input
        onChange={(e) => setFilterText(e.target.value)}
        className="sm:ml-0 md:ml-[-120px] mr-2 shadow w-100 border rounded-md my-4 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        placeholder="search posts, users or communities"
      />

      {isAuthenticated ? (
        <Profile />
      ) : (
        <button
          onClick={handleSignIn}
          type="button"
          className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
        >
          {svgs.gSignIn}
          <span className="display-block m-auto pl-2 text-center">Sign In</span>
        </button>
      )}
    </div>
  );
};
export default Nav;
