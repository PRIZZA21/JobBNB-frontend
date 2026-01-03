import React, { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      try {
        const endpoint = "/auth/login";
        const response = await api.post(endpoint, authData);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        setToken(response.data.data.accessToken);
        navigate("/");
      } catch (err) {
        setError(err.response?.data?.message || "Authentication failed");
      }
    } else {
      navigate("/add-profile-info");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ width: "100%", maxWidth: "450px", padding: "3rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <ShieldCheck
            size={48}
            style={{ color: "var(--primary)", marginBottom: "1rem" }}
          />
          <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
            {isLogin ? "Welcome Back" : "Join JobBNB"}
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            {isLogin
              ? "Login to your premium dashboard"
              : "Start your journey with us today"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {!isLogin && (
            <div style={{ position: "relative" }}>
              <User
                size={20}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="glass-card"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                }}
                required
                onChange={(e) =>
                  setAuthData({ ...authData, name: e.target.value })
                }
              />
            </div>
          )}
          <div style={{ position: "relative" }}>
            <Mail
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="glass-card"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
              }}
              required
              onChange={(e) =>
                setAuthData({ ...authData, email: e.target.value })
              }
            />
          </div>
          <div style={{ position: "relative" }}>
            <Lock
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "12px",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="glass-card"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
              }}
              required
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
            />
          </div>

          {!isLogin && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <label style={{ flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={authData.role === "USER"}
                  onChange={(e) =>
                    setAuthData({ ...authData, role: e.target.value })
                  }
                />{" "}
                Candidate
              </label>
              <label style={{ flex: 1 }}>
                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  checked={authData.role === "EMPLOYER"}
                  onChange={(e) =>
                    setAuthData({ ...authData, role: e.target.value })
                  }
                />{" "}
                Employer
              </label>
            </div>
          )}

          {error && (
            <p
              style={{
                color: "#f87171",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "14px", fontSize: "1.1rem" }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {isLogin && (
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                fontSize: "0.9rem",
                cursor: "pointer",
                fontWeight: 500,
                padding: 0,
              }}
            >
              Forgot password?
            </button>
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "var(--text-muted)",
          }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary)",
              cursor: "pointer",
              marginLeft: "8px",
              fontWeight: 600,
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
        {isLogin && <GoogleLogin setToken={setToken} />}
      </motion.div>
    </div>
  );
};

export default Auth;
