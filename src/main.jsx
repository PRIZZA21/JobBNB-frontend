import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./provider/AuthProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Replace with your actual Google OAuth client ID
const googleClientId = "702728147852-1v4pe3mi0rs4lrn32fogn2be4pqarid7.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
