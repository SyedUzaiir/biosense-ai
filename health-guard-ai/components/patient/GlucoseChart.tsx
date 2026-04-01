"use client";

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface GlucoseChartProps {
    patientId: string;
    baseGlucose: number; // e.g., 90-150
}

export function GlucoseChart({ patientId, baseGlucose }: GlucoseChartProps) {
    const data = useMemo(() => {
        const points = [];
        const seed = parseInt(patientId.replace(/\D/g, '')) || 0;

        for (let h = 0; h < 24; h++) {
            // Create a diurnal pattern with random noise based on patient ID
            // Meals at 8, 13, 19
            let mealSpike = 0;
            if ((h >= 8 && h <= 10) || (h >= 13 && h <= 15) || (h >= 19 && h <= 21)) {
                mealSpike = 40 + (seed % 30);
            }

            const noise = Math.sin(h * 0.5 + seed) * 10 + (Math.random() * 5);
            const value = Math.max(70, Math.min(300, baseGlucose + mealSpike + noise));

            points.push({
                time: `${h.toString().padStart(2, '0')}:00`,
                value: Math.round(value),
            });
        }
        return points;
    }, [patientId, baseGlucose]);

    return (
        <div className="h-[300px] w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Glucose Curve (24h)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293b' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGlucose)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
