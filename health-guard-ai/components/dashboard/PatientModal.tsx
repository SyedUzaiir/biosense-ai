"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity } from 'lucide-react';
import type { Patient } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient: Patient | null;
}

const METRIC_CONFIG: Record<string, { label: string; max: number; unit?: string; highBad?: boolean }> = {
    bmi: { label: 'BMI', max: 40, unit: 'kg/m²', highBad: true },
    hba1c: { label: 'HbA1c', max: 14, unit: '%', highBad: true },
    glucose_random: { label: 'Random Glucose', max: 250, unit: 'mg/dL', highBad: true },
    insulin_avg: { label: 'Avg Insulin', max: 50, unit: 'µU/mL', highBad: false },
    sbp_mean: { label: 'Systolic BP', max: 200, unit: 'mmHg', highBad: true },
    dbp_mean: { label: 'Diastolic BP', max: 120, unit: 'mmHg', highBad: true },
    hr_mean: { label: 'Heart Rate', max: 150, unit: 'bpm', highBad: true },
    spo2_mean: { label: 'SpO2', max: 100, unit: '%', highBad: false }, // Low is bad
    temp_mean: { label: 'Temperature', max: 42, unit: '°C', highBad: true },
};

function MetricBar({ value, config }: { value: number; config: any }) {
    const percentage = Math.min((value / config.max) * 100, 100);

    // Color logic
    let colorClass = 'bg-blue-500';
    if (config.highBad) {
        if (percentage > 80) colorClass = 'bg-red-500';
        else if (percentage > 60) colorClass = 'bg-yellow-500';
        else colorClass = 'bg-emerald-500';
    } else {
        // For SpO2, high is good
        if (percentage < 90) colorClass = 'bg-red-500';
        else if (percentage < 95) colorClass = 'bg-yellow-500';
        else colorClass = 'bg-emerald-500';
    }

    return (
        <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
                <span className="text-slate-500">{config.label}</span>
                <span className="font-medium text-slate-900">{value} <span className="text-xs text-slate-400">{config.unit}</span></span>
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

export function PatientModal({ isOpen, onClose, patient }: PatientModalProps) {
    if (!isOpen || !patient) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex items-center justify-between border-b border-slate-100 p-6 bg-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                {patient.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                                <p className="text-sm text-slate-500">ID: {patient.id} | {patient.sex} | Age: {patient.age}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-200 transition-colors">
                            <X className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                Key Metrics
                            </h3>
                        </div>

                        {Object.entries(METRIC_CONFIG).map(([key, config]) => {
                            const val = patient[key as keyof Patient];
                            if (typeof val === 'number') {
                                return <MetricBar key={key} value={val} config={config} />;
                            }
                            return null;
                        })}

                        {/* Booleans */}
                        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 mt-2">
                            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                <span className="text-sm text-slate-600">Hypoglycemia Risk</span>
                                <span className={cn("px-2 py-1 rounded text-xs font-bold", patient.hypoglycemia ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700")}>
                                    {patient.hypoglycemia ? 'DETECTED' : 'NORMAL'}
                                </span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                <span className="text-sm text-slate-600">Hyperglycemia Risk</span>
                                <span className={cn("px-2 py-1 rounded text-xs font-bold", patient.hyperglycemia ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700")}>
                                    {patient.hyperglycemia ? 'DETECTED' : 'NORMAL'}
                                </span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                                <span className="text-sm text-slate-600">History of HTN</span>
                                <span className={cn("px-2 py-1 rounded text-xs font-bold", patient.history_htn ? "bg-orange-100 text-orange-700" : "bg-slate-200 text-slate-700")}>
                                    {patient.history_htn ? 'YES' : 'NO'}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
