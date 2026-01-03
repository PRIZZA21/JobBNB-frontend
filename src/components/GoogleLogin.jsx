import React from "react";
import { GoogleLogin as GoogleButton } from "@react-oauth/google";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GoogleLogin = ({ setToken, isLogin }) => {
  const navigate = useNavigate();

  const { authData } = useAuth();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await api.post("/auth/google", {
        idToken: credentialResponse.credential,
        role: authData.role, // or EMPLOYER depending on flow
      });

      // Save tokens
      setToken(response.data.data.accessToken);
      // If using local storage temporarily:
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error("Google login failed", err);
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
      <p style={{ marginBottom: "0.5rem", color: "var(--text-muted)" }}>
        Or
      </p>
      <GoogleButton
        onSuccess={handleGoogleLogin}
        onError={() => alert("Google login failed")}
        logo_alignment="center"
        shape="circle"
        text={isLogin ? "continue_with" : "signup_with"}
      />
    </div>
  );
};

export default GoogleLogin;
