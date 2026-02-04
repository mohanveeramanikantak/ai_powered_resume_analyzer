'use client';

import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-panel p-12 max-w-lg text-center">
                <AlertCircle className="w-20 h-20 text-primary mx-auto mb-6" />
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-400 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/" className="btn-primary inline-flex">
                    <Home size={20} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
