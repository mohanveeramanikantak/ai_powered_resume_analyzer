'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    React.useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-panel p-12 max-w-lg text-center">
                <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-400 mb-2">
                    {error.message || 'An unexpected error occurred'}
                </p>
                {error.digest && (
                    <p className="text-xs text-gray-500 mb-8">Error ID: {error.digest}</p>
                )}
                <button onClick={reset} className="btn-primary">
                    Try Again
                </button>
            </div>
        </div>
    );
}
