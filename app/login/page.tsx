'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '@/components/auth/Auth.module.css';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData.email);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.glowOrb} ${styles.glowOne}`} />
            <div className={`${styles.glowOrb} ${styles.glowTwo}`} />

            <div className={styles.card}>
                <div className={styles.logo}>
                    <Sparkles size={24} className="text-primary" />
                    <span>Resume Analyzer Platform</span>
                </div>

                <div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to continue building your future</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={styles.input}
                            placeholder=" "
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={styles.input}
                            placeholder=" "
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="password" className={styles.inputLabel}>Password</label>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Log In
                    </button>
                </form>

                <p className={styles.footer}>
                    Don't have an account?
                    <Link href="/signup" className={styles.link}>Sign up</Link>
                </p>
            </div>
        </div>
    );
}
