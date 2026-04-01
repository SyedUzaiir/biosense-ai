"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Activity, Brain, Shield, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">HealthGuard AI</span>
            </div>
            <div>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Login Platform
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl space-y-3">
              <span className="block">Next-Generation</span>
              <span className="block text-blue-600">Clinical Intelligence</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-500">
              A comprehensive health monitoring system combining advanced diabetes prediction with cutting-edge emotional state tracking using deep multi-modal AI models.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link 
                href="/login" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600"></span>
                <span className="relative flex items-center gap-2">
                  Access Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 inset-x-0 h-screen flex justify-center overflow-hidden pointer-events-none -z-10">
          <div className="w-[1080px] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50/0 to-slate-50/0"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Core Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A Unified Healthcare Approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
            >
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Diabetes Prediction</h3>
              <p className="text-slate-600">Early-stage risk assessment using comprehensive metabolic data to predict and manage diabetes proactively.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
            >
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Emotion Detection</h3>
              <p className="text-slate-600">Integrated computer vision analyzing patient facial markers to assess stress, anxiety, and overall mental wellbeing.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100"
            >
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Role Security</h3>
              <p className="text-slate-600">Secure, partitioned access ensuring doctors monitor holistic patient portfolios while patients access their private metrics.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Creators</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Meet the Team
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarasam Chinmaee Reddy', role: 'AI Architect' },
              { name: 'Syed Uzair Mohiuddin', role: 'Frontend Engineer' },
              { name: 'Manohar Yadav Boddu', role: 'Data Scientist' },
            ].map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center"
              >
                <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400">
        <p>© 2026 HealthGuard AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
