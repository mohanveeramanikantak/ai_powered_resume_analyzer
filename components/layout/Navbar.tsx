'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { Sparkles, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navInner}>
                    <Link href="/" className={styles.logo}>
                        <Sparkles size={24} className="text-secondary" />
                        Resume Analyzer<span>Platform</span>
                    </Link>

                    <div className={styles.actions}>
                        <Link href="/jobs" className={styles.link}>Find Jobs</Link>
                        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                        <Link href="/builder" className={styles.link}>Builder</Link>

                        {isAuthenticated ? (
                            <>
                                <Link href="/profile" className={styles.profileLink}>
                                    <User size={18} />
                                    {user?.username}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn-secondary">Login</Link>
                                <Link href="/builder" className="btn-primary">
                                    Build Resume
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
