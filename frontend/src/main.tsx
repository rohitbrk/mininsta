import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";
import PostsProvider from "./context/PostsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
      <App />
    </PostsProvider>
  </Auth0Provider>
);
