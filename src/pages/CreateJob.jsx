import React, { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { PlusCircle, FileText, MapPin, Briefcase, IndianRupee, Link as LinkIcon, Save } from 'lucide-react';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        employmentType: 'FULL_TIME',
        minSalary: '',
        maxSalary: '',
        testUrl: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', msg: 'Posting job...' });
        try {
            await api.post('/jobs', {
                ...formData,
                minSalary: parseInt(formData.minSalary),
                maxSalary: parseInt(formData.maxSalary)
            });
            setStatus({ type: 'success', msg: 'Job posted successfully!' });
            setFormData({
                title: '', description: '', location: '',
                employmentType: 'FULL_TIME', minSalary: '', maxSalary: '', testUrl: ''
            });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Failed to post job' });
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ padding: '3rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <PlusCircle size={32} style={{ color: 'var(--primary)' }} />
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Post a Premium Role</h2>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Job Title</label>
                        <div style={{ position: 'relative' }}>
                            <FileText size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                value={formData.title}
                                required
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Description</label>
                        <textarea
                            className="glass-card"
                            style={{ width: '100%', padding: '12px', minHeight: '150px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                            value={formData.description}
                            required
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Location</label>
                            <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                value={formData.location}
                                required
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Type</label>
                            <select
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(30, 41, 59, 1)', color: 'white' }}
                                value={formData.employmentType}
                                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                            >
                                <option value="FULL_TIME">Full Time</option>
                                <option value="PART_TIME">Part Time</option>
                                <option value="CONTRACT">Contract</option>
                                <option value="REMOTE">Remote</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Min Salary</label>
                            <input
                                type="number"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                value={formData.minSalary}
                                required
                                onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
                            />
                        </div>
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Max Salary</label>
                            <input
                                type="number"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                value={formData.maxSalary}
                                required
                                onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Assessment URL</label>
                        <input
                            type="url"
                            className="glass-card"
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                            value={formData.testUrl}
                            required
                            onChange={(e) => setFormData({ ...formData, testUrl: e.target.value })}
                        />
                    </div>

                    {status.msg && (
                        <p style={{ color: status.type === 'error' ? '#f87171' : '#4ade80', textAlign: 'center' }}>
                            {status.msg}
                        </p>
                    )}

                    <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.2rem', padding: '16px' }}>
                        <Save size={20} /> Publish Job Post
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateJob;
