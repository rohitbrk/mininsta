import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import PostsProvider from "./context/PostsContext.tsx";
import Communities from "./components/Communities.tsx";
import Tips from "./components/Tips.tsx";
import PopularUsers from "./components/PopularUsers.tsx";
import Nav from "./components/Nav.tsx";

const Index = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUDIENCE,
        scope: import.meta.env.VITE_SCOPE,
      }}
    >
      <PostsProvider>
        <Nav />
        <div className="flex">
          <div className="flex flex-col basis-1/4 hidden md:flex">
            <div>
              <Communities />
            </div>
            <div>
              <PopularUsers />
            </div>
          </div>
          <div className="sm:basis-1 lg:basis-1/2">
            <App />
          </div>
          <div className="basis-1/4 hidden md:flex">
            <Tips />
          </div>
        </div>
      </PostsProvider>
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Index />);
