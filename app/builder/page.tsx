'use client';

import { useRef, useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResumeForm from '@/components/builder/ResumeForm';
import ResumePreview from '@/components/builder/ResumePreview';
import { useResume } from '@/context/ResumeContext';
import styles from './builder.module.css';
import TemplateSelector from '@/components/builder/TemplateSelector';
import { Save, Check, ChevronLeft, Download, Type, Grid, Layout, Briefcase, Palette, Award } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function BuilderPage() {
    const { resumeData, updateTemplateSettings } = useResume();
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [step, setStep] = useState<'template' | 'editor'>('template');
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const [scale, setScale] = useState(1);
    const resumeRef = useRef<HTMLDivElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: resumeRef,
        documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}_CV`,
    });

    const currentTemplate = resumeData.templateSettings.template;

    // Handle scaling the A4 preview
    useEffect(() => {
        const updateScale = () => {
            if (previewContainerRef.current) {
                const containerWidth = previewContainerRef.current.offsetWidth - 80; // padding
                const a4Width = 794; // 210mm in pixels (approx at 96dpi)
                const newScale = containerWidth / a4Width;
                setScale(Math.min(newScale, 1.1)); // Don't scale up too much
            }
        };

        const observer = new ResizeObserver(updateScale);
        if (previewContainerRef.current) observer.observe(previewContainerRef.current);
        updateScale();

        return () => observer.disconnect();
    }, [step, showMobilePreview]);

    // Auto-save functionality every 10 seconds
    useEffect(() => {
        if (step !== 'editor') return;

        const autoSave = setInterval(() => {
            if (resumeData.personalInfo.fullName || resumeData.experience.length > 0) {
                setSaveStatus('saving');
                localStorage.setItem('resume_autosave', JSON.stringify(resumeData));
                setTimeout(() => setSaveStatus('saved'), 500);
            }
        }, 10000);

        return () => clearInterval(autoSave);
    }, [resumeData, step]);

    return (
        <div className={styles.builderPage}>
            <Navbar />

            {step === 'template' ? (
                <TemplateSelector onSelect={() => setStep('editor')} />
            ) : (
                <>
                    <header className={styles.editorTopBar}>
                        <div className={styles.editorTopBarInner}>
                            <div className={styles.editorTopBarLeft}>
                                <button
                                    onClick={() => setStep('template')}
                                    className={styles.backBtn}
                                >
                                    <ChevronLeft size={18} />
                                    <span className="hidden sm:inline">Change Template</span>
                                    <span className="sm:hidden">Back</span>
                                </button>
                                <div className={styles.templateSwitcher}>
                                    {[
                                        { id: 'classic', icon: Type, name: 'Classic' },
                                        { id: 'modern', icon: Grid, name: 'Modern' },
                                        { id: 'minimal', icon: Layout, name: 'Minimal' },
                                        { id: 'professional', icon: Briefcase, name: 'Professional' },
                                        { id: 'creative', icon: Palette, name: 'Creative' },
                                        { id: 'executive', icon: Award, name: 'Executive' },
                                    ].map((tpl) => (
                                        <button
                                            key={tpl.id}
                                            type="button"
                                            onClick={() => updateTemplateSettings({ template: tpl.id as any })}
                                            className={`${styles.templateSwitcherBtn} ${currentTemplate === tpl.id ? styles.templateSwitcherBtnActive : ''}`}
                                            title={tpl.name}
                                        >
                                            <tpl.icon size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.editorTopBarRight}>
                                <div className={styles.saveStatus}>
                                    {saveStatus === 'saving' && (
                                        <div className={styles.statusBadge}>
                                            <Save size={14} className="animate-pulse text-primary" />
                                            <span className="hidden sm:inline">Saving...</span>
                                        </div>
                                    )}
                                    {saveStatus === 'saved' && (
                                        <div className={`${styles.statusBadge} ${styles.saved}`}>
                                            <Check size={14} />
                                            <span className="hidden sm:inline">Saved</span>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => handlePrint()} className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-2 rounded-xl">
                                    <Download size={15} />
                                    <span className="hidden sm:inline">Download PDF</span>
                                    <span className="sm:hidden">PDF</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className={styles.pageContainer}>
                        <div className={styles.editorSection}>
                            <ResumeForm />
                        </div>
                        <div
                            ref={previewContainerRef}
                            className={`${styles.previewSection} ${showMobilePreview ? styles.active : ''}`}
                        >
                            <div
                                className={styles.previewContent}
                                style={{ transform: `scale(${scale})` }}
                            >
                                <ResumePreview printRef={resumeRef} />
                            </div>
                        </div>
                    </main>

                    <button
                        type="button"
                        className={styles.mobileViewToggle}
                        onClick={() => setShowMobilePreview(!showMobilePreview)}
                        aria-label={showMobilePreview ? 'Edit resume' : 'View preview'}
                    >
                        {showMobilePreview ? (
                            <><Type size={18} /> Edit Resume</>
                        ) : (
                            <><Layout size={18} /> View Preview</>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}


