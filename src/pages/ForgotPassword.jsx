import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } finally {
      setLoading(false);
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
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
          Forgot Password
        </h2>

        {sent ? (
          <p style={{ textAlign: "center", color: "#34d399" }}>
            If an account exists with this email, you’ll receive a reset link
            shortly.
          </p>
        ) : (
          <>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                marginBottom: "1.5rem",
              }}
            >
              Enter your email and we’ll send you a password reset link.
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
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  background: "rgba(2, 6, 23, 0.7)",
                  color: "var(--text-main)",
                }}
              />

              <button
                disabled={loading}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
