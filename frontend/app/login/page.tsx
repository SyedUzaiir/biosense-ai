"use client";

import Image from 'next/image';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, HeartPulse, UserCircle, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_PATIENTS } from '@/lib/mockData';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'doctor' | 'patient'>('doctor');
  
  // Doctor Auth state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Patient Auth state
  const [patientId, setPatientId] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (role === 'doctor') {
        if (username.toLowerCase() === 'dr john' && password === '1234') {
          localStorage.setItem('healthguard_token', 'demo-token-doc-123');
          localStorage.setItem('healthguard_role', 'doctor');
          localStorage.setItem('healthguard_doctor_name', 'Dr. John Cena');
          toast.success('Welcome back, Dr. John Cena');
          router.push('/dashboard');
        } else {
          toast.error('Invalid doctor credentials');
          setLoading(false);
        }
      } else {
        // Patient role login
        const pid = patientId.trim();
        const pwd = patientPassword.trim();
        const isValidPatient = MOCK_PATIENTS.find(p => p.id === pid);
        
        if (isValidPatient && pid === pwd) {
          localStorage.setItem('healthguard_token', `demo-token-pat-${pid}`);
          localStorage.setItem('healthguard_role', 'patient');
          localStorage.setItem('loggedInPatient', pid); // Requirement: save loggedInPatient
          toast.success(`Welcome, ${isValidPatient.name}`);
          router.push('/patient-dashboard');
        } else {
          toast.error('Invalid Patient ID or Password.');
          setLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 gap-4">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors self-center"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to home
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="bg-white border-b border-slate-100 px-8 pt-8 pb-6 text-center">
          <div className="flex justify-center mb-2">
            <Image src="/logo.png" alt="BioSense AI" width={180} height={48} className="h-12 w-auto object-contain" priority />
          </div>
          <p className="text-sm text-slate-400">Clinical Intelligence Platform</p>
        </div>

        <div className="p-8 pb-4">
          <div className="flex rounded-lg bg-slate-100 p-1 mb-8">
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
                role === 'doctor' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Doctor Access
            </button>
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-all ${
                role === 'patient' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Patient Portal
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {role === 'doctor' ? (
                <motion.div
                  key="doctor-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Username</label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UserCircle className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                        placeholder="Dr John"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="patient-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Patient ID</label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <UserCircle className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={patientId}
                          onChange={(e) => setPatientId(e.target.value)}
                          className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                          placeholder="e.g. PID-1001"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Password</label>
                      <div className="relative mt-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="password"
                          required
                          value={patientPassword}
                          onChange={(e) => setPatientPassword(e.target.value)}
                          className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-sm"
                          placeholder="••••••••"
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Your password is your assigned Patient ID.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>

        {role === 'doctor' && (
          <div className="bg-slate-50 p-4 text-center text-xs text-slate-500 border-t border-slate-100">
            <p className="font-medium text-slate-600 mb-1">Demo Credentials:</p>
            <p>Username: Dr john / Password: 1234</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
