'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { FileText, Plus, Edit, Trash2, Download, ExternalLink, Award } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [resumes, setResumes] = useState<any[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        // Load saved resumes from localStorage (mock backend)
        const savedResumes = localStorage.getItem('ag_saved_resumes');
        if (savedResumes) {
            setResumes(JSON.parse(savedResumes));
        } else {
            // Initial dummy data if empty
            const dummy = [
                {
                    id: '1',
                    title: 'Senior Developer Resume',
                    score: 92,
                    lastUpdated: '2026-01-25',
                    template: 'Modern'
                },
                {
                    id: '2',
                    title: 'Product Manager Application',
                    score: 78,
                    lastUpdated: '2026-01-28',
                    template: 'Classic'
                }
            ];
            setResumes(dummy);
            localStorage.setItem('ag_saved_resumes', JSON.stringify(dummy));
        }
    }, [isAuthenticated, router]);

    const deleteResume = (id: string) => {
        if (confirm('Are you sure you want to delete this resume?')) {
            const updated = resumes.filter(r => r.id !== id);
            setResumes(updated);
            localStorage.setItem('ag_saved_resumes', JSON.stringify(updated));
        }
    };

    if (!user) return null;

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className="flex justify-between items-end w-full">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                Welcome back, <span className="text-gradient">{user.username}</span>
                            </h1>
                            <p className="text-gray-400">Manage your resumes and track your career progress.</p>
                        </div>
                        <Link href="/builder" className="btn-primary flex items-center gap-2">
                            <Plus size={20} /> Create New Resume
                        </Link>
                    </div>
                </div>

                <div className={styles.statsStrip}>
                    <div className={styles.statBox}>
                        <span className={styles.statVal}>{resumes.length}</span>
                        <span className={styles.statLabel}>Total Resumes</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statVal}>{user.credits}</span>
                        <span className={styles.statLabel}>AI Credits</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statVal}>85%</span>
                        <span className={styles.statLabel}>Average Score</span>
                    </div>
                </div>

                <div className={styles.grid}>
                    {resumes.map((resume) => (
                        <div key={resume.id} className={styles.resumeCard}>
                            <div className={styles.cardPreview}>
                                <FileText size={40} className="text-primary/40" />
                                <div className={styles.scoreBadge}>
                                    <Award size={14} className="text-yellow-400" />
                                    {resume.score}
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.resumeTitle}>{resume.title}</h3>
                                <div className={styles.meta}>
                                    <span>Template: {resume.template}</span>
                                    <span>•</span>
                                    <span>Updated {new Date(resume.lastUpdated).toLocaleDateString()}</span>
                                </div>

                                <div className={styles.cardActions}>
                                    <button
                                        onClick={() => router.push(`/builder?id=${resume.id}`)}
                                        className={styles.actionBtn}
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button className={styles.actionBtn} title="Download PDF">
                                        <Download size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteResume(resume.id)}
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link href="/builder" className={styles.createCard}>
                        <div className={styles.plusCircle}>
                            <Plus size={32} />
                        </div>
                        <span>Create New Resume</span>
                    </Link>
                </div>

                <div className={styles.bottomActions}>
                    <Link href="/samples" className="text-primary hover:underline flex items-center gap-2">
                        <ExternalLink size={16} /> View Professional Samples
                    </Link>
                </div>
            </div>
        </main>
    );
}
