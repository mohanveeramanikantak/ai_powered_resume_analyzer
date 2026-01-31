'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
    username: string;
    email: string;
    credits: number;
};

type AuthContextType = {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    register: (username: string, email: string) => void;
    isAuthenticated: boolean;
    decrementCredits: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for session
        const storedUser = localStorage.getItem('ag_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string) => {
        // In a real app, verify password. Here, we simulate fetching user by email
        // For this demo, we'll just mock a successful login if we find them in "local DB"
        // But since we are client-side only for this step, we'll try to find them in LS "users_db"

        const usersDb = localStorage.getItem('ag_users_db');
        if (usersDb) {
            const users = JSON.parse(usersDb);
            const found = users.find((u: any) => u.email === email);
            if (found) {
                setUser(found);
                localStorage.setItem('ag_user', JSON.stringify(found));
                router.push('/'); // Redirect to home after login
            } else {
                alert('User not found');
            }
        } else {
            alert('No users registered');
        }
    };

    const register = (username: string, email: string) => {
        const newUser = { username, email, credits: 3 };

        // Save to "DB"
        const usersDb = localStorage.getItem('ag_users_db');
        let users = usersDb ? JSON.parse(usersDb) : [];

        // Check if exists
        if (users.find((u: any) => u.email === email)) {
            alert('User already exists');
            return;
        }

        users.push(newUser);
        localStorage.setItem('ag_users_db', JSON.stringify(users));

        // Login user
        setUser(newUser);
        localStorage.setItem('ag_user', JSON.stringify(newUser));
        router.push('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ag_user');
        router.push('/');
    };

    const decrementCredits = () => {
        if (!user) return false;
        if (user.credits > 0) {
            const updatedUser = { ...user, credits: user.credits - 1 };
            setUser(updatedUser);
            localStorage.setItem('ag_user', JSON.stringify(updatedUser));

            // Update DB
            const usersDb = localStorage.getItem('ag_users_db');
            if (usersDb) {
                const users = JSON.parse(usersDb);
                const idx = users.findIndex((u: any) => u.email === user.email);
                if (idx !== -1) {
                    users[idx] = updatedUser;
                    localStorage.setItem('ag_users_db', JSON.stringify(users));
                }
            }
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            register,
            isAuthenticated: !!user,
            decrementCredits
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
