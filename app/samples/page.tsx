'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import styles from './samples.module.css';
import { Download, X } from 'lucide-react';

// Sample resume data
const sampleResumes = [
    {
        id: 1,
        title: "Software Engineer Resume",
        category: "Tech",
        preview: {
            name: "Sarah Johnson",
            role: "Senior Software Engineer",
            company: "Tech Giant Inc.",
            experience: "5+ years",
            skills: ["React", "Node.js", "Python", "AWS", "Docker"],
            summary: "Experienced software engineer with expertise in full-stack development and cloud architecture."
        }
    },
    {
        id: 2,
        title: "Product Manager Resume",
        category: "Business",
        preview: {
            name: "Michael Chen",
            role: "Product Manager",
            company: "Innovation Labs",
            experience: "7+ years",
            skills: ["Product Strategy", "Agile", "Data Analysis", "UX Research", "Roadmapping"],
            summary: "Strategic product leader with proven track record of launching successful B2B and B2C products."
        }
    },
    {
        id: 3,
        title: "UX Designer Resume",
        category: "Design",
        preview: {
            name: "Emily Rodriguez",
            role: "Senior UX Designer",
            company: "Creative Studio",
            experience: "4+ years",
            skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility"],
            summary: "User-centered designer passionate about creating intuitive and accessible digital experiences."
        }
    },
    {
        id: 4,
        title: "Marketing Manager Resume",
        category: "Marketing",
        preview: {
            name: "David Park",
            role: "Digital Marketing Manager",
            company: "Growth Agency",
            experience: "6+ years",
            skills: ["SEO", "Content Strategy", "Analytics", "Social Media", "Campaign Management"],
            summary: "Data-driven marketing professional with expertise in digital growth and brand strategy."
        }
    }
];

export default function SamplesPage() {
    const [selectedResume, setSelectedResume] = useState<any>(null);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-gradient">Resume Samples</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore professionally crafted resume examples from various industries.
                        Get inspired and understand what makes a great resume.
                    </p>
                </div>

                <div className={styles.grid}>
                    {sampleResumes.map((resume) => (
                        <div
                            key={resume.id}
                            className={styles.sampleCard}
                            onClick={() => setSelectedResume(resume)}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.category}>{resume.category}</span>
                            </div>

                            <div className={styles.previewMini}>
                                <div className={styles.miniHeader}></div>
                                <div className={styles.miniLine}></div>
                                <div className={styles.miniLine} style={{ width: '80%' }}></div>
                                <div className={styles.miniLine} style={{ width: '60%' }}></div>
                            </div>

                            <h3 className={styles.cardTitle}>{resume.title}</h3>
                            <p className={styles.cardDesc}>
                                {resume.preview.name} • {resume.preview.experience}
                            </p>

                            <button className={styles.viewBtn}>
                                View Full Resume
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for full resume view */}
            {selectedResume && (
                <div className={styles.modal} onClick={() => setSelectedResume(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setSelectedResume(null)}
                        >
                            <X size={24} />
                        </button>

                        <div className={styles.resumePreview}>
                            <div className={styles.resumeHeader}>
                                <h2>{selectedResume.preview.name}</h2>
                                <p className={styles.resumeRole}>{selectedResume.preview.role}</p>
                            </div>

                            <div className={styles.resumeSection}>
                                <h3>Professional Summary</h3>
                                <p>{selectedResume.preview.summary}</p>
                            </div>

                            <div className={styles.resumeSection}>
                                <h3>Experience</h3>
                                <div className={styles.experienceItem}>
                                    <div className={styles.expHeader}>
                                        <strong>{selectedResume.preview.role}</strong>
                                        <span>{selectedResume.preview.experience}</span>
                                    </div>
                                    <p className={styles.company}>{selectedResume.preview.company}</p>
                                    <ul className={styles.bulletList}>
                                        <li>Led cross-functional teams to deliver high-impact projects</li>
                                        <li>Improved system performance by 40% through optimization</li>
                                        <li>Mentored junior team members and conducted code reviews</li>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.resumeSection}>
                                <h3>Skills</h3>
                                <div className={styles.skillsGrid}>
                                    {selectedResume.preview.skills.map((skill: string, idx: number) => (
                                        <span key={idx} className={styles.skillTag}>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.resumeSection}>
                                <h3>Education</h3>
                                <div className={styles.educationItem}>
                                    <strong>Bachelor of Science in Computer Science</strong>
                                    <p className={styles.school}>University of Technology • 2015-2019</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button className="btn-secondary">
                                <Download size={18} /> Download PDF
                            </button>
                            <button className="btn-primary">
                                Use This Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
