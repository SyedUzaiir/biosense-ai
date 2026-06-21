"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, Brain, Shield, Github, Linkedin, Check, Sparkles, Cpu, Star } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Syed Uzair Mohiuddin',
    role: 'Full Stack & AI Engineer',
    desc: 'Built the frontend architecture, FastAPI backend integration, deployment pipeline, and multimodal AI inference workflow.',
    initials: 'SU',
    gradient: 'from-blue-500 to-indigo-600',
    tags: ['Frontend', 'Backend', 'Deployment', 'UI/UX'],
    github: 'https://github.com/SyedUzaiir',
    linkedin: 'https://www.linkedin.com/in/syeduzairmohiuddin/'
  },
  {
    name: 'Sarasam Chinmaee Reddy',
    role: 'AI Architect',
    desc: 'Designed the clinical AI workflow, multimodal system architecture, ML integration strategy, and project planning.',
    initials: 'SC',
    gradient: 'from-purple-500 to-indigo-600',
    tags: ['Architecture', 'Clinical AI', 'Multimodal', 'Planning'],
    github: 'https://github.com/Chinmayee04-sys',
    linkedin: 'https://www.linkedin.com/in/s-chinmayee-reddy-1467b030b/'
  },
  {
    name: 'Manohar Yadav Boddu',
    role: 'Machine Learning Engineer',
    desc: 'Developed the diabetes prediction models, feature engineering pipeline, explainability workflow, and model evaluation.',
    initials: 'MY',
    gradient: 'from-emerald-500 to-teal-600',
    tags: ['ML Modeling', 'Preprocessing', 'Explainability', 'Evaluation'],
    github: 'https://github.com/Manohar0303',
    linkedin: 'https://www.linkedin.com/in/boddu-manohar-7b717a31a/'
  }
];

