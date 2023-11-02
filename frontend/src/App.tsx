import { createContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";

import { useAuth0 } from "@auth0/auth0-react";

const Store = createContext({});

function App() {
  const [posts, setPosts] = useState([]);
  const [creatingPost, setCreatingPost] = useState(false);
  const [isAuthenticatedCustom, setIsAuthenticatedCustom] = useState(false);

  const getAllPosts = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "post");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const sendPost = async (title, desc, file) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    if (data.status === "ok") getAllPosts();
  };

  const createPost = (title, desc, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      sendPost(title, desc, reader.result);
      setPosts([
        ...posts,
        {
          email: user.email,
          name: user.given_name,
          posts: [
            {
              email: user.email,
              name: user.given_name,
              title,
              desc,
              img: reader.result,
              likes: [],
            },
          ],
        },
      ]);
    };
    setCreatingPost(false);
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
