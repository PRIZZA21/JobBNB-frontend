import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
} from "lucide-react";

const JobOverview = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}`);
        setJob(res.data.data);
      } catch (err) {
        console.error("Failed to load job", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    if (!job?.testUrl) return;
    navigate(job.testUrl);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "white" }}>
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#f87171" }}>
        Job not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        maxWidth: "900px",
        margin: "3rem auto",
        padding: "3rem",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>
          {job.title}
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          {job.createdByName}
        </p>
      </div>

      {/* META INFO */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <MapPin size={18} />
          {job.location}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Briefcase size={18} />
          {job.employmentType}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <IndianRupee size={18} />
          {job.minSalary && job.maxSalary
            ? `${job.minSalary} - ${job.maxSalary}`
            : "Not disclosed"}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={18} />
          Posted on{" "}
          {new Date(job.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h3 style={{ marginBottom: "0.75rem" }}>Job Description</h3>
        <p
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {job.description}
        </p>
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={!job.isActive}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "1.1rem",
          fontWeight: 700,
          opacity: job.isActive ? 1 : 0.5,
          cursor: job.isActive ? "pointer" : "not-allowed",
        }}
      >
        {job.isActive ? "Apply for this job" : "Job is no longer active"}
      </button>
    </motion.div>
  );
};

export default JobOverview;
