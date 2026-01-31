'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import styles from './TemplateSelector.module.css';
import { Check, Type, Grid, Layout, Briefcase, Palette, Award } from 'lucide-react';

interface TemplateSelectorProps {
    onSelect: () => void;
}

const templates = [
    { id: 'classic', name: 'Classic', icon: <Type size={32} />, description: 'Traditional & Professional' },
    { id: 'modern', name: 'Modern', icon: <Grid size={32} />, description: 'Clean & Contemporary' },
    { id: 'minimal', name: 'Minimal', icon: <Layout size={32} />, description: 'Simple & Elegant' },
    { id: 'professional', name: 'Professional', icon: <Briefcase size={32} />, description: 'Corporate & Georgia Style' },
    { id: 'creative', name: 'Creative', icon: <Palette size={32} />, description: 'Bold & Vibrant Designs' },
    { id: 'executive', name: 'Executive', icon: <Award size={32} />, description: 'Luxury & Gold Accents' },
] as const;

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
    const { resumeData, updateTemplateSettings } = useResume();

    const handleSelect = (id: typeof templates[number]['id']) => {
        updateTemplateSettings({ template: id });
        onSelect();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>
                    Step 1: <span className="text-gradient">Select a Template</span>
                </h1>
                <p>Choose a layout that best represents your career level and industry.</p>
            </div>

            <div className={styles.grid}>
                {templates.map((tpl) => (
                    <div
                        key={tpl.id}
                        className={`${styles.card} ${resumeData.templateSettings.template === tpl.id ? styles.active : ''}`}
                        onClick={() => handleSelect(tpl.id)}
                    >
                        <div className={styles.iconWrapper}>
                            {tpl.icon}
                        </div>
                        <h3 className={styles.name}>{tpl.name}</h3>
                        <p className={styles.desc}>{tpl.description}</p>

                        <div className={styles.action}>
                            {resumeData.templateSettings.template === tpl.id ? (
                                <span className={styles.activeTag}><Check size={16} /> Selected</span>
                            ) : (
                                <button className={styles.selectBtn}>Use This Template</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.footerNote}>
                <p>Don't worry, you can always change your template later inside the builder.</p>
            </div>
        </div>
    );
}
