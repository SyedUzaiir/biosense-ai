"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, Brain, Shield, Github, Linkedin, Star, Check } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Syed Uzair Mohiuddin',
    role: 'Full Stack & AI Engineer',
    desc: 'Built the frontend architecture, FastAPI backend integration, deployment pipeline, and multimodal AI inference workflow.',
    initials: 'SU',
    gradient: 'from-blue-500 to-indigo-600',
    github: 'https://github.com/SyedUzaiir',
    linkedin: '#'
  },
  {
    name: 'Sarasam Chinmaee Reddy',
    role: 'AI Architect',
    desc: 'Designed the clinical AI workflow, multimodal system architecture, ML integration strategy, and project planning.',
    initials: 'SC',
    gradient: 'from-purple-500 to-indigo-600',
    github: '#',
    linkedin: '#'
  },
  {
    name: 'Manohar Yadav Boddu',
    role: 'Machine Learning Engineer',
    desc: 'Developed the diabetes prediction models, feature engineering pipeline, explainability workflow, and model evaluation.',
    initials: 'MY',
    gradient: 'from-emerald-500 to-teal-600',
    github: '#',
    linkedin: '#'
  }
];

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen selection:bg-blue-200 transition-all duration-300"
      style={{ 
        background: 'radial-gradient(circle at top, #eef5ff 0%, #f7f9fc 45%, #ffffff 100%)' 
      }}
    >
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 animate-pulse">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">BioSense AI</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/SyedUzaiir/biosense-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm hover:border-slate-300"
              >
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span>GitHub</span>
              </a>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
              <span className="block">AI-Powered</span>
              <span className="block text-blue-600">Clinical Intelligence</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
              Multi-modal health risk assessment combining metabolic biomarkers, explainable machine learning, and real-time emotion analysis.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link 
                href="/login" 
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600"></span>
                <span className="relative flex items-center gap-2">
                  Launch Platform →
                </span>
              </Link>
            </div>
            
            {/* Powered By Technologies */}
            <div className="mt-16 flex flex-col items-center gap-3">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Powered By</span>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {['Next.js', 'FastAPI', 'Python', 'Scikit-Learn', 'OpenCV', 'TensorFlow', 'MongoDB'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500 rounded-full text-xs font-semibold text-slate-600 transition-colors shadow-sm cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white sm:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Core Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A Unified Healthcare Approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Diabetes Prediction</h3>
                <p className="text-slate-600">Early-stage risk assessment using comprehensive metabolic data to predict and manage diabetes proactively.</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Emotion Detection</h3>
                <p className="text-slate-600">Integrated computer vision analyzing patient facial markers to assess stress, anxiety, and overall mental wellbeing.</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Role Security</h3>
                <p className="text-slate-600">Secure, partitioned access ensuring doctors monitor holistic patient portfolios while patients access their private metrics.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Creators / Team Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Creators</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Meet the Team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-500 transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className={`h-24 w-24 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mb-6`}>
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm font-semibold text-blue-600 mt-1">{member.role}</p>
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">{member.desc}</p>
                </div>
                <div className="flex gap-6 mt-6">
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 hover:underline transition-all duration-200 text-sm font-semibold"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 hover:underline transition-all duration-200 text-sm font-semibold"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Responsibilities Table */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg max-w-5xl mx-auto">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Roles & Responsibilities</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {[
                    {
                      name: 'Syed Uzair Mohiuddin',
                      title: 'Full Stack & AI Engineer',
                      roles: 'Frontend development, FastAPI backend, API integration, deployment (Railway & Vercel), authentication, UI/UX, project integration'
                    },
                    {
                      name: 'Sarasam Chinmaee Reddy',
                      title: 'AI Architect',
                      roles: 'System architecture, multimodal AI workflow, project planning, research, clinical pipeline design'
                    },
                    {
                      name: 'Manohar Yadav Boddu',
                      title: 'Machine Learning Engineer',
                      roles: 'ML model development, preprocessing, feature engineering, explainability (SHAP/PDP), model evaluation'
                    }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{row.name}</td>
                      <td className="px-6 py-4 text-blue-600 font-medium whitespace-nowrap">{row.title}</td>
                      <td className="px-6 py-4 text-slate-500 leading-relaxed">{row.roles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Project Highlights Section */}
      <div className="py-16 bg-white border-t border-slate-200 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Key Highlights</h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Project Highlights
            </p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                '95% ML Accuracy',
                'Random Forest + SVM',
                'Explainable AI (SHAP)',
                'Real-Time Emotion Detection',
                'FastAPI REST API',
                'Next.js 16 Frontend',
                'Railway + Vercel Deployment',
                'Multi-modal Clinical Fusion Engine'
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-slate-700 font-semibold">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium">
            Built using Next.js • FastAPI • Python • Railway • Vercel
          </p>
          <p className="mt-3 text-xs text-slate-500">
            © 2026 BioSense AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
