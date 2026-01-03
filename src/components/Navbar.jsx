import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, LogOut, PlusCircle } from "lucide-react";

function Navbar({ token, profile, avatarColor }) {
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <nav
      style={{
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            background: "var(--primary)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <Briefcase color="white" size={24} />
        </div>
        <span
          className="gradient-text"
          style={{ fontSize: "1.5rem", fontWeight: 900 }}
        >
          JobBNB
        </span>
      </Link>

      {/* Actions */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Browse Jobs
        </Link>

        {token ? (
          <>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: avatarColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                {getInitials(profile?.name)}
              </div>
            </Link>
          </>
        ) : (
          <Link
            to="/auth"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
