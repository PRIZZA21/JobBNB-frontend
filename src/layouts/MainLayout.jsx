import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ token, profile, avatarColor }) {
  const navigate = useNavigate();
  return (
    <>
      <Navbar token={token} profile={profile} avatarColor={avatarColor} />
      <main style={{ padding: "2rem 0" }}>
        <Outlet />
      </main>
      {token && profile?.role === "EMPLOYER" && (
        <button
          onClick={() => navigate("/post-job")}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 100,
          }}
        >
          +
        </button>
      )}
    </>
  );
}

export default MainLayout;
