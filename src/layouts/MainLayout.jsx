import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ token, avatarColor, getInitials, profile }) {
  return (
    <>
      <Navbar
        token={token}
        avatarColor={avatarColor}
        getInitials={getInitials}
        profile={profile}
      />
      <main style={{ padding: "2rem 0" }}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