export default function LandingPage() {
  return (
    <div 
      className="min-h-screen selection:bg-blue-200 transition-all duration-300 relative overflow-hidden bg-[#f8fafc]"
      style={{ 
        background: 'radial-gradient(circle at top, #eef5ff 0%, #f7f9fc 45%, #ffffff 100%)' 
      }}
    >
      {/* Faint Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle Background Glow Circles */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-indigo-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[5%] w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />

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
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/SyedUzaiir/biosense-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm h-9 box-border"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors h-9 box-border"
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
            
            {/* Dual CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link 
                href="/login" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-2xl overflow-hidden transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600"></span>
                <span className="relative flex items-center gap-2">
                  Launch Platform →
                </span>
              </Link>
              <a 
                href="https://github.com/SyedUzaiir/biosense-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 rounded-2xl text-base font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 transition-all hover:scale-[1.03] hover:border-slate-300 shadow-sm active:scale-[0.98]"
              >
                <Github className="h-5 w-5" />
                <span>View GitHub</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
              {[
                'Explainable AI',
                'Real-time Prediction',
                'FastAPI Backend',
                'Multi-modal Analysis'
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 stroke-[3]" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Floating Dashboard Preview */}
            <div className="relative w-full max-w-4xl mx-auto mt-16 px-4">
              {/* Glow behind the mockup */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl pointer-events-none -z-10" />
              
              {/* Mockup Frame */}
              <div className="bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-800/80 backdrop-blur-xl">
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between pb-3 px-4 border-b border-slate-800">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                  </div>
                  <div className="bg-slate-800/60 rounded-lg text-[9px] text-slate-400 px-12 py-1 select-none font-medium border border-slate-700/30 font-mono">
                    app.biosenseai.com/dashboard
                  </div>
                  <div className="w-10" />
                </div>

                {/* Mock App Content */}
                <div className="bg-slate-950 rounded-2xl overflow-hidden mt-3 grid grid-cols-[180px_1fr] h-[400px] border border-slate-800">
                  {/* Mock Sidebar */}
                  <div className="border-r border-slate-800/80 p-4 space-y-6 bg-slate-950/80">
                    <div className="flex items-center gap-2 px-2 text-blue-500 font-bold text-xs">
                      <Activity className="h-4 w-4" />
                      <span>BioSense AI</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { label: 'Overview', active: true, icon: Sparkles },
                        { label: 'Patient Analysis', active: false, icon: Activity },
                        { label: 'Diagnostic Tool', active: false, icon: Brain },
                      ].map((item, idx) => (
                        <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold select-none cursor-pointer transition-colors ${item.active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent'}`}>
                          <item.icon className="h-3.5 w-3.5" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mock Main Panel */}
                  <div className="p-5 overflow-y-auto space-y-5 text-left font-sans">
                    {/* Mock Dashboard Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                      <div>
                        <h3 className="text-xs font-bold text-slate-100">Patient Diagnostic Profile</h3>
                        <p className="text-[9px] text-slate-500 mt-0.5">Multimodal clinical assessment & risk forecasting</p>
                      </div>
                      <div className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-bold animate-pulse flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                        Live Sync
                      </div>
                    </div>

                    {/* Mock Grid Widgets */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl flex flex-col justify-between h-24">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Diabetes Risk</span>
                          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400">High Risk</span>
                        </div>
                        <div>
                          <span className="text-xl font-extrabold text-slate-100">92.4%</span>
                          <p className="text-[8px] text-slate-500 mt-0.5">HbA1c & Glucose Analysis</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl flex flex-col justify-between h-24">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Emotion State</span>
                          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Stable</span>
                        </div>
                        <div>
                          <span className="text-xl font-extrabold text-slate-100">Calm / Focus</span>
                          <p className="text-[8px] text-slate-500 mt-0.5">Facial Marker Tracking</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl flex flex-col justify-between h-24">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Fusion Confidence</span>
                          <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400">Optimal</span>
                        </div>
                        <div>
                          <span className="text-xl font-extrabold text-slate-100">95.0%</span>
                          <p className="text-[8px] text-slate-500 mt-0.5">Cross-referencing metrics</p>
                        </div>
                      </div>
                    </div>

                    {/* Mock Chart & Explanations */}
                    <div className="grid grid-cols-[2fr_1fr] gap-3">
                      <div className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl h-36 flex flex-col justify-between">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Glucose Fluctuations (24h)</span>
                        <div className="flex-1 flex items-end gap-1.5 h-20 pt-2">
                          {[45, 60, 52, 85, 90, 75, 68, 92, 110, 80, 70, 85].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                              <div 
                                className={`w-full rounded-t-sm transition-all duration-300 ${val > 90 ? 'bg-rose-500/80' : 'bg-blue-500/80'}`} 
                                style={{ height: `${(val / 120) * 100}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl h-36 flex flex-col justify-between">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Explainable AI (SHAP)</span>
                        <div className="space-y-1.5 mt-1">
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[7px] text-slate-400 font-medium">
                              <span>HbA1c levels (+12%)</span>
                              <span className="text-rose-400">+12%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-0.5">
                              <div className="bg-rose-500 h-0.5 rounded-full" style={{ width: '70%' }} />
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[7px] text-slate-400 font-medium">
                              <span>BMI (+8%)</span>
                              <span className="text-rose-400">+8%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-0.5">
                              <div className="bg-rose-400 h-0.5 rounded-full" style={{ width: '45%' }} />
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[7px] text-slate-400 font-medium">
                              <span>Systolic BP (-3%)</span>
                              <span className="text-emerald-400">-3%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-0.5">
                              <div className="bg-emerald-500 h-0.5 rounded-full" style={{ width: '20%' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Richer Technology Pills */}
            <div className="mt-20 flex flex-col items-center gap-4">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Powered By</span>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4">
                {[
                  { name: 'Next.js', emoji: '⚡' },
                  { name: 'FastAPI', emoji: '⚙' },
                  { name: 'Python', emoji: '🐍' },
                  { name: 'TensorFlow', emoji: '🧠' },
                  { name: 'Scikit-Learn', emoji: '📊' },
                  { name: 'OpenCV', emoji: '👁' },
                  { name: 'MongoDB', emoji: '🍃' }
                ].map((tech) => (
                  <span 
                    key={tech.name} 
                    className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm hover:shadow-md cursor-default flex items-center gap-2.5"
                  >
                    <span className="text-base select-none">{tech.emoji}</span>
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Project Stats Section */}
      <div className="bg-slate-900 border-y border-slate-800 py-16 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="py-4 md:py-0">
              <p className="text-4xl md:text-5xl font-extrabold text-blue-400">95%</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Prediction Accuracy</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="text-4xl md:text-5xl font-extrabold text-blue-400">7</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Features</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="text-4xl md:text-5xl font-extrabold text-blue-400">3</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">AI Models</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="text-4xl md:text-5xl font-extrabold text-blue-400">&lt;500 ms</p>
              <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Inference Time</p>
            </div>
          </div>
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
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:border-blue-500 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`h-12 w-12 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white text-sm font-extrabold shadow-sm`}>
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                      <p className="text-xs font-semibold text-blue-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{member.desc}</p>
                  
                  {/* Focus pill tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {member.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 tracking-wide uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 mt-6 pt-5 border-t border-slate-100">
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
      <footer className="bg-slate-950 py-10 text-slate-500 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span>Built with</span>
            {['Next.js', 'FastAPI', 'Python', 'Scikit-Learn', 'Railway', 'Vercel'].map((item, idx, arr) => (
              <span key={item} className="text-slate-400">
                {item}{idx < arr.length - 1 ? ' •' : ''}
              </span>
            ))}
          </div>
          <div>
            © 2026 BioSense AI
          </div>
        </div>
      </footer>
    </div>
  );
}
