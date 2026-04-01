"use client";

import dynamic from 'next/dynamic';
// Import dynamically to avoid SSR issues with some chart libs, though react-gauge-chart might be fine.
// Using legacy import style if needed, but try default.
const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

interface RiskGaugeProps {
    score: number; // 0 to 1 (1 is bad risk? or Health Score? Prompt: "Health Score")
    // Prompt says "Health Speedometer... Health Score". usually 100 is good.
    // But Speedometer usually: Green (Low Risk) -> Red (High Risk).
    // "Health Score": usually High is Good.
    // Let's assume High Score = Good Health = Green.
    // react-gauge-chart: percent 0 to 1. 
    // colors: ["#FFF", "#000"] etc.
    // Default is Red -> Yellow -> Green? No, default is Green -> Yellow -> Red?
    // Actually default colors are usually R-Y-G is usually "levels".
    // If I want "Health Score", 100 is Green.
    // So 0 (Red) -> 1 (Green).
}

export function RiskGauge({ score }: RiskGaugeProps) {
    // Score 0.0 to 1.0. 1.0 = Perfect Health.
    // GaugeChart default: 
    // nrOfLevels: 3
    // colors: ["#EA4228", "#F5CD19", "#5BE12C"] (Red, Yellow, Green).
    // This matches 0->1 where 1 is Green.

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Overall Health Score</h3>
            <div className="w-full max-w-[300px]">
                <GaugeChart
                    id="gauge-chart1"
                    nrOfLevels={3}
                    percent={score}
                    colors={["#ef4444", "#eab308", "#22c55e"]}
                    arcWidth={0.3}
                    textColor="#1e293b"
                    needleColor="#94a3b8"
                    needleBaseColor="#94a3b8"
                    formatTextValue={(val: string) => `${val}%`}
                />
            </div>
            <p className="text-sm text-slate-500 mt-2 text-center">
                Based on BMI, Glucose, and BP readings.
            </p>
        </div>
    );
}
