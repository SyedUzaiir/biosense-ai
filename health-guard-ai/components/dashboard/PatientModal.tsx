"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Clock, FileText, Droplets, HeartPulse, Zap } from 'lucide-react';
import type { Patient } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    patient: Patient | null;
}

const METRIC_CONFIG: Record<string, { label: string; tooltip: string; max: number; unit?: string; highBad?: boolean }> = {
    bmi: { label: 'BMI', tooltip: 'Body Mass Index ratio', max: 40, unit: 'kg/m²', highBad: true },
    hba1c: { label: 'HbA1c', tooltip: 'Average blood sugar over 3 months', max: 14, unit: '%', highBad: true },
    sbp_mean_24h: { label: 'Systolic BP', tooltip: 'Arterial pressure during heartbeat', max: 200, unit: 'mmHg', highBad: true },
    dbp_mean_24h: { label: 'Diastolic BP', tooltip: 'Arterial pressure between beats', max: 120, unit: 'mmHg', highBad: true },
};

function MetricBar({ value, config }: { value: number; config: any }) {
    const percentage = Math.min((value / config.max) * 100, 100);

    let colorClass = 'bg-blue-500';
    if (config.highBad) {
        if (percentage > 80) colorClass = 'bg-red-500';
        else if (percentage > 60) colorClass = 'bg-yellow-500';
        else colorClass = 'bg-emerald-500';
    }

    return (
        <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between items-center" title={config.tooltip}>
                <span className="text-slate-500 cursor-help underline decoration-slate-300 decoration-dashed underline-offset-4">{config.label}</span>
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
                    className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    <div className="flex items-center justify-between border-b border-slate-100 p-6 bg-slate-50 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                {patient.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                                <p className="text-sm text-slate-500">ID: {patient.id} | {patient.sex} | Age: {patient.age}yrs</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-200 transition-colors">
                            <X className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between px-6 py-3 bg-indigo-50/50 border-b border-slate-100 text-xs font-medium text-slate-500 shrink-0">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Last Updated: {patient.lastUpdated || "02:45 PM"}</span>
                        <span>Psych Analysis Confidence: <span className="text-indigo-600 font-bold">{patient.emotionConfidence ?? 82}%</span></span>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-8">
                        
                        {/* Key Metrics Row */}
                        <div>
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                Key Indicators
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
                                {Object.entries(METRIC_CONFIG).map(([key, config]) => {
                                    const val = patient[key as keyof Patient];
                                    if (typeof val === 'number') {
                                        return <MetricBar key={key} value={val} config={config} />;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>

                        {/* Full Data Grids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Glucose Analysis */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Droplets className="w-4 h-4 text-indigo-500" /> Glucose Analysis
                                </h4>
                                <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
                                    <div className="flex justify-between p-3 text-sm" title="Average glucose monitored over 24 hours">
                                        <span className="text-slate-500 cursor-help underline decoration-slate-300 decoration-dashed">Mean 24h</span>
                                        <span className="font-medium text-slate-900">{patient.glucose_mean_24h} mg/dL</span>
                                    </div>
                                    <div className="flex justify-between p-3 text-sm">
                                        <span className="text-slate-500">Max 24h</span>
                                        <span className="font-medium text-slate-900">{patient.glucose_max_24h} mg/dL</span>
                                    </div>
                                    <div className="flex justify-between p-3 text-sm bg-slate-50">
                                        <span className="text-slate-500">Insulin usage (24h)</span>
                                        <span className="font-medium text-slate-900">{patient.insulin_any_24h}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vital Signs */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider">
                                    <Zap className="w-4 h-4 text-yellow-500" /> Vital Signs
                                </h4>
                                <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
                                    <div className="flex justify-between p-3 text-sm">
                                        <span className="text-slate-500">Heart Rate</span>
                                        <span className="font-medium text-slate-900">{patient.hr_mean_24h} bpm</span>
                                    </div>
                                    <div className="flex justify-between p-3 text-sm" title="Oxygen saturation level in blood">
                                        <span className="text-slate-500 cursor-help underline decoration-slate-300 decoration-dashed">SpO2 %</span>
                                        <span className="font-medium text-slate-900">{patient.spo2_mean_24h}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 text-sm">
                                        <span className="text-slate-500">Core Temp</span>
                                        <span className="font-medium text-slate-900">{patient.temp_mean_24h}°C</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Risk Flags */}
                        <div className="pt-2">
                            <h4 className="font-semibold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider mb-3">
                                <HeartPulse className="w-4 h-4 text-red-500" /> Risk Flags
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-2 shadow-sm">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Hypoglycemia 24h</span>
                                    <span className={cn("text-lg font-bold", patient.hypo_events_24h > 0 ? "text-red-600" : "text-emerald-600")}>
                                        {patient.hypo_events_24h > 0 ? `${patient.hypo_events_24h} Events` : 'None'}
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-2 shadow-sm">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Hyperglycemia 24h</span>
                                    <span className={cn("text-lg font-bold", patient.hyper_events_24h > 0 ? "text-red-600" : "text-emerald-600")}>
                                        {patient.hyper_events_24h > 0 ? `${patient.hyper_events_24h} Events` : 'None'}
                                    </span>
                                </div>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-2 shadow-sm">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">HTN History</span>
                                    <span className={cn("text-lg font-bold", patient.history_htn === 'Yes' ? "text-orange-600" : "text-slate-600")}>
                                        {patient.history_htn === 'Yes' ? 'Confirmed' : 'Negative'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
