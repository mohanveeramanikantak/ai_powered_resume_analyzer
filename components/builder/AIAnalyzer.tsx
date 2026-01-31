'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AIAnalyzer() {
    const { resumeData } = useResume();
    const { user, decrementCredits, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleAnalyze = async () => {
        if (!isAuthenticated) {
            alert('Please log in to use AI features.');
            return;
        }

        if ((user?.credits || 0) <= 0) {
            alert('You have used all your free credits. Please upgrade to continue.');
            return;
        }

        if (!decrementCredits()) {
            return;
        }

        setLoading(true);
        setAnalysis(null);
        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData, jobDescription }),
            });
            const data = await res.json();
            setAnalysis(data);
        } catch (error) {
            console.error(error);
            alert('Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel p-6 mt-8 border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="text-secondary" />
                    AI Resume Auditing
                </h3>
                <button
                    onClick={() => setShowInput(!showInput)}
                    className="text-sm text-gray-400 hover:text-white"
                >
                    {showInput ? 'Hide Job Description' : 'Add Target Job'}
                </button>
            </div>

            {showInput && (
                <div className="mb-6 animate-fade-in">
                    <label className="block text-sm mb-2 text-gray-400">Target Job Description (for custom matching)</label>
                    <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-all min-h-[100px]"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>
            )}

            {!analysis && !loading && (
                <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">
                        Get instant feedback on your resume's ATS compatibility and receive tailored improvement suggestions using Gemini 2.5.
                    </p>
                    <button
                        onClick={handleAnalyze}
                        className="btn-primary"
                    >
                        Run AI Audit
                    </button>
                </div>
            )}

            {loading && (
                <div className="text-center py-8 flex flex-col items-center">
                    <Loader2 className="animate-spin text-primary mb-3" size={32} />
                    <p className="text-gray-300">Analyzing your resume against industry standards...</p>
                </div>
            )}

            {analysis && (
                <div className="animate-fade-in">
                    <div className="flex items-center gap-8 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Powered by Gemini AI</div>
                        </div>

                        {/* Circular Progress Bar */}
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-white/10"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 40}
                                    strokeDashoffset={2 * Math.PI * 40 * (1 - analysis.matchScore / 100)}
                                    className={`${analysis.matchScore > 80 ? 'text-green-400' :
                                        analysis.matchScore > 60 ? 'text-yellow-400' : 'text-red-400'
                                        } transition-all duration-1000 ease-out`}
                                />
                            </svg>
                            <span className="absolute text-2xl font-bold">{analysis.matchScore}%</span>
                        </div>

                        <div className="flex-1">
                            <span className="block text-sm text-gray-400 mb-1 uppercase tracking-wider font-semibold">ATS Compatibility Score</span>
                            <h4 className="text-xl font-bold text-white mb-2">{analysis.analysis?.split('.')[0]}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                                {analysis.analysis?.split('.').slice(1, 3).join('.')}.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                                <AlertCircle size={14} /> Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis.missingKeywords?.map((kw: string) => (
                                    <span key={kw} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-md">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Identified Strengths
                            </h4>
                            <ul className="space-y-2">
                                {analysis.strengths?.map((str: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                        <span className="mt-1 block w-1 h-1 rounded-full bg-green-400" />
                                        {str}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-blue-400 mb-3">Suggested Improvements</h4>
                        <ul className="space-y-3">
                            {analysis.improvements?.map((imp: string, i: number) => (
                                <li key={i} className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg text-sm text-gray-300">
                                    {imp}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
