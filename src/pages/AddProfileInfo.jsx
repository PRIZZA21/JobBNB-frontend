import React, { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddProfileInfo = ({ setToken }) => {
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const role = authData.role;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = "/auth/register";
      const response = await api.post(endpoint, authData);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      setToken(response.data.data.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ width: "100%", maxWidth: "450px", padding: "3rem" }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            marginBottom: "2rem",
          }}
        >
          Complete Your Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {role === "USER" && (
            <>
              <input
                type="url"
                placeholder="Resume URL *"
                required
                className="glass-card"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                }}
                onChange={(e) =>
                  setAuthData({ ...authData, resumeUrl: e.target.value })
                }
              />
              <input
                type="url"
                placeholder="LinkedIn URL (optional)"
                className="glass-card"
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                }}
                onChange={(e) =>
                  setAuthData({ ...authData, linkedinUrl: e.target.value })
                }
              />
            </>
          )}

          {role === "EMPLOYER" && (
            <input
              type="url"
              placeholder="Company Website URL *"
              required
              className="glass-card"
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                background: "rgba(255,255,255,0.05)",
                color: "white",
              }}
              onChange={(e) =>
                setAuthData({ ...authData, companyUrl: e.target.value })
              }
            />
          )}

          {error && (
            <p style={{ color: "#f87171", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "14px" }}
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProfileInfo;
