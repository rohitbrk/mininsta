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
const PaginationContext = createContext(null);

function App() {
  const posts = useContext(PostsContext);
  const postsDispatch = useContext(PostsDispatchContext);

  const [creatingPost, setCreatingPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState(false);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const fetchPosts = async (page) => {
    setLoading(true);
    const data = await useFetch(`/post?page=${page}`, "", {});
    setPageCount(data.pageCount);
    postsDispatch({ type: "SET_POSTS", payload: data.posts });
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleSigninApi = async () => {
      const token = await getAccessTokenSilently();

      const data = await useFetch("/user", token, {
        method: "POST",
        body: {
          name: user.name,
          picture: user.picture,
        },
      });
    };
    handleSigninApi();
  }, [isAuthenticated]);

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <div className="md:w-full w-screen">
        <Store.Provider
          value={{
            creatingPost,
            setCreatingPost,
            loading,
            myPosts,
            setMyPosts,
            fetchPosts,
            setLoading,
          }}
        >
          <AuthContext.Provider
            value={{
              user,
              logout,
              getAccessTokenSilently,
            }}
          >
            <PaginationContext.Provider value={{ page, setPage, pageCount }}>
              <Main />
            </PaginationContext.Provider>
            <Footer />
          </AuthContext.Provider>
        </Store.Provider>
      </div>
    </div>
  );
}

export { Store, AuthContext, PaginationContext };
export default App;
