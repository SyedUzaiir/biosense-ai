"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, Save, AlertTriangle } from 'lucide-react';
import { RiskGauge } from '@/components/patient/RiskGauge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';

interface FormData {
    age: number;
    sex: string;
    bmi: number;
    hba1c: number;
    glucose_random: number;
    sbp_mean: number;
    dbp_mean: number;
    hr_mean: number;
    spo2_mean: number;
    temp_mean: number;
    insulin_avg: number;
    history_htn: boolean;
    hypoglycemia: boolean;
    hyperglycemia: boolean;
}

const INITIAL_DATA: FormData = {
    age: 45, sex: 'Male', bmi: 24.5, hba1c: 5.5, glucose_random: 95,
    sbp_mean: 120, dbp_mean: 80, hr_mean: 72, spo2_mean: 98, temp_mean: 36.6,
    insulin_avg: 12, history_htn: false, hypoglycemia: false, hyperglycemia: false
};

const FIELDS = [
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'sex', label: 'Sex', type: 'select', options: ['Male', 'Female'] },
    { name: 'bmi', label: 'BMI', type: 'number' },
    { name: 'hba1c', label: 'HbA1c', type: 'number' },
    { name: 'glucose_random', label: 'Glucose (Random)', type: 'number' },
    { name: 'insulin_avg', label: 'Insulin Avg', type: 'number' },
    { name: 'sbp_mean', label: 'Systolic BP', type: 'number' },
    { name: 'dbp_mean', label: 'Diastolic BP', type: 'number' },
    { name: 'hr_mean', label: 'Heart Rate', type: 'number' },
    { name: 'spo2_mean', label: 'SpO2', type: 'number' },
    { name: 'temp_mean', label: 'Temperature', type: 'number' },
];

export default function CheckerPage() {
    const [form, setForm] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value)
        }));
    };

    const handleAnalyze = () => {
        setLoading(true);
        setResult(null);
        setTimeout(() => {
            // Mock ML Logic
            // Mock ML Logic - Randomized as requested
            // Generates a random integer between 1 and 99
            const score = Math.floor(Math.random() * 99) + 1;

            let prediction = "Healthy / Low Risk";
            if (score < 40) prediction = "High Risk of Type 2 Diabetes";
            else if (score < 70) prediction = "Pre-Diabetic Warning";

            const chartData = [
                { name: 'Your BMI', value: form.bmi, standard: 22 },
                { name: 'Your HbA1c', value: form.hba1c, standard: 5.0 },
                { name: 'Your Glucose', value: form.glucose_random / 20, standard: 5.0 }, // Scaled
            ];

            setResult({ score, prediction, chartData });
            setLoading(false);
        }, 1500);
    };

    const handleAddToDataset = () => {
        toast.success("Successfully added patient data to the global dataset.");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Diagnostic Check</h1>
                <p className="text-slate-500">Enter patient vitals to simulate ML-based health prediction.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                >
                    <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        Vitals Input
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {FIELDS.map(field => (
                            <div key={field.name} className={field.name === 'sex' ? 'col-span-2' : 'col-span-1'}>
                                <label className="block text-xs font-medium text-slate-500 mb-1">{field.label}</label>
                                {field.type === 'select' ? (
                                    <select
                                        name={field.name}
                                        value={(form as any)[field.name]}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-blue-500"
                                    >
                                        {(field.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        type="number"
                                        name={field.name}
                                        value={(form as any)[field.name]}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="col-span-2 flex gap-4 mt-2">
                            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                <input type="checkbox" name="history_htn" checked={form.history_htn} onChange={handleChange} className="rounded text-blue-600" />
                                History of HTN
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                <input type="checkbox" name="hypoglycemia" checked={form.hypoglycemia} onChange={handleChange} className="rounded text-blue-600" />
                                Hypoglycemia
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="mt-8 w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? 'Analyzing...' : <>Run Diagnosis <ArrowRight className="h-5 w-5" /></>}
                    </button>
                </motion.div>

                {/* Results */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

                                <h3 className="font-bold text-xl text-slate-900 mb-4">Analysis Result</h3>

                                <div className="mb-6 flex flex-col items-center">
                                    <RiskGauge score={result.score / 100} />
                                    <p className="mt-4 text-lg font-bold text-slate-800">{result.prediction}</p>
                                </div>

                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={result.chartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" fontSize={10} />
                                            <YAxis hide />
                                            <Tooltip cursor={{ fill: 'transparent' }} />
                                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                                {result.chartData.map((entry: any, index: number) => (
                                                    <Cell key={`cell-${index}`} fill={entry.value > entry.standard * 1.5 ? '#ef4444' : '#3b82f6'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <p className="text-center text-xs text-slate-400 mt-2">Value Comparison (Red = Abnormal)</p>
                                </div>

                                <button
                                    onClick={handleAddToDataset}
                                    className="mt-6 w-full border border-slate-200 text-slate-600 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
                                >
                                    <Save className="h-4 w-4" /> Add to Global Dataset
                                </button>
                            </motion.div>
                        )}

                        {!result && !loading && (
                            <div className="h-full bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-8 text-center text-slate-400">
                                <div>
                                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Fill out the form and click "Run Diagnosis" to see ML predictions.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
