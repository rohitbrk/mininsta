import { createContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";
import { getAllPosts } from "./utils/post";

import { useAuth0 } from "@auth0/auth0-react";

const Store = createContext({});

function App() {
  const [posts, setPosts] = useState([]);
  const [creatingPost, setCreatingPost] = useState(false);
  const [isAuthenticatedCustom, setIsAuthenticatedCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    setLoading(true);
    getAllPosts(setPosts, setLoading);

    const verifyLoggedIn = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token) setIsAuthenticatedCustom(true);
      } catch (err) {}
    };
    verifyLoggedIn();
  }, []);

  const handleCreatePost = async (title, desc, file) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        post: {
          email: user.email,
          name: user.given_name,
          title,
          desc,
          img: file,
          likes: [],
        },
      }),
    });
    const data = await response.json();
    if (data.status === "ok") getAllPosts(setPosts, setLoading);
  };

  const createPost = (title, desc, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      handleCreatePost(title, desc, reader.result);
    };
    setCreatingPost(false);
  };

  const handleDeleteAccount = async (email) => {
    logout();
    setIsAuthenticatedCustom(false);
    setCreatingPost(false);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user?email=${email}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data.status === "ok") getAllPosts();
  };

  const handleLike = async (postOwner, postId) => {
    if (!user) {
      alert("Please Login to Like or Create Posts");
      return;
    }
    const token = await getAccessTokenSilently();

    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "post/like",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postOwner, postId, email: user.email }),
      }
    );
    const data = await response.json();
    if (data.status === "ok") {
      const newPosts = posts.map((item) => {
        if (item.id === postId) {
          item.likes.push(user.email);
        }
        return item;
      });
      setPosts(newPosts);
    }
  };

  const handleSignIn = async () => {
    const response_data = await loginWithPopup();
    setIsAuthenticatedCustom(true);
  };

  const handleLogout = () => {
    setIsAuthenticatedCustom(false);
    setCreatingPost(false);
    logout();
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Store.Provider
          value={{
            creatingPost,
            isAuthenticatedCustom,
            setCreatingPost,
            setIsAuthenticatedCustom,
            loginWithPopup,
            user,
            logout,
            isAuthenticated,
            posts,
            getAccessTokenSilently,
            createPost,
            setPosts,
            getAllPosts,
            handleDeleteAccount,
            handleLike,
            loading,
            handleSignIn,
            handleLogout,
          }}
        >
          <Nav />
          <Main />
          <Footer />
        </Store.Provider>
      </div>
    </div>
  );
}

export { Store };
export default App;
