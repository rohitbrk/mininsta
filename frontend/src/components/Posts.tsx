import { useContext } from "react";
import { Store } from "../App";
const Posts = () => {
  const { user, myPosts, posts, handleLike, loading } = useContext(Store);
  const renderPosts = myPosts
    ? posts.filter((post) => post.email === user.email)
    : posts;

  return (
    <>
      {loading ? (
        <div className="flex justify-center font-semibold text-xl ml-6 my-1 p-1.5 inline-block bg-gray-200 rounded-full text-gray-700">
          Loading ..
        </div>
      ) : (
        <>
          {renderPosts.map((item) => (
            <div
              key={item.id}
              className="border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300"
            >
              <div className="flex justify-between flex font-semibold text-xl ml-6 my-1 p-1.5 mb-1 inline-block rounded-full text-gray-700">
                <div className="flex">
                  <div>
                    <img
                      className="w-8 h-8 mr-1 rounded-full shadow-lg"
                      src={item.picture}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-lg flex justify-center items-center">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className="flex justify-center">
                <img className="w-80 rounded" src={item.img} alt={item.title} />
              </div>
              <div className="px-6 py-4">
                <div className="px-6 flex justify-between">
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
                <p className="px-6 text-gray-700 text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default Posts;
