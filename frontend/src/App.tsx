// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import Nav from "./components/Nav.tsx";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { getDate } from "./utils/date";
import { useAuth0 } from "@auth0/auth0-react";
import { PostsDispatchContext } from "./context/PostsContext.tsx";
import Communities from "./components/Communities.tsx";
import Tips from "./components/Tips.tsx";
import PopularUsers from "./components/PopularUsers.tsx";
import { get, post } from "./utils/api.ts";
import Error from "./components/Error.tsx";

const Store = createContext(null);
const AuthContext = createContext(null);
const PaginationContext = createContext(null);

const App = () => {
  const postsDispatch = useContext(PostsDispatchContext);

  const [creatingPost, setCreatingPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [myPostsFlag, setMyPostsFlag] = useState(false);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [suggestions, setSuggestions] = useState({});
  const [filterText, setFilterText] = useState("");

  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
    const handleSigninApi = async () => {
      const token = await getAccessTokenSilently();
      const axiosResponse = await post(
        "/user",
        token,
        {
          name: user.name,
          picture: user.picture,
        },
        setErr
      );
    };

    handleSigninApi();
  }, [isAuthenticated]);

  useEffect(() => {
    const getSuggestions = async () => {
      const axiosResponse = await get("/user", setErr);
      setSuggestions(axiosResponse.data);
    };
    getSuggestions();
  }, []);

  const fetchPosts = async (page) => {
    setLoading(true);
    const axiosResponse = await get(`/post?page=${page}`, setErr);
    setPageCount(axiosResponse.data.pageCount);
    postsDispatch({ type: "SET_POSTS", payload: axiosResponse.data.posts });
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (err) return <Error />;

  return (
    <Store.Provider
      value={{
        creatingPost,
        setCreatingPost,
        loading,
        myPostsFlag,
        setMyPostsFlag,
        fetchPosts,
        setLoading,
        filterText,
        setErr,
      }}
    >
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          logout,
          getAccessTokenSilently,
        }}
      >
        <Nav
          isAuthenticated={isAuthenticated}
          loginWithPopup={loginWithPopup}
          setFilterText={setFilterText}
        />
        <div className="flex">
          <div className="flex flex-col basis-1/4 hidden md:flex">
            <div>
              <Communities communities={suggestions.communities} />
            </div>
            <div>
              <PopularUsers popularUsers={suggestions.popularUsers} />
            </div>
          </div>
          <div className="sm:basis-1 lg:basis-1/2">
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="md:w-full w-screen">
                <PaginationContext.Provider
                  value={{ page, setPage, pageCount }}
                >
                  <Main creatingPost={creatingPost} />
                </PaginationContext.Provider>
                <Footer />
              </div>
            </div>
          </div>
          <div className="basis-1/4 hidden md:flex">
            <Tips tips={suggestions.tips} />
          </div>
        </div>
      </AuthContext.Provider>
    </Store.Provider>
  );
};

export { Store, AuthContext, PaginationContext };
export default App;
