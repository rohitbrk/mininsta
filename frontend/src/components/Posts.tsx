import { useContext } from "react";
import { Store } from "../App";
const Posts = () => {
  const { posts, getAccessTokenSilently, isAuthenticated } = useContext(Store);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const callApi = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
  };

  const callProtectedApi = async () => {
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(URL + "protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    console.log("likes + 1");
  };

  return (
    <div>
      {posts.map((item, index) => (
        <div key={index}>
          {item.posts.map((i) => (
            <div
              key={i.title}
              className="mb-2 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <img className="rounded-t-lg" src={i.img} alt={i.title} />
              </div>
              <div className="p-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {i.title}
                  </h5>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {i.desc}
                </p>
                <button
                  onClick={handleLike}
                  className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Like {i.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div>
        <button
          onClick={callApi}
          className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          callApi
        </button>
        <button
          onClick={callProtectedApi}
          className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          callProtectedApi
        </button>
      </div>
    </div>
  );
};
export default Posts;
