import React from 'react';
import { useResume } from '@/context/ResumeContext';
import styles from './ResumePreview.module.css';

interface ResumePreviewProps {
    printRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreview({ printRef }: ResumePreviewProps) {
    const { resumeData } = useResume();
    const template = resumeData.templateSettings.template;

    // Dynamic classes based on template
    const getTemplateClass = () => {
        switch (template) {
            case 'modern': return styles.modern;
            case 'minimal': return styles.minimal;
            case 'professional': return styles.professional;
            case 'creative': return styles.creative;
            case 'executive': return styles.executive;
            default: return styles.classic;
        }
    };

    const containerStyle = {
        fontFamily: resumeData.templateSettings.fontFamily,
        '--primary-color': resumeData.templateSettings.primaryColor,
    } as React.CSSProperties;

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className={`${styles.a4Page} ${getTemplateClass()}`}
                ref={printRef}
                style={containerStyle}
            >
                <header className={styles.header}>
                    <h1 className={styles.name}>
                        {resumeData.personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div className={styles.contactInfo}>
                        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                        {resumeData.personalInfo.phone && (
                            <span>{resumeData.personalInfo.email ? ' • ' : ''}{resumeData.personalInfo.phone}</span>
                        )}
                        {resumeData.personalInfo.linkedin && (
                            <span> • <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{resumeData.personalInfo.linkedin.replace(/https?:\/\/(www\.)?/, '')}</a></span>
                        )}
                        {resumeData.personalInfo.portfolio && (
                            <span> • <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">{resumeData.personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '')}</a></span>
                        )}
                    </div>
                </header>

                {resumeData.personalInfo.summary && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Professional Summary
                        </h2>
                        <p className={styles.summary}>{resumeData.personalInfo.summary}</p>
                    </section>
                )}

                {resumeData.experience.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Experience
                        </h2>
                        {resumeData.experience.map((exp) => (
                            <div key={exp.id} className={styles.experienceItem}>
                                <div className={styles.expHeader}>
                                    <h3 className={styles.role}>{exp.role}</h3>
                                    <span className={styles.date}>
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                <div className={styles.company}>
                                    {exp.company}
                                </div>
                                <p className={styles.description}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {resumeData.education.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Education
                        </h2>
                        {resumeData.education.map((edu) => (
                            <div key={edu.id} className={styles.educationItem}>
                                <div className={styles.eduHeader}>
                                    <h3 className={styles.school}>{edu.school}</h3>
                                    <span className={styles.date}>{edu.year}</span>
                                </div>
                                <div className={styles.degree}>{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                )}

                {resumeData.projects && resumeData.projects.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Projects
                        </h2>
                        {resumeData.projects.map((proj) => (
                            <div key={proj.id} className={styles.projectItem}>
                                <div className={styles.projectHeader}>
                                    <h3 className={styles.projectTitle}>{proj.title}</h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.date}>
                                            {proj.link.replace(/https?:\/\/(www\.)?/, '')}
                                        </a>
                                    )}
                                </div>
                                <p className={styles.description}>{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {resumeData.skills.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Skills
                        </h2>
                        <div className={styles.skillsList}>
                            {resumeData.skills.join(' • ')}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

