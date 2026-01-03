import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobBoard from "./pages/JobBoard";
import Auth from "./pages/Auth";
import CreateJob from "./pages/CreateJob";
import AddProfileInfo from "./pages/AddProfileInfo";
import ProfilePage from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";

import api from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const [user, setUser] = useState(null);
  const [avatarColor, setAvatarColor] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await api.get("/user");
        setUser(response.data.data);

        const colors = [
          "#F87171",
          "#FBBF24",
          "#34D399",
          "#60A5FA",
          "#A78BFA",
          "#F472B6",
        ];
        setAvatarColor(colors[Math.floor(Math.random() * colors.length)]);
      } catch (error) {
        console.error("Failed to fetch user", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT navbar */}
        <Route path="/auth" element={<Auth setToken={setToken} />} />
        <Route
          path="/add-profile-info"
          element={<AddProfileInfo setToken={setToken} />}
        />

        {/* Routes WITH navbar */}
        <Route element={<MainLayout token={token} profile={user} avatarColor={avatarColor} />}>
          <Route path="/" element={<JobBoard />} />
          <Route path="/post-job" element={<CreateJob />} />
          <Route
            path="/profile"
            element={<ProfilePage onLogout={handleLogout} profile={user} setProfile={setUser} avatarColor={avatarColor} loading={loading} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
