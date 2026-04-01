"use client";

import { useMemo } from 'react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { PatientTable } from '@/components/dashboard/PatientTable';
import { MOCK_PATIENTS } from '@/lib/mockData';

export default function DashboardPage() {
    const stats = useMemo(() => {
        const total = MOCK_PATIENTS.length;
        const avgBmi = MOCK_PATIENTS.reduce((sum, p) => sum + p.bmi, 0) / total;
        const critical = MOCK_PATIENTS.filter(p => p.hypoglycemia || p.hyperglycemia || p.sbp_mean > 140 || p.sbp_mean < 90 || p.bmi > 35).length;
        const tests = total * 6; // Mock calculation

        return {
            totalPatients: total,
            avgBmi,
            criticalAlerts: critical,
            testsConducted: tests
        };
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="mt-1 text-slate-500">Monitor patient health metrics and critical alerts.</p>
            </div>

            <StatsGrid
                totalPatients={stats.totalPatients}
                avgBmi={stats.avgBmi}
                criticalAlerts={stats.criticalAlerts}
                testsConducted={stats.testsConducted}
            />

            <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Patient Registry</h2>
                <PatientTable />
            </div>
        </div>
    );
}
