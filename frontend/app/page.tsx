"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, Brain, Shield, Github, Linkedin, ArrowRight, FlaskConical, Microscope, ScanFace } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Syed Uzair Mohiuddin',
    role: 'Full Stack & AI Engineer',
    desc: 'Frontend, FastAPI backend, deployment pipeline, and multimodal inference integration.',
    initials: 'SU',
    color: 'bg-blue-600',
    github: 'https://github.com/SyedUzaiir',
    linkedin: 'https://www.linkedin.com/in/syeduzairmohiuddin/'
  },
  {
    name: 'Sarasam Chinmaee Reddy',
    role: 'AI Architect',
    desc: 'System architecture, clinical AI workflow design, and ML pipeline strategy.',
    initials: 'SC',
    color: 'bg-violet-600',
    github: 'https://github.com/Chinmayee04-sys',
    linkedin: 'https://www.linkedin.com/in/s-chinmayee-reddy-1467b030b/'
  },
  {
    name: 'Manohar Yadav Boddu',
    role: 'Machine Learning Engineer',
    desc: 'Model training, feature engineering, SHAP explainability, and evaluation.',
    initials: 'MY',
    color: 'bg-emerald-600',
    github: 'https://github.com/Manohar0303',
    linkedin: 'https://www.linkedin.com/in/boddu-manohar-7b717a31a/'
  }
];

