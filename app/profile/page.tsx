'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useResume } from '@/context/ResumeContext';
import styles from './profile.module.css';
import { User, Mail, Award, FileText, Briefcase, LogOut, Trash2 } from 'lucide-react';

export default function ProfilePage() {
    const { user, logout, isAuthenticated } = useAuth();
    const { resumeData } = useResume();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Remove user from database
            const usersDb = localStorage.getItem('ag_users_db');
            if (usersDb) {
                const users = JSON.parse(usersDb);
                const updatedUsers = users.filter((u: any) => u.email !== user.email);
                localStorage.setItem('ag_users_db', JSON.stringify(updatedUsers));
            }
            logout();
        }
    };

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-gradient">My Profile</span>
                    </h1>
                    <p className="text-gray-400">Manage your account and track your progress</p>
                </div>

                <div className={styles.grid}>
                    {/* Profile Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Account Information</h2>
                        </div>

                        <div className={styles.profileInfo}>
                            <div className={styles.avatar}>
                                <User size={48} />
                            </div>

                            <div className={styles.infoGroup}>
                                <label>
                                    <User size={16} />
                                    Username
                                </label>
                                <p>{user.username}</p>
                            </div>

                            <div className={styles.infoGroup}>
                                <label>
                                    <Mail size={16} />
                                    Email
                                </label>
                                <p>{user.email}</p>
                            </div>

                            <div className={styles.infoGroup}>
                                <label>
                                    <Award size={16} />
                                    AI Credits Remaining
                                </label>
                                <div className={styles.creditsDisplay}>
                                    <span className={styles.creditsNumber}>{user.credits}</span>
                                    <span className={styles.creditsLabel}>credits</span>
                                </div>
                                {user.credits === 0 && (
                                    <p className={styles.warningText}>
                                        You've used all your free credits. Upgrade to continue using AI features.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resume Stats Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Resume Statistics</h2>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className={styles.statValue}>
                                        {resumeData.personalInfo.fullName ? '1' : '0'}
                                    </p>
                                    <p className={styles.statLabel}>Resume Created</p>
                                </div>
                            </div>

                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <p className={styles.statValue}>{resumeData.experience.length}</p>
                                    <p className={styles.statLabel}>Work Experiences</p>
                                </div>
                            </div>

                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className={styles.statValue}>{resumeData.skills.length}</p>
                                    <p className={styles.statLabel}>Skills Added</p>
                                </div>
                            </div>

                            <div className={styles.statItem}>
                                <div className={styles.statIcon}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className={styles.statValue}>{resumeData.education.length}</p>
                                    <p className={styles.statLabel}>Education Entries</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Quick Actions</h2>
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.actionBtn}
                                onClick={() => router.push('/builder')}
                            >
                                <FileText size={20} />
                                Edit Resume
                            </button>

                            <button
                                className={styles.actionBtn}
                                onClick={() => router.push('/jobs')}
                            >
                                <Briefcase size={20} />
                                Find Jobs
                            </button>

                            <button
                                className={styles.actionBtn}
                                onClick={() => router.push('/samples')}
                            >
                                <Award size={20} />
                                View Samples
                            </button>
                        </div>
                    </div>

                    {/* Account Management Card */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Account Management</h2>
                        </div>

                        <div className={styles.dangerZone}>
                            <button
                                className={styles.logoutBtn}
                                onClick={handleLogout}
                            >
                                <LogOut size={20} />
                                Logout
                            </button>

                            <button
                                className={styles.deleteBtn}
                                onClick={handleDeleteAccount}
                            >
                                <Trash2 size={20} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
