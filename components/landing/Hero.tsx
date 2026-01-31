import Link from 'next/link';
import styles from './Hero.module.css';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.bgGlow} />
            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />

            <div className="container">
                <div className={styles.content}>


                    <h1 className={`${styles.title} animate-fade-in`}>
                        Craft Your Future with
                        <span>Intelligent Resumes</span>
                    </h1>

                    <p className={`${styles.description} animate-fade-in delay-100`}>
                        Stop guessing what recruiters want. Our industry-grade AI builder analyzes your profile against millions of job descriptions to create the perfect resume.
                    </p>

                    <div className={`${styles.ctaGroup} animate-fade-in delay-200`}>
                        <Link href="/signup" className="btn-primary">
                            Start Your Free Trial <ArrowRight size={18} />
                        </Link>
                        <Link href="/samples" className="btn-secondary">
                            View Samples
                        </Link>
                    </div>


                </div>
            </div>
        </section>
    );
}
