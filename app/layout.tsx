import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resume Analyzer Platform | AI Consultant',
  description: 'AI-Powered Resume Analysis & Optimization',
};

import { ResumeProvider } from '@/context/ResumeContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ResumeProvider>
            {children}
          </ResumeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