const TECH = [
  { name: 'Next.js', fill: '#000000' },
  { name: 'FastAPI', fill: '#009688' },
  { name: 'Python', fill: '#3776AB' },
  { name: 'Scikit-Learn', fill: '#F7931E' },
  { name: 'OpenCV', fill: '#5C3EE8' },
  { name: 'MongoDB', fill: '#47A248' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans antialiased overflow-x-hidden">

      {/* ── Navbar ────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center border-b border-slate-200/80 bg-white/75 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto w-full px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="BioSense AI" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" priority />
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              BioSense <span className="text-blue-600">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/SyedUzaiir/biosense-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <Link
              href="/login"
              className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Sign in
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="pt-36 pb-20 px-5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            {/* Headline */}
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.08] text-slate-900 max-w-4xl">
              Clinical risk assessment,{' '}
              <span className="text-blue-600">powered by machine learning.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
              BioSense AI predicts early-stage diabetes risk by combining patient vitals with real-time facial emotion analysis — giving clinicians a richer picture than biomarkers alone.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
              >
                Open Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://biosense-ai-production.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 bg-white text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                API Docs
              </a>
            </div>

            {/* Links row */}
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-400">
              <a href="https://biosenseai.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400">Live frontend ↗</a>
              <a href="https://biosense-ai-production.up.railway.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400">Backend API ↗</a>
              <a href="https://github.com/SyedUzaiir/biosense-ai" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400">View source ↗</a>
            </div>
          </motion.div>

          {/* ── Dashboard Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="mt-16 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/80 overflow-hidden bg-slate-950"
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 px-4 h-10 border-b border-slate-800 bg-slate-900">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <div className="ml-4 flex-1 max-w-xs h-5 bg-slate-800 rounded-md flex items-center px-3">
                <span className="text-[9px] text-slate-500 font-mono truncate">app.biosenseai.com/clinician</span>
              </div>
            </div>

            {/* app chrome */}
            <div className="grid grid-cols-[160px_1fr] h-[420px]">
              {/* sidebar */}
              <div className="border-r border-slate-800 px-3 pt-5 space-y-1 bg-slate-950">
                <div className="flex items-center gap-2 px-2 mb-5">
                  <span className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center">
                    <Activity className="h-3 w-3 text-white" />
                  </span>
                  <span className="text-[11px] font-semibold text-blue-400">BioSense AI</span>
                </div>
                {[
                  { label: 'Dashboard', active: true },
                  { label: 'Patients', active: false },
                  { label: 'Risk Analysis', active: false },
                  { label: 'Reports', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`px-3 py-2 rounded-lg text-[10px] font-medium cursor-default select-none ${
                      item.active
                        ? 'bg-blue-600/15 text-blue-400'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* main panel */}
              <div className="p-6 overflow-y-auto space-y-5 bg-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-semibold text-slate-100">Patient Overview</h2>
                    <p className="text-[9px] text-slate-500 mt-0.5">Today, 22 Jun 2026</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Diabetes Risk', value: '74.2%', tag: 'At Risk', tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    { label: 'Emotion State', value: 'Neutral', tag: 'Stable', tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { label: 'Model Confidence', value: '78.4%', tag: 'Calibrated', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] uppercase tracking-wider text-slate-500 font-medium">{card.label}</span>
                        <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded border ${card.tagColor}`}>{card.tag}</span>
                      </div>
                      <span className="text-xl font-bold text-slate-100">{card.value}</span>
                    </div>
                  ))}
                </div>

                {/* chart row */}
                <div className="grid grid-cols-[2fr_1fr] gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 font-medium block mb-3">Blood Glucose — 24h Trajectory</span>
                    <div className="flex items-end gap-1 h-20">
                      {[38, 52, 48, 72, 80, 68, 60, 85, 96, 74, 66, 78].map((v, i) => (
                        <div key={i} className="flex-1 flex items-end">
                          <div
                            className={`w-full rounded-t transition-all ${v > 80 ? 'bg-rose-500/70' : 'bg-blue-500/60'}`}
                            style={{ height: `${(v / 100) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 font-medium block mb-3">SHAP Feature Impact</span>
                    <div className="space-y-2">
                      {[
                        { label: 'HbA1c', pct: 68, color: 'bg-rose-500' },
                        { label: 'BMI', pct: 42, color: 'bg-rose-400' },
                        { label: 'SBP', pct: 22, color: 'bg-emerald-500' },
                      ].map((f) => (
                        <div key={f.label} className="space-y-0.5">
                          <div className="flex justify-between text-[7px] text-slate-400">
                            <span>{f.label}</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${f.color}`} style={{ width: `${f.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────── */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-5">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '78%', label: 'Model accuracy', sub: 'Random Forest on PIMA dataset' },
              { value: '7', label: 'Clinical features', sub: 'Glucose, BMI, HbA1c, SBP, age…' },
              { value: '3', label: 'AI models', sub: 'RF · SVM · FER emotion detector' },
              { value: '<500ms', label: 'Inference latency', sub: 'End-to-end on Railway free tier' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{s.value}</dt>
                <dd className="text-sm font-medium text-slate-700 mt-0.5">{s.label}</dd>
                <dd className="text-xs text-slate-400 mt-0.5">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-xl">
              Two inputs. One unified risk score.
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg">
              The patient submits vitals through the portal and optionally captures a webcam frame. Both signals are processed in parallel and fused into a single clinical recommendation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: FlaskConical,
                step: '01',
                title: 'Vitals input',
                body: 'Patients enter glucose, BMI, blood pressure, age, and other biomarkers. Missing values are imputed automatically using KNNImputer.',
                accent: 'border-blue-500/30 bg-blue-50/40',
                iconColor: 'text-blue-600 bg-blue-100',
              },
              {
                icon: ScanFace,
                step: '02',
                title: 'Emotion analysis',
                body: 'An optional webcam snapshot is passed through the FER library. The detected affect (e.g. stressed, neutral) is translated into a clinical descriptor.',
                accent: 'border-violet-500/30 bg-violet-50/40',
                iconColor: 'text-violet-600 bg-violet-100',
              },
              {
                icon: Microscope,
                step: '03',
                title: 'Fusion & output',
                body: 'The Clinical Fusion Engine combines the Random Forest risk probability, SVM confidence score, and emotion signal into one recommendation with SHAP explainability.',
                accent: 'border-emerald-500/30 bg-emerald-50/30',
                iconColor: 'text-emerald-600 bg-emerald-100',
              },
            ].map((f) => (
              <motion.div
                key={f.step}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl border p-7 ${f.accent}`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-5 ${f.iconColor}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-2">STEP {f.step}</div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────── */}
      <section className="border-t border-slate-100 bg-white py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium text-center mb-8">Built with</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
            {TECH.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors cursor-default">
                <span
                  className="h-2.5 w-2.5 rounded-sm flex-shrink-0"
                  style={{ background: t.fill }}
                />
                <span className="text-sm font-medium">{t.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">
            Deployed on <span className="font-medium text-slate-500">Railway</span> (backend) and <span className="font-medium text-slate-500">Vercel</span> (frontend).
          </p>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-3">Team</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Built by three students.
            </h2>
            <p className="mt-3 text-slate-500">
              Vardhaman College of Engineering, Hyderabad — B.Tech CSE, 2025–26.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TEAM_MEMBERS.map((m) => (
              <motion.div
                key={m.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-slate-300 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{m.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{m.role}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                <div className="flex items-center gap-4 mt-auto pt-3 border-t border-slate-100">
                  <a href={m.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium">
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Responsibilities */}
          <div className="mt-10 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <h3 className="text-sm font-semibold text-slate-700">Roles & Responsibilities</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-6 py-3 text-xs text-slate-400 font-medium">Member</th>
                    <th className="px-6 py-3 text-xs text-slate-400 font-medium">Title</th>
                    <th className="px-6 py-3 text-xs text-slate-400 font-medium">Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Syed Uzair Mohiuddin', title: 'Full Stack & AI Engineer', scope: 'Next.js frontend, FastAPI backend, REST API, Railway/Vercel deployment, auth, UI/UX' },
                    { name: 'Sarasam Chinmaee Reddy', title: 'AI Architect', scope: 'System design, multimodal AI workflow, clinical pipeline architecture, research' },
                    { name: 'Manohar Yadav Boddu', title: 'ML Engineer', scope: 'Model training, preprocessing, feature engineering, SHAP/PDP explainability, evaluation' },
                  ].map((r) => (
                    <tr key={r.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{r.name}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{r.title}</td>
                      <td className="px-6 py-4 text-slate-500">{r.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded bg-slate-900 flex items-center justify-center">
              <Activity className="h-3 w-3 text-white" />
            </span>
            <span className="font-medium text-slate-600">BioSense AI</span>
            <span>— Final Year Project, 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/SyedUzaiir/biosense-ai" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">GitHub</a>
            <a href="https://biosense-ai-production.up.railway.app/docs" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">API Docs</a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
