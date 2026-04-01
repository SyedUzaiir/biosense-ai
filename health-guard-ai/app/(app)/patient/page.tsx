"use client";

import { useState, useMemo } from 'react';
import { Search, User } from 'lucide-react';
import { MOCK_PATIENTS, type Patient } from '@/lib/mockData';
import { PatientVitals } from '@/components/patient/PatientVitals';
import { GlucoseChart } from '@/components/patient/GlucoseChart';
import { RiskGauge } from '@/components/patient/RiskGauge';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientAnalysisPage() {
    const [query, setQuery] = useState('');
    const [patient, setPatient] = useState<Patient | null>(null);

    // Calculate Dynamic Health Score (0-100 normalized to 0-1)
    const healthScore = useMemo(() => {
        if (!patient) return 0;

        let score = 100;

        // BMI Deviation (Ideal 18.5-25) - Loose penalty
        if (patient.bmi > 25) score -= (patient.bmi - 25) * 1.5;
        if (patient.bmi < 18.5) score -= (18.5 - patient.bmi) * 1.5;

        // BP Deviation (Ideal 120/80)
        if (patient.sbp_mean > 120) score -= (patient.sbp_mean - 120) * 0.4;
        if (patient.dbp_mean > 80) score -= (patient.dbp_mean - 80) * 0.4;

        // Glucose (Ideal < 100 fasting, < 140 random) -> Taking 110 as safe base for random
        if (patient.glucose_random > 110) score -= (patient.glucose_random - 110) * 0.15;
        if (patient.glucose_random < 70) score -= (70 - patient.glucose_random) * 0.5;

        // HbA1c (Ideal < 5.7)
        if (patient.hba1c > 5.7) score -= (patient.hba1c - 5.7) * 4;

        // Age factor (slight natural decline buffer, or just ignore to keep it "health vs age-adjusted")
        // Let's keep it purely vital-based for "Current Health Status"

        // Cap
        return Math.max(0, Math.min(100, score)) / 100;
    }, [patient]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const found = MOCK_PATIENTS.find(p =>
            p.id.toLowerCase() === query.toLowerCase() ||
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        if (found) setPatient(found);
        else alert('Patient not found');
    };

    const suggestions = query.length > 1 ? MOCK_PATIENTS.filter(p =>
        !patient && (p.id.toLowerCase().includes(query.toLowerCase()) || p.name.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5) : [];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Patient Analysis</h1>
                <p className="text-slate-500">Deep dive into patient biometrics and glocuse trends.</p>

                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="relative z-10">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={e => { setQuery(e.target.value); setPatient(null); }}
                                placeholder="Search by Patient ID (e.g. PID-1001) or Name..."
                                className="w-full h-14 pl-12 pr-4 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            />
                            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-medium hover:bg-blue-700 transition">
                                Analyze
                            </button>
                        </div>
                    </form>

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20">
                            {suggestions.map(s => (
                                <div
                                    key={s.id}
                                    onClick={() => {
                                        setQuery(s.name);
                                        setPatient(s);
                                    }}
                                    className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-0"
                                >
                                    <span className="font-medium text-slate-800">{s.name}</span>
                                    <span className="text-xs text-slate-400">{s.id}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {patient ? (
                    <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* Left Column: Vitals */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                    {patient.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                                    <div className="flex gap-4 text-slate-500 text-sm mt-1">
                                        <span className="flex items-center gap-1"><User className="h-4 w-4" /> {patient.id}</span>
                                        <span>{patient.sex}, {patient.age} years</span>
                                    </div>
                                </div>
                            </div>

                            <PatientVitals patient={patient} />
                        </div>

                        {/* Right Column: Visuals */}
                        <div className="lg:col-span-1 space-y-8">
                            <RiskGauge score={healthScore} />

                            <GlucoseChart
                                patientId={patient.id}
                                baseGlucose={patient.glucose_random}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-64 flex items-center justify-center text-slate-400">
                        <p>Search for a patient to view detailed analysis.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
