"use client";

import { Bell, ChevronDown, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopNav() {
    return (
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-8 backdrop-blur-md">
            <div className="text-sm font-medium text-slate-500">
                {/* Breadcrumbs or Date could go here */}
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-900">Dr. A. Raheem</p>
                        <p className="text-xs text-slate-500">Cardiologist</p>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-blue-100 transition-all">
                            <User className="h-5 w-5" />
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                    </div>
                </div>
            </div>
        </header>
    );
}
