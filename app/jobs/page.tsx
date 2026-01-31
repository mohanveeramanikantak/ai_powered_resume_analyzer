'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Search, ExternalLink, MapPin, Filter, DollarSign, Clock } from 'lucide-react';
import styles from './jobs.module.css';

export default function JobsPage() {
    const { resumeData } = useResume();
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('all');

    const findJobs = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeData,
                    searchQuery,
                    location: locationFilter,
                    jobType: jobTypeFilter
                }),
            });
            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-gradient">AI-Powered Job Matching</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our AI analyzes your skills, experience, and resume content to find the perfect roles for you.
                        Leveraging advanced RAG technology to match you with high-fit opportunities.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <Search size={20} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by job title, company, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <MapPin size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className={styles.filterInput}
                            />
                        </div>

                        <select
                            value={jobTypeFilter}
                            onChange={(e) => setJobTypeFilter(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="all">All Types</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                </div>

                <div className={styles.actionArea}>
                    {resumeData.skills.length === 0 && resumeData.experience.length === 0 ? (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-lg inline-block mb-4">
                            Please build your resume first to get personalized matches.
                        </div>
                    ) : (
                        <button
                            onClick={findJobs}
                            disabled={loading}
                            className={`btn-primary ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? 'Analyzing Market...' : 'Find Tailored Jobs'}
                        </button>
                    )}
                </div>

                {searched && !loading && jobs.length === 0 && (
                    <div className="text-center text-gray-400 mt-10">
                        No specific matches found. Try adjusting your filters or adding more details to your resume.
                    </div>
                )}

                <div className={styles.grid}>
                    {jobs.map((job, idx) => (
                        <div key={idx} className={`${styles.jobCard} animate-fade-in`} style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                                    <p className="text-primary font-medium">{job.company}</p>
                                </div>
                                <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20 font-semibold">
                                    {job.matchScore}% Match
                                </span>
                            </div>

                            <div className="flex gap-4 text-sm text-gray-400 mb-4 flex-wrap">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                                {job.salary && <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>}
                                {job.posted && <span className="flex items-center gap-1"><Clock size={14} /> {job.posted}</span>}
                            </div>

                            <p className="text-sm text-gray-300 mb-4">
                                {job.reason || job.reasonReason}
                            </p>

                            {job.skills && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.slice(0, 5).map((skill: string, i: number) => (
                                            <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                                <span className="text-xs text-gray-500">AI Recommended</span>
                                <button className="text-sm text-white hover:text-primary flex items-center gap-1 transition-colors">
                                    Apply Now <ExternalLink size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
