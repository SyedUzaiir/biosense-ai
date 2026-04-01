"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { motion } from 'framer-motion';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const currentRole = localStorage.getItem('healthguard_role');
        setRole(currentRole);

        // Security logic
        if (!currentRole) {
            router.replace('/login');
            return;
        }

        // Restrict patient to /patient-dashboard
        if (currentRole === 'patient' && pathname !== '/patient-dashboard') {
            router.replace('/patient-dashboard');
            return;
        }
        // Restrict doctor from patient dash
        if (currentRole === 'doctor' && pathname === '/patient-dashboard') {
            router.replace('/dashboard');
            return;
        }

        setIsAuthorized(true);
    }, [pathname, router]);

    if (!isAuthorized) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Verifying access...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {role === 'doctor' && <Sidebar />}
            
            <main className={`${role === 'doctor' ? 'md:ml-64' : ''} min-h-screen flex flex-col`}>
                <TopNav />
                <div className="p-4 md:p-8 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
