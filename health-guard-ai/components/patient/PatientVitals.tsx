"use client";

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { Patient } from '@/lib/mockData';
import { cn } from '@/lib/utils';

// Reordered to place Diabetes between BP and Glucose as requested
const METRIC_CONFIG: Record<string, { label: string; max?: number; unit?: string; highBad?: boolean; type?: 'text' }> = {
    sbp_mean: { label: 'Systolic BP', max: 200, unit: 'mmHg', highBad: true },
    dbp_mean: { label: 'Diastolic BP', max: 120, unit: 'mmHg', highBad: true },
    diabetesStatus: { label: 'Diabetes Status', type: 'text' },
    glucose_random: { label: 'Random Glucose', max: 250, unit: 'mg/dL', highBad: true },
    hba1c: { label: 'HbA1c', max: 14, unit: '%', highBad: true },
    bmi: { label: 'BMI', max: 40, unit: 'kg/m²', highBad: true },
    insulin_avg: { label: 'Avg Insulin', max: 50, unit: 'µU/mL', highBad: false },
    hr_mean: { label: 'Heart Rate', max: 150, unit: 'bpm', highBad: true },
    spo2_mean: { label: 'SpO2', max: 100, unit: '%', highBad: false },
    temp_mean: { label: 'Temperature', max: 42, unit: '°C', highBad: true },
};

function MetricBar({ value, config }: { value: number | string; config: any }) {
    if (config.type === 'text') {
        return (
            <div className="flex flex-col gap-1 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-slate-500 text-xs uppercase tracking-wider">{config.label}</span>
                <span className={cn("font-bold text-lg", value === 'None' ? 'text-emerald-600' : 'text-red-600')}>
                    {value}
                </span>
            </div>
        );
    }

    // Ensure value is number for bar
    const numVal = value as number;
    const percentage = Math.min((numVal / config.max) * 100, 100);

    // Color logic
    let colorClass = 'bg-blue-500';
    if (config.highBad) {
        if (percentage > 80) colorClass = 'bg-red-500';
        else if (percentage > 60) colorClass = 'bg-yellow-500';
        else colorClass = 'bg-emerald-500';
    } else {
        if (percentage < 90) colorClass = 'bg-red-500';
        else if (percentage < 95) colorClass = 'bg-yellow-500';
        else colorClass = 'bg-emerald-500';
    }

    return (
        <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
                <span className="text-slate-500">{config.label}</span>
                <span className="font-medium text-slate-900">{numVal} <span className="text-xs text-slate-400">{config.unit}</span></span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={cn("h-full rounded-full", colorClass)}
                />
            </div>
        </div>
    );
}

export function PatientVitals({ patient }: { patient: Patient }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Detailed Biometrics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {Object.entries(METRIC_CONFIG).map(([key, config]) => {
                    const val = patient[key as keyof Patient];
                    if (typeof val === 'string' || typeof val === 'number') {
                        return <MetricBar key={key} value={val} config={config} />;
                    }
                    return null;
                })}
            </div>

            {/* Booleans */}
            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-100 pt-6">
                <div className="p-3 bg-slate-50 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Hypoglycemia</span>
                    <span className={cn("text-sm font-bold", patient.hypoglycemia ? "text-red-600" : "text-emerald-600")}>
                        {patient.hypoglycemia ? 'DETECTED' : 'NEGATIVE'}
                    </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Hyperglycemia</span>
                    <span className={cn("text-sm font-bold", patient.hyperglycemia ? "text-red-600" : "text-emerald-600")}>
                        {patient.hyperglycemia ? 'DETECTED' : 'NEGATIVE'}
                    </span>
                </div>
            </div>
        </div>
    );
}
