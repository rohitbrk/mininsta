// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import { useFetch } from "./hooks/useFetch";

import { useAuth0 } from "@auth0/auth0-react";
import { getDate } from "./utils/date";
import { PostsContext, PostsDispatchContext } from "./context/PostsContext";

const Store = createContext({});
const AuthContext = createContext({});

function App() {
  const posts = useContext(PostsContext);
  const dispatch = useContext(PostsDispatchContext);

  const [creatingPost, setCreatingPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState(false);

  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const fetchPosts = async () => {
    setLoading(true);
    const posts = await useFetch(import.meta.env.VITE_BACKEND_URL + "post", {});
    dispatch({ type: "SET_POSTS", payload: posts });
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleSigninApi = async () => {
      const data = await useFetch(import.meta.env.VITE_BACKEND_URL + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: user.name,
          picture: user.picture,
        },
      });
    };
    handleSigninApi();
  }, [isAuthenticated]);

  const handleCreatePost = async (title, desc, date, file) => {
    setLoading(true);
    const token = await getAccessTokenSilently();

    const data = await useFetch(import.meta.env.VITE_BACKEND_URL + "post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: {
        post: {
          name: user.name,
          title,
          desc,
          date,
          img: file,
          likes: [],
          picture: user.picture,
        },
      },
    });
    if (data.status === "ok") {
      fetchPosts();
    }
  };

  const createPost = (title, desc, file) => {
    const date = getDate();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      handleCreatePost(title, desc, date, reader.result);
    };
    setCreatingPost(false);
  };

  const handleDeleteAccount = async (name) => {
    setCreatingPost(false);
    const token = await getAccessTokenSilently();

    const data = await useFetch(
      `${import.meta.env.VITE_BACKEND_URL}user?name=${name}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.status === "ok") {
      logout();
      fetchPosts();
    }
  };

  const handleLike = async (postOwner, postId) => {
    if (!user) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    const token = await getAccessTokenSilently();

    const data = await useFetch(
      import.meta.env.VITE_BACKEND_URL + "post/like",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: { postOwner, postId, name: user.name },
      }
    );

    if (data.status === "ok")
      dispatch({ type: "LIKE_POST", payload: { postId, name: user.name } });
  };

  const handleSignIn = async () => {
    const response_data = await loginWithPopup();
  };

  const handleLogout = () => {
    setCreatingPost(false);
    logout();
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Store.Provider
          value={{
            creatingPost,
            setCreatingPost,
            createPost,
            handleDeleteAccount,
            handleLike,
            loading,
            handleSignIn,
            handleLogout,
            myPosts,
            setMyPosts,
          }}
        >
          <AuthContext.Provider
            value={{
              user,
              isAuthenticated,
            }}
          >
            <Nav />
            <Main />
            <Footer />
          </AuthContext.Provider>
        </Store.Provider>
      </div>
    </div>
  );
}

export { Store, AuthContext };
export default App;
