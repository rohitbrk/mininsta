// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { AuthContext, Store } from "../App";
import { PostsContext, PostsDispatchContext } from "../context/PostsContext";
import Pagination from "./Pagination";
import { get, post } from "../utils/api";

const Posts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { isAuthenticated, user, getAccessTokenSilently } =
    useContext(AuthContext);
  const posts = useContext(PostsContext);
  const postsDispatch = useContext(PostsDispatchContext);
  const {
    myPostsFlag,
    setMyPostsFlag,
    loading,
    setLoading,
    filterText,
    setErr,
  } = useContext(Store);

  const handleLike = async (postOwner, postId) => {
    if (!user) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    const token = await getAccessTokenSilently();
    const axiosResponse = await post(
      "/post/like",
      token,
      {
        postOwner,
        postId,
        name: user.name,
      },
      setErr
    );

    if (axiosResponse.data.status === "ok")
      postsDispatch({
        type: "LIKE_POST",
        payload: { postId, name: user.name },
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const myPosts_ = async () => {
        setLoading(true);
        const axiosResponse = await get(`/post/${user.name}`, setErr);
        setMyPosts(axiosResponse.data.posts);
        setLoading(false);
      };

      myPosts_();
    }
  }, [isAuthenticated]);

  const filterPosts = (posts, filterText) => {
    return posts?.filter(
      (post) =>
        post.name.toLowerCase().includes(filterText.toLowerCase()) ||
        post.title.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const renderPosts = myPostsFlag
    ? filterPosts(myPosts, filterText)
    : filterPosts(posts, filterText);

  return (
    <>
      {loading ? (
        <div className="flex justify-center font-semibold text-xl mx-16 my-1 p-1.5 inline-block bg-gray-200 rounded-full text-gray-700">
          Loading ..
        </div>
      ) : (
        <>
          {renderPosts.length ? (
            renderPosts?.map((item) => (
              <div
                key={item.id}
                className="mx-14 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300"
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
                  <img
                    className="w-80 rounded"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="px-6 flex justify-between">
                    <div className="items-center font-bold text-xl mb-2">
                      {item.title}
                    </div>
                    <button
                      onClick={() => handleLike(item.name, item.id)}
                      className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
                    >
                      Like {item.likes.length}
                    </button>
                  </div>
                  <p className="px-6 text-gray-700 text-base">{item.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center mx-14 border rounded bg-white p-2 mb-2 hover:shadow-lg duration-300 font-semibold text-xl my-1 p-1.5 inline-block rounded-full text-gray-700">
              No posts
            </div>
          )}
          <Pagination />
        </>
      )}
    </>
  );
};
export default Posts;
