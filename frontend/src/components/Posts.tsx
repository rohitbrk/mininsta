import { useContext } from "react";
import { Store } from "../App";
const Posts = () => {
  const { posts, getAccessTokenSilently, user, setPosts } = useContext(Store);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleLike = async (postOwner, postId, email) => {
    if (!email) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    const token = await getAccessTokenSilently();

    const response = await fetch(URL + "post/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postOwner, postId, email }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      const newPosts = posts.map((item) => {
        for (const post of item.posts) {
          if (post.id === postId) {
            post.likes.push(email);
          }
        }
        return item;
      });
      setPosts(newPosts);
    }
  };

  return (
    <div>
      {posts.map((item, index) => (
        <div key={index}>
          {item.posts.map((i) => (
            <div
              key={i.id}
              className="mb-2 max-w-md bg-white border border-gray-200 rounded-lg shadow hover:shadow-md"
            >
              <div className="mt-2 flex justify-center">
                <img
                  className="rounded w-96"
                  src={i.img}
                  alt={i.title}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {i.title}-{i.name}
                  </h5>
                </div>
                <p className="mb-3 font-normal text-gray-700">{i.desc}</p>
                <button
                  onClick={() => handleLike(i.email, i.id, user.email)}
                  className="flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Like {i.likes.length}
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Posts;
