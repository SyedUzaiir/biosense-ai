"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Activity, FileText, Settings, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Patient Analysis', href: '/patient', icon: Activity },
    { label: 'Diagnostic Tool', href: '/checker', icon: HeartPulse },
    // { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm md:flex fixed left-0 top-0 z-30">
            <div className="flex h-16 items-center justify-center border-b border-slate-100 px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
                    <HeartPulse className="h-8 w-8 text-blue-500" />
                    <span>HealthGuard AI</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-6">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {item.label}
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute left-0 h-8 w-1 rounded-r-md bg-blue-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>


        </aside>
    );
}
