// @ts-nocheck
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
          <svg
            className="w-4 h-4 display-block m-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="display-block m-auto pl-2 text-center">Sign In</span>
        </button>
      )}
    </div>
  );
};
export default Nav;
