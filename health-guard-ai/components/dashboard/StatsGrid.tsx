"use client";

import { motion } from 'framer-motion';
import { Users, Activity, AlertCircle, FileText } from 'lucide-react';

interface StatsProps {
    totalPatients: number;
    avgBmi: number;
    criticalAlerts: number;
    testsConducted: number;
}

export function StatsGrid({ totalPatients, avgBmi, criticalAlerts, testsConducted }: StatsProps) {
    const stats = [
        { label: 'Total Patients', value: totalPatients, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Avg. BMI', value: avgBmi.toFixed(1), icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Critical Alerts', value: criticalAlerts, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { label: 'Tests Conducted', value: testsConducted, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    variants={item}
                    className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                        <div className={`rounded-full p-3 ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
