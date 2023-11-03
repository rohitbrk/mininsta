import { useContext } from "react";
import { Store } from "../App";
const Posts = () => {
  const { posts, handleLike } = useContext(Store);

  return (
    <>
      {posts.map((item) => (
        <div
          key={item.id}
          className="max-w-md rounded overflow-hidden shadow-md hover:shadow-lg bg-gray-50 mb-2"
        >
          <div className="font-semibold text-xl ml-6 my-1 p-1.5 inline-block bg-gray-200 rounded-full text-gray-700">
            {item.name}
          </div>
          <div className="mt-2 flex justify-center">
            <img
              className="w-80 rounded"
              src={item.img}
              alt="Sunset in the mountains"
            />
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-start">
              <div className="items-center font-bold text-xl mb-2">
                {item.title}
              </div>
              <button
                onClick={() => handleLike(item.email, item.id)}
                className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
              >
                Like {item.likes.length}
              </button>
            </div>
            <p className="text-gray-700 text-base">{item.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default Posts;
