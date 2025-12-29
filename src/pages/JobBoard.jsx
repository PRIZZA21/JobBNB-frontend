import React, { useState, useEffect } from 'react';
import api from '../api';
import { Search, MapPin, Briefcase, IndianRupee, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        employmentType: '',
        minSalary: '',
        maxSalary: ''
    });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            // Convert empty strings to null for the API
            const params = Object.fromEntries(
                Object.entries(filters).map(([k, v]) => [k, v === '' ? null : v])
            );
            const response = await api.get('/jobs', { params });
            setJobs(response.data.data.content);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                    Find Your Next Big Pivot
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Premium engineering & branding roles at your fingertips.
                </p>
            </motion.header>

            <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Keywords..."
                            className="glass-card"
                            style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }}
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Location..."
                            className="glass-card"
                            style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }}
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ height: '48px' }}>
                        Search Jobs
                    </button>
                </form>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                <AnimatePresence>
                    {loading ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>Loading the best roles...</div>
                    ) : jobs.length > 0 ? (
                        jobs.map((job, idx) => (
                            <motion.div
                                key={job.id}
                                className="glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.4rem', color: '#818cf8' }}>{job.title}</h3>
                                    <span style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '4px 8px', borderRadius: '4px' }}>
                                        {job.employmentType}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', height: '80px', overflow: 'hidden' }}>
                                    {job.description}
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={16} /> {job.location}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <IndianRupee size={16} /> {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
                                    </span>
                                </div>
                                <button className="btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
                                    View Details
                                </button>
                            </motion.div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>No jobs found matching your criteria.</div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default JobBoard;
