import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

const ProfilePage = ({ onLogout, profile, setProfile, avatarColor, loading }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [authData, setAuthData] = useState({});

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/user", authData);
      setProfile(response.data.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsEditMode(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (!profile)
    return <p style={{ textAlign: "center" }}>No profile data found.</p>;

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "3rem",
      }}
    >
      {!isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: "3rem",
          }}
        >
          {/* Top section */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                backgroundColor: avatarColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.8rem",
                color: "white",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              {getInitials(profile.name)}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: "250px" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {profile.name}
              </h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                {profile.email}
              </p>

              <div style={{ display: "grid", gap: "0.75rem" }}>
                <InfoRow label="Role" value={profile.role} />
                {profile.resumeUrl && (
                  <InfoRow
                    label="Resume"
                    value={
                      <a
                        href={
                          profile.resumeUrl.startsWith("http")
                            ? profile.resumeUrl
                            : `https://${profile.resumeUrl}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    }
                  />
                )}
                {profile.linkedinUrl && (
                  <InfoRow
                    label="LinkedIn"
                    value={
                      <a
                        href={
                          profile.linkedinUrl.startsWith("http")
                            ? profile.linkedinUrl
                            : `https://${profile.linkedinUrl}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Profile
                      </a>
                    }
                  />
                )}
                {profile.companyUrl && (
                  <InfoRow
                    label="Company"
                    value={
                      <a
                        href={
                          profile.companyUrl.startsWith("http")
                            ? profile.companyUrl
                            : `https://${profile.companyUrl}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Company
                      </a>
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => {
                setIsEditMode(true);
                setAuthData(profile);
              }}
              style={{
                background: "transparent",
                border: "2px solid #f87171",
                color: "#f87171",
                padding: "10px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f87171";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#f87171";
              }}
            >
              Update Profile
            </button>
            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "2px solid #f87171", // hollow outline
                color: "#f87171",
                padding: "10px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f87171";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#f87171";
              }}
            >
              Sign out
            </button>
          </div>
        </motion.div>
      )}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "2.5rem",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          <h3
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Update Profile
          </h3>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Name */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontWeight: 600, color: "white" }}>Name</label>
              <input
                value={authData.name || ""}
                onChange={(e) =>
                  setAuthData({ ...authData, name: e.target.value })
                }
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            {/* USER fields */}
            {profile.role === "USER" && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={{ fontWeight: 600, color: "white" }}>
                    Resume URL
                  </label>
                  <input
                    value={authData.resumeUrl || ""}
                    onChange={(e) =>
                      setAuthData({ ...authData, resumeUrl: e.target.value })
                    }
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.05)",
                      color: "white",
                      fontSize: "0.95rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label style={{ fontWeight: 600, color: "white" }}>
                    LinkedIn URL
                  </label>
                  <input
                    value={authData.linkedinUrl || ""}
                    onChange={(e) =>
                      setAuthData({ ...authData, linkedinUrl: e.target.value })
                    }
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.05)",
                      color: "white",
                      fontSize: "0.95rem",
                      outline: "none",
                    }}
                  />
                </div>
              </>
            )}

            {/* EMPLOYER field */}
            {profile.role === "EMPLOYER" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={{ fontWeight: 600, color: "white" }}>
                  Company URL
                </label>
                <input
                  value={authData.companyUrl || ""}
                  onChange={(e) =>
                    setAuthData({ ...authData, companyUrl: e.target.value })
                  }
                  style={{
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.5rem",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  border: "1px solid #9ca3af",
                  background: "transparent",
                  color: "#f87171",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <strong style={{ minWidth: "90px" }}>{label}:</strong>
    <span>{value}</span>
  </div>
);

export default ProfilePage;
