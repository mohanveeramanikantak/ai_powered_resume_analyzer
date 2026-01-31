'use client';

import React from 'react';
import styles from './Samples.module.css';
import Image from 'next/image';

export default function SamplesSection() {
    return (
        <section id="samples" className={styles.container}>
            <div className="container">
                <h2 className={styles.heading}>
                    Approved by Recruiters <br />
                    <span className="text-gradient">Real Success Stories</span>
                </h2>

                <div className={styles.grid}>
                    <div className={styles.sampleCard}>
                        {/* We use abstract CSS shapes to simulate a resume, but label it as a person's result */}
                        <div className={styles.previewBox}>
                            <div className={`${styles.fakeResume} ${styles.classic}`}>
                                <div className={styles.fakeHeader}></div>
                                <div className={styles.fakeLines}></div>
                                <div className={styles.fakeLines}></div>
                                <div style={{ width: '40%', height: '4px', background: '#eee', marginTop: '10px' }}></div>
                            </div>
                        </div>
                        <h3>Software Engineer</h3>
                        <p>Landed job at Tech Giant</p>
                    </div>

                    <div className={styles.sampleCard}>
                        <div className={styles.previewBox}>
                            <div className={`${styles.fakeResume} ${styles.modern}`}>
                                <div className={styles.fakeHeader}></div>
                                <div className={styles.fakeCol}></div>
                                <div style={{ width: '60%', height: '4px', background: '#eee', marginLeft: 'auto' }}></div>
                            </div>
                        </div>
                        <h3>Product Manager</h3>
                        <p>Optimized for ATS Parsing</p>
                    </div>

                    <div className={styles.sampleCard}>
                        <div className={styles.previewBox}>
                            <div className={`${styles.fakeResume} ${styles.minimal}`}>
                                <div className={styles.fakeSide}></div>
                                <div className={styles.fakeBody}></div>
                            </div>
                        </div>
                        <h3>UX Designer</h3>
                        <p>Highlighted Portfolio Links</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
