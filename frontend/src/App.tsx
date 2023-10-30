import { createContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Nav from "./components/Nav";

import { useAuth0 } from "@auth0/auth0-react";

const Store = createContext({});

function App() {
  const [posts, setPosts] = useState([]);
  const [creatingPost, setCreatingPost] = useState(false);
  const [isAuthenticatedCustom, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const callApi = async () => {
      const URL = import.meta.env.VITE_BACKEND_URL + "post";
      const response = await fetch(URL);
      const data = await response.json();
      setPosts(data);
    };
    callApi();
  }, []);
  const {
    loginWithPopup,
    user,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Store.Provider
          value={{
            creatingPost,
            isAuthenticatedCustom,
            setCreatingPost,
            setIsAuthenticated,
            loginWithPopup,
            user,
            logout,
            isAuthenticated,
            posts,
            getAccessTokenSilently,
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
