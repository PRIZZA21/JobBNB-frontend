import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });
      navigate("/auth");
    } catch {
      setError("Invalid or expired reset link");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, rgba(99,102,241,0.15), transparent 60%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          borderRadius: "18px",
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          Reset Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          Create a new password for your account.
        </p>

        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          <input
            type="password"
            placeholder="New password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "rgba(2, 6, 23, 0.7)",
              color: "var(--text-main)",
            }}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "rgba(2, 6, 23, 0.7)",
              color: "var(--text-main)",
            }}
          />

          {error && (
            <p style={{ color: "#f87171", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
