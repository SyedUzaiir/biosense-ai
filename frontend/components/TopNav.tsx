"use client";

import { useEffect, useState } from 'react';
import { Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_PATIENTS } from '@/lib/mockData';

export function TopNav() {
    const router = useRouter();
    const [name, setName] = useState('Dr. John Cena');
    const [roleLabel, setRoleLabel] = useState('Senior Physician');

    useEffect(() => {
        const role = localStorage.getItem('healthguard_role');
        if (role === 'patient') {
            const pid = localStorage.getItem('loggedInPatient');
            const pat = MOCK_PATIENTS.find(p => p.id === pid);
            if (pat) {
                setName(pat.name);
            }
            setRoleLabel('Patient');
        } else if (role === 'doctor') {
            const docName = localStorage.getItem('healthguard_doctor_name');
            if (docName) {
                setName(docName);
            }
            setRoleLabel('Senior Physician');
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 backdrop-blur-md">
            <div className="text-sm font-medium text-slate-500 hidden sm:block">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            <div className="flex-1 sm:hidden"></div> {/* Spacer for mobile */}

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-900">{name}</p>
                        <p className="text-xs text-slate-500">{roleLabel}</p>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-blue-100 transition-all">
                            <User className="h-5 w-5" />
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                    title="Sign Out"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
