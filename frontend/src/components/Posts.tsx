import { useContext, useEffect, useState } from "react";
import { AuthContext, Store } from "../App";
import { PostsContext, PostsDispatchContext } from "../context/PostsContext";
import Pagination from "./Pagination";
import { post } from "../utils/api";
import Post from "./Post";

const Posts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { user, getAccessTokenSilently } = useContext(AuthContext);
  const posts = useContext(PostsContext);
  const postsDispatch = useContext(PostsDispatchContext);
  const { myPostsFlag, loading, filterText, setErr, userId } =
    useContext(Store);

  useEffect(() => {
    if (user) {
      setMyPosts(posts.filter((post) => post.userId === userId));
    }
  }, [myPostsFlag]);

  const handleLike = async (postOwnerId, postId, likesString) => {
    if (!user) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    if (likesString.includes("Liked")) {
      alert("You already liked this post");
      return;
    }
    const token = await getAccessTokenSilently();
    const axiosResponse = await post(
      "/post/like",
      token,
      {
        postOwnerId,
        postId,
        userId,
      },
      setErr
    );

    if (axiosResponse.data.status === "ok")
      postsDispatch({
        type: "LIKE_POST",
        payload: { postId, userId },
      });
  };

  const filterPosts = (posts, filterText) => {
    return posts?.filter(
      (post) =>
        post.userId.toLowerCase().includes(filterText.toLowerCase()) ||
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
            renderPosts?.map((item) => {
              const likesString = item.likes.includes(userId)
                ? `Liked`
                : `Like`;
              return (
                <Post
                  key={item.id}
                  id={item.id}
                  userId={item.userId}
                  picture={item.picture}
                  name={item.name}
                  date={item.date}
                  img={item.img}
                  title={item.title}
                  handleLike={handleLike}
                  likesString={`${likesString} ${item.likes.length}`}
                  desc={item.desc}
                />
              );
            })
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
