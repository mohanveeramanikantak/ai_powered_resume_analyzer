'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import styles from '@/app/builder/builder.module.css';
import { Plus, Trash2, X, Palette } from 'lucide-react';
import AIAnalyzer from './AIAnalyzer';


export default function ResumeForm() {
    const {
        resumeData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        updateTemplateSettings
    } = useResume();

    const [skillInput, setSkillInput] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

    const generateAISummary = async () => {
        setIsGeneratingSummary(true);
        try {
            const res = await fetch('/api/generateSummary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData }),
            });
            const data = await res.json();
            if (data.summary) {
                updatePersonalInfo('summary', data.summary);
            }
        } catch (error) {
            console.error('Failed to generate summary:', error);
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const handleSkillAdd = () => {
        if (skillInput.trim()) {
            addSkill(skillInput.trim());
            setSkillInput('');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Personal Info */}
            <section className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className={styles.stepTitle}>Personal Information</h2>
                <div className="space-y-4">
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Full Name</label>
                        <input
                            className={styles.input}
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                className={styles.input}
                                value={resumeData.personalInfo.email}
                                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                className={styles.input}
                                value={resumeData.personalInfo.phone}
                                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={styles.formGroup}>
                            <label className={styles.label}>LinkedIn Profile</label>
                            <input
                                className={styles.input}
                                value={resumeData.personalInfo.linkedin}
                                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                                placeholder="linkedin.com/in/johndoe"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Portfolio / Website</label>
                            <input
                                className={styles.input}
                                value={resumeData.personalInfo.portfolio}
                                onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                                placeholder="johndoe.com"
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className="flex justify-between items-center mb-2">
                            <label className={styles.label}>Professional Summary</label>
                            <button
                                onClick={generateAISummary}
                                disabled={isGeneratingSummary}
                                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20"
                            >
                                {isGeneratingSummary ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>✨ Generate with AI</>
                                )}
                            </button>
                        </div>
                        <textarea
                            className={styles.textarea}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            placeholder="A brief overview of your career..."
                        />
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className={styles.stepTitle}>Work Experience</h2>
                        <p className="text-gray-400 text-sm">Add your professional history starting from the most recent.</p>
                    </div>
                    <button onClick={addExperience} className="btn-secondary text-sm py-2 px-4 rounded-xl flex items-center gap-2">
                        <Plus size={16} /> Add Position
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                        <div key={exp.id} className={styles.card}>
                            <button onClick={() => removeExperience(exp.id)} className={styles.deleteBtn} title="Delete">
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Job Title</label>
                                    <input
                                        className={styles.input}
                                        value={exp.role}
                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                        placeholder="Software Engineer"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Company / Organization</label>
                                    <input
                                        className={styles.input}
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                        placeholder="Google"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Start Date</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Jan 2022"
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>End Date</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Present"
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup + " !mb-0"}>
                                <label className={styles.label}>Key Responsibilities & Achievements</label>
                                <textarea
                                    className={styles.textarea}
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                    placeholder="• Led a team of 5 to develop..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className={styles.stepTitle}>Education</h2>
                        <p className="text-gray-400 text-sm">List your academic qualifications.</p>
                    </div>
                    <button onClick={addEducation} className="btn-secondary text-sm py-2 px-4 rounded-xl flex items-center gap-2">
                        <Plus size={16} /> Add Education
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                        <div key={edu.id} className={styles.card}>
                            <button onClick={() => removeEducation(edu.id)} className={styles.deleteBtn}>
                                <Trash2 size={16} />
                            </button>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>School / University</label>
                                <input
                                    className={styles.input}
                                    value={edu.school}
                                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                    placeholder="Harvard University"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Degree / Field of Study</label>
                                    <input
                                        className={styles.input}
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        placeholder="B.S. in Computer Science"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Graduation Year</label>
                                    <input
                                        className={styles.input}
                                        value={edu.year}
                                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                        placeholder="2022"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className={styles.stepTitle}>Featured Projects</h2>
                        <p className="text-gray-400 text-sm">Highlight your best work and side projects.</p>
                    </div>
                    <button onClick={addProject} className="btn-secondary text-sm py-2 px-4 rounded-xl flex items-center gap-2">
                        <Plus size={16} /> Add Project
                    </button>
                </div>

                <div className="space-y-4">
                    {resumeData.projects.map((proj) => (
                        <div key={proj.id} className={styles.card}>
                            <button onClick={() => removeProject(proj.id)} className={styles.deleteBtn}>
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Project Title</label>
                                    <input
                                        className={styles.input}
                                        value={proj.title}
                                        onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                        placeholder="E-commerce Platform"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Project Link (Optional)</label>
                                    <input
                                        className={styles.input}
                                        value={proj.link}
                                        onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                        placeholder="github.com/username/project"
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup + " !mb-0"}>
                                <label className={styles.label}>Description</label>
                                <textarea
                                    className={styles.textarea}
                                    value={proj.description}
                                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                    placeholder="Briefly describe what you built and the technologies used."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className={styles.stepTitle}>Tech Stack & Skills</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Add Skills</label>
                    <div className="flex gap-2">
                        <input
                            className={styles.input}
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                            placeholder="e.g. React, TypeScript, Python..."
                        />
                        <button onClick={handleSkillAdd} className="bg-primary text-white p-3 rounded-xl hover:opacity-90 transition-opacity">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {resumeData.skills.map((skill, index) => (
                        <div key={index} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-2 group transition-all hover:bg-primary/20">
                            <span className="text-sm font-medium">{skill}</span>
                            <button onClick={() => removeSkill(skill)} className="text-primary/60 hover:text-red-500 transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Template Settings */}
            <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <Palette size={20} className="text-primary" />
                    Appearance Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Typography</label>
                        <select
                            className={styles.select}
                            value={resumeData.templateSettings.fontFamily}
                            onChange={(e) => updateTemplateSettings({ fontFamily: e.target.value })}
                        >
                            <option value="Inter">Inter (Modern Sans)</option>
                            <option value="'Helvetica Neue'">Helvetica (Clean)</option>
                            <option value="'Times New Roman'">Times New Roman (Classic)</option>
                            <option value="Georgia">Georgia (Professional Serif)</option>
                            <option value="Montserrat">Montserrat (Bold)</option>
                            <option value="Garamond">Garamond (Elegant)</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Theme Color</label>
                        <div className="flex gap-4 items-center">
                            <div className="relative group overflow-hidden rounded-xl border border-white/10 w-14 h-12">
                                <input
                                    type="color"
                                    className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] bg-transparent border-none cursor-pointer"
                                    value={resumeData.templateSettings.primaryColor}
                                    onChange={(e) => updateTemplateSettings({ primaryColor: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                className={styles.input + " font-mono uppercase"}
                                value={resumeData.templateSettings.primaryColor}
                                onChange={(e) => updateTemplateSettings({ primaryColor: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Analysis */}
            <div className="mt-12 pt-8 border-t border-white/10">
                <AIAnalyzer />
            </div>
        </div>

    );
}
