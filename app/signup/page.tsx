'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from '@/components/auth/Auth.module.css';
import { Sparkles, Check, X } from 'lucide-react';

export default function SignupPage() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordValidation, setPasswordValidation] = useState({
        hasMinLength: false,
        hasCapital: false,
        hasSpecial: false,
        passwordsMatch: false
    });

    const [showValidation, setShowValidation] = useState(false);

    useEffect(() => {
        const password = formData.password;
        const hasMinLength = password.length >= 8;
        const hasCapital = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

        setPasswordValidation({
            hasMinLength,
            hasCapital,
            hasSpecial,
            passwordsMatch
        });
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            setShowValidation(true);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Password validation
        const password = formData.password;
        const hasCapital = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        if (!hasMinLength) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (!hasCapital) {
            alert("Password must contain at least one capital letter");
            return;
        }

        if (!hasSpecial) {
            alert("Password must contain at least one special character (!@#$%^&*...)");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        register(formData.username, formData.email);
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
                    <h1 className={styles.title}>Start Free Trial</h1>
                    <p className={styles.subtitle}>Join today and get 3 AI credits instantly</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={styles.input}
                            placeholder=" "
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="username" className={styles.inputLabel}>Username</label>
                    </div>

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

                    {/* Password Validation Feedback */}
                    {showValidation && formData.password && (
                        <div className={styles.validationBox}>
                            <p className={styles.validationTitle}>Password Requirements:</p>
                            <div className={styles.validationItem}>
                                {passwordValidation.hasMinLength ? (
                                    <Check size={16} className={styles.validIcon} />
                                ) : (
                                    <X size={16} className={styles.invalidIcon} />
                                )}
                                <span className={passwordValidation.hasMinLength ? styles.validText : styles.invalidText}>
                                    At least 8 characters
                                </span>
                            </div>
                            <div className={styles.validationItem}>
                                {passwordValidation.hasCapital ? (
                                    <Check size={16} className={styles.validIcon} />
                                ) : (
                                    <X size={16} className={styles.invalidIcon} />
                                )}
                                <span className={passwordValidation.hasCapital ? styles.validText : styles.invalidText}>
                                    One capital letter (A-Z)
                                </span>
                            </div>
                            <div className={styles.validationItem}>
                                {passwordValidation.hasSpecial ? (
                                    <Check size={16} className={styles.validIcon} />
                                ) : (
                                    <X size={16} className={styles.invalidIcon} />
                                )}
                                <span className={passwordValidation.hasSpecial ? styles.validText : styles.invalidText}>
                                    One special character (!@#$%...)
                                </span>
                            </div>
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={styles.input}
                            placeholder=" "
                            required
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password</label>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                        <div className={styles.validationItem}>
                            {passwordValidation.passwordsMatch ? (
                                <>
                                    <Check size={16} className={styles.validIcon} />
                                    <span className={styles.validText}>Passwords match</span>
                                </>
                            ) : (
                                <>
                                    <X size={16} className={styles.invalidIcon} />
                                    <span className={styles.invalidText}>Passwords don't match</span>
                                </>
                            )}
                        </div>
                    )}

                    <button type="submit" className={styles.submitBtn}>
                        Create Account
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account?
                    <Link href="/login" className={styles.link}>Log in</Link>
                </p>


            </div>
        </div>
    );
}
