import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FilterContextProvider } from "./context/FilterContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-pyyty0hb4igdkzxv.us.auth0.com"
      clientId="wtjmj4Jv2h2RLdZ9AwkH2flCuZDPIvqx"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/products`,
      }}
    >
      <FilterContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FilterContextProvider>
    </Auth0Provider>
  </StrictMode>
);
