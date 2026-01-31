'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ResumeData = {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        linkedin: string;
        portfolio: string;
        summary: string;
    };
    experience: Array<{
        id: string;
        company: string;
        role: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    education: Array<{
        id: string;
        school: string;
        degree: string;
        year: string;
    }>;
    skills: string[];
    projects: Array<{
        id: string;
        title: string;
        link: string;
        description: string;
    }>;
    templateSettings: {
        fontFamily: string;
        primaryColor: string;
        template: 'classic' | 'modern' | 'minimal' | 'professional' | 'creative' | 'executive';
    };
};

const initialData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    templateSettings: {
        fontFamily: 'Inter',
        primaryColor: '#6366f1',
        template: 'classic',
    },
};

type ResumeContextType = {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    updatePersonalInfo: (field: string, value: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, field: string, value: string) => void;
    removeExperience: (id: string) => void;
    addEducation: () => void;
    updateEducation: (id: string, field: string, value: string) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
    addProject: () => void;
    updateProject: (id: string, field: string, value: string) => void;
    removeProject: (id: string) => void;
    updateTemplateSettings: (settings: Partial<ResumeData['templateSettings']>) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialData);

    const updatePersonalInfo = (field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
        }));
    };

    const addExperience = () => {
        setResumeData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: crypto.randomUUID(),
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
        }));
    };

    const updateExperience = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }));
    };

    // Education helpers
    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { id: crypto.randomUUID(), school: '', degree: '', year: '' },
            ],
        }));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    const addSkill = (skill: string) => {
        if (!resumeData.skills.includes(skill)) {
            setResumeData((prev) => ({
                ...prev,
                skills: [...prev.skills, skill],
            }));
        }
    };

    const removeSkill = (skill: string) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const addProject = () => {
        setResumeData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                { id: crypto.randomUUID(), title: '', link: '', description: '' },
            ],
        }));
    };

    const updateProject = (id: string, field: string, value: string) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            ),
        }));
    };

    const removeProject = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.filter((p) => p.id !== id),
        }));
    };

    const updateTemplateSettings = (settings: Partial<ResumeData['templateSettings']>) => {
        setResumeData((prev) => ({
            ...prev,
            templateSettings: { ...prev.templateSettings, ...settings },
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                setResumeData,
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
                updateTemplateSettings,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}
