"use client";

import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { motion } from 'framer-motion';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Sidebar />
            <main className="ml-64 min-h-screen">
                <TopNav />
                <div className="p-8">
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
