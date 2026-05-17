"use client";

import { useState, useEffect } from "react";
import { Dna, ChevronLeft, ChevronRight, Shield, FileText, Sparkles } from "lucide-react";

const slides = [
    {
        id: 1,
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        content: () => (
            <div className="flex flex-col items-center justify-center h-full text-center px-16">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Dna className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-3xl font-semibold text-white tracking-tight">HelixCare</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        <span className="text-sm text-teal-300 font-medium">AI-Powered Preventive Genetics</span>
                    </div>
                    <h1 className="text-7xl font-semibold text-white tracking-tight leading-[1.05] mb-6">
                        Prevention begins<br />
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            before symptoms.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                        HelixCare identifies inherited health risks years before disease appears — making preventive genetics accessible to every Indian.
                    </p>
                    <div className="mt-10 text-teal-400 text-sm">helixcare.vercel.app</div>
                </div>
            </div>
        ),
    },
    {
        id: 2,
        bg: "bg-white",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="max-w-4xl">
                    <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">The Story</div>
                    <h2 className="text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-10">
                        A family lost their son<br />
                        <span className="text-slate-400">to sickle cell anemia.</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                            <p>The tragedy was not just the disease.</p>
                            <p>It was that <span className="font-semibold text-slate-900">nobody knew it was coming.</span></p>
                            <p>Sickle cell anemia is genetic. Detectable. Manageable — <span className="font-semibold text-slate-900">if caught early.</span></p>
                        </div>
                        <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                            <p>But in India, most people never screen.</p>
                            <p>Not because they do not care.</p>
                            <p className="font-semibold text-slate-900">Because nobody told them to.</p>
                        </div>
                    </div>
                    <div className="mt-12 p-6 rounded-2xl bg-slate-900">
                        <p className="text-2xl text-white font-medium italic">
                            "What if AI could tell them — before it is too late?"
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 3,
        bg: "bg-slate-50",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-rose-600 mb-4 uppercase tracking-widest">The Problem</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-12">
                    India has a prevention crisis.
                </h2>
                <div className="grid grid-cols-4 gap-6">
                    {[
                        { value: "2 Cr+", label: "Indians carry sickle cell trait — most do not know", color: "text-rose-600" },
                        { value: "20%", label: "Infant mortality caused by genetic conditions", color: "text-orange-600" },
                        { value: "3-4 Cr", label: "Thalassemia carriers across India", color: "text-amber-600" },
                        { value: "<2%", label: "Indians who ever receive genetic screening", color: "text-rose-600" },
                    ].map((s, i) => (
                        <div key={i} className="p-7 rounded-2xl bg-white border border-slate-200">
                            <div className={`text-5xl font-semibold mb-3 ${s.color}`}>{s.value}</div>
                            <div className="text-sm text-slate-600 leading-relaxed">{s.label}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 p-5 rounded-xl bg-rose-50 border border-rose-200">
                    <p className="text-rose-800 font-medium">
                        Most genetic conditions are manageable if detected early. Most Indians never detect them early.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: 4,
        bg: "bg-white",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Root Cause</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-4">
                    It is not awareness.<br />It is access.
                </h2>
                <p className="text-xl text-slate-500 mb-12 max-w-2xl">
                    The system is designed for the privileged. Everyone else is left out.
                </p>
                <div className="grid grid-cols-3 gap-6">
                    {[
                        {
                            icon: "₹",
                            title: "Prohibitive cost",
                            desc: "Genetic counseling costs Rs 3,000 to Rs 10,000+. Out of reach for most Indians.",
                            bg: "bg-rose-50",
                            border: "border-rose-200",
                            iconColor: "text-rose-600 bg-rose-100",
                        },
                        {
                            icon: "📍",
                            title: "Geographic barrier",
                            desc: "Genetic specialists concentrated in metros. Tier 2 and Tier 3 cities are severely underserved.",
                            bg: "bg-amber-50",
                            border: "border-amber-200",
                            iconColor: "text-amber-600 bg-amber-100",
                        },
                        {
                            icon: "⏳",
                            title: "No continuous care",
                            desc: "No monitoring between visits. People react when symptoms appear — which is already too late.",
                            bg: "bg-slate-50",
                            border: "border-slate-200",
                            iconColor: "text-slate-600 bg-slate-100",
                        },
                    ].map((c, i) => (
                        <div key={i} className={`p-7 rounded-2xl ${c.bg} border ${c.border}`}>
                            <div className={`w-12 h-12 rounded-xl ${c.iconColor} flex items-center justify-center text-xl font-bold mb-4`}>
                                {c.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{c.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 5,
        bg: "bg-gradient-to-br from-slate-900 to-slate-800",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <div className="text-sm font-medium text-teal-400 mb-4 uppercase tracking-widest">The Solution</div>
                    <h2 className="text-5xl font-semibold text-white tracking-tight mb-4">
                        HelixCare — AI preventive<br />health intelligence.
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl">
                        What if AI could identify your genetic risks before you ever set foot in a clinic?
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                        {[
                            {
                                icon: Shield,
                                title: "Risk Assessment",
                                desc: "AI analyzes family history, lifestyle and symptoms. Personalized genetic risk profile in 4 minutes.",
                                tag: "Free forever",
                            },
                            {
                                icon: FileText,
                                title: "HelixVault",
                                desc: "Upload any lab report. Vision AI extracts every value, tracks trends, and flags early warning signs.",
                                tag: "Core feature",
                            },
                            {
                                icon: Dna,
                                title: "HelixLab",
                                desc: "Real DNA data encoder. Future: virtual biotech research environment for students and startups.",
                                tag: "Future vision",
                            },
                        ].map((f, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4">
                                    <f.icon className="w-5 h-5 text-teal-400" />
                                </div>
                                <div className="inline-block px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-medium mb-3">
                                    {f.tag}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 6,
        bg: "bg-slate-50",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Product</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-10">
                    Built and live. Right now.
                </h2>
                <div className="grid grid-cols-2 gap-5">
                    {[
                        {
                            step: "01",
                            title: "4-minute AI risk intake",
                            desc: "Conversational 6-step assessment covering family history, lifestyle, symptoms and existing conditions.",
                            bg: "bg-teal-50 border-teal-200",
                            color: "text-teal-600",
                        },
                        {
                            step: "02",
                            title: "Personalized risk dashboard",
                            desc: "Risk gauge, scored indicators, urgency levels, specific screening tests and a prevention timeline.",
                            bg: "bg-cyan-50 border-cyan-200",
                            color: "text-cyan-600",
                        },
                        {
                            step: "03",
                            title: "Vision AI report extraction",
                            desc: "Upload CBC, lipid panel, thyroid or any report. GPT-4o reads every value and flags abnormalities.",
                            bg: "bg-slate-100 border-slate-200",
                            color: "text-slate-600",
                        },
                        {
                            step: "04",
                            title: "Real DNA data encoder",
                            desc: "Binary to nucleotide encoding. Same method used by Microsoft Research and Catalog Technologies.",
                            bg: "bg-teal-50 border-teal-200",
                            color: "text-teal-600",
                        },
                    ].map((p, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${p.bg} flex gap-5 items-start`}>
                            <div className={`text-4xl font-semibold ${p.color} opacity-30`}>{p.step}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-1">{p.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 7,
        bg: "bg-white",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Why Now</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-10">
                    The timing has never been better.
                </h2>
                <div className="space-y-4 max-w-3xl">
                    {[
                        { icon: "📱", title: "500M+ smartphones in India", desc: "Distribution for a free preventive health tool already exists." },
                        { icon: "🏥", title: "ABHA infra is live", desc: "Government Ayushman Bharat Health Account creates the digital health backbone we integrate with." },
                        { icon: "🧬", title: "National Sickle Cell Mission", desc: "Government targeting 7 crore screenings by 2047. We are the awareness and screening layer." },
                        { icon: "🤖", title: "AI vision models now accurate", desc: "GPT-4o reliably reads medical reports. This was impossible 18 months ago." },
                        { icon: "📈", title: "Preventive health growing 23% YoY", desc: "Post-COVID India is actively investing in preventive healthcare." },
                    ].map((w, i) => (
                        <div key={i} className="flex gap-5 items-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="text-2xl w-10 text-center">{w.icon}</div>
                            <div>
                                <span className="font-semibold text-slate-900">{w.title} — </span>
                                <span className="text-slate-600">{w.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 8,
        bg: "bg-slate-50",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Business Model</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-10">
                    Three revenue streams.
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {[
                        {
                            model: "B2C Freemium",
                            price: "₹299/mo",
                            items: ["Free basic risk assessment", "Premium: unlimited vault", "Family health graph", "Priority screening alerts", "PDF report export"],
                            target: "Health-conscious urban Indians",
                            bg: "bg-teal-50 border-teal-200",
                            badge: "bg-teal-100 text-teal-700",
                        },
                        {
                            model: "B2B — Diagnostic Labs",
                            price: "Revenue share",
                            items: ["Referral fees per screening", "1mg, Thyrocare, Tata Health", "Redcliffe, SRL Diagnostics", "We send users — they pay", "Per converted referral model"],
                            target: "Rs 50 to Rs 200 per referral",
                            bg: "bg-cyan-50 border-cyan-200",
                            badge: "bg-cyan-100 text-cyan-700",
                        },
                        {
                            model: "B2B — Insurance",
                            price: "Data licensing",
                            items: ["Risk data for underwriting", "Preventive engagement", "Lower claims equals value", "Insurers fund user acquisition", "Population health insights"],
                            target: "Star Health, Niva Bupa",
                            bg: "bg-white border-slate-200",
                            badge: "bg-slate-100 text-slate-700",
                        },
                    ].map((m, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${m.bg}`}>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${m.badge}`}>
                                {m.model}
                            </div>
                            <div className="text-3xl font-semibold text-slate-900 mb-4">{m.price}</div>
                            <ul className="space-y-2 mb-4">
                                {m.items.map((item, j) => (
                                    <li key={j} className="text-sm text-slate-700 flex gap-2">
                                        <span className="text-teal-500 mt-0.5">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">{m.target}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 9,
        bg: "bg-white",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Market Size</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-12">
                    A massive, underserved market.
                </h2>
                <div className="grid grid-cols-3 gap-6 mb-10">
                    {[
                        { label: "TAM", full: "Total Addressable Market", value: "$400B", desc: "Global preventive healthcare market", size: "w-48 h-48", opacity: "opacity-10" },
                        { label: "SAM", full: "Serviceable Addressable Market", value: "$20B", desc: "India preventive health by 2030", size: "w-36 h-36", opacity: "opacity-20" },
                        { label: "SOM", full: "Serviceable Obtainable Market", value: "$500M", desc: "India genetic screening and digital health", size: "w-24 h-24", opacity: "opacity-40" },
                    ].map((m, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`${m.size} rounded-full bg-teal-500 ${m.opacity}`} />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-3">{m.label}</div>
                                <div className="text-4xl font-semibold text-slate-900 mb-1">{m.value}</div>
                                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{m.full}</div>
                                <div className="text-sm text-slate-600">{m.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-5 rounded-xl bg-teal-50 border border-teal-200">
                    <p className="text-teal-900 font-medium">
                        "We do not need the whole market. We need to be the genetic intelligence layer for India's digital health stack."
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: 10,
        bg: "bg-slate-50",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">Roadmap</div>
                <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-10">
                    Where we are. Where we are going.
                </h2>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        {
                            phase: "TODAY",
                            label: "MVP — Live",
                            color: "bg-teal-500",
                            textColor: "text-teal-700",
                            bg: "bg-teal-50 border-teal-200",
                            items: ["AI risk assessment", "GPT-4o report extraction", "HelixVault timeline", "DNA encoder", "Live on Vercel"],
                        },
                        {
                            phase: "PHASE 2",
                            label: "3-6 months",
                            color: "bg-cyan-500",
                            textColor: "text-cyan-700",
                            bg: "bg-cyan-50 border-cyan-200",
                            items: ["ABHA integration", "Lab partnerships", "Family health graph", "WhatsApp reminders", "Hindi language support"],
                        },
                        {
                            phase: "PHASE 3",
                            label: "6-18 months",
                            color: "bg-slate-400",
                            textColor: "text-slate-700",
                            bg: "bg-slate-100 border-slate-200",
                            items: ["Wearable integrations", "Genomic monitoring", "Insurance API", "10 Indian languages", "Doctor network"],
                        },
                        {
                            phase: "PHASE 4",
                            label: "18+ months",
                            color: "bg-slate-300",
                            textColor: "text-slate-600",
                            bg: "bg-white border-slate-200",
                            items: ["HelixLab full platform", "Biotech research env", "DNA synthesis access", "Research partnerships", "Category leader"],
                        },
                    ].map((p, i) => (
                        <div key={i} className={`p-5 rounded-2xl border ${p.bg}`}>
                            <div className={`inline-block w-2 h-2 rounded-full ${p.color} mb-2`} />
                            <div className={`text-xs font-bold uppercase tracking-widest ${p.textColor} mb-0.5`}>{p.phase}</div>
                            <div className="text-xs text-slate-500 mb-4">{p.label}</div>
                            <ul className="space-y-2">
                                {p.items.map((item, j) => (
                                    <li key={j} className="text-xs text-slate-700 flex gap-1.5 items-start">
                                        <span className="text-teal-500 mt-0.5">→</span>{item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 11,
        bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        content: () => (
            <div className="flex flex-col items-center justify-center h-full px-24 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                <div className="relative z-10 max-w-4xl">
                    <div className="text-sm font-medium text-teal-400 mb-6 uppercase tracking-widest">The Bigger Vision</div>
                    <h2 className="text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-8">
                        We are not building<br />a health app.
                    </h2>
                    <p className="text-2xl text-slate-300 leading-relaxed mb-10">
                        We are building the{" "}
                        <span className="text-teal-400 font-semibold">preventive layer</span>{" "}
                        of India's genetic health infrastructure.
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
                        {["Awareness", "→", "Integration", "→", "Intelligence", "→", "Infrastructure"].map((item, i) => (
                            <span
                                key={i}
                                className={
                                    item === "→"
                                        ? "text-slate-600 text-xl"
                                        : "px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium"
                                }
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xl text-slate-300 italic">
                            "What AWS did for compute, HelixCare will do for biological intelligence."
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 12,
        bg: "bg-white",
        content: () => (
            <div className="flex flex-col justify-center h-full px-24">
                <div className="grid grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-sm font-medium text-teal-600 mb-4 uppercase tracking-widest">The Ask</div>
                        <h2 className="text-5xl font-semibold text-slate-900 tracking-tight mb-6">
                            Join us in building<br />preventive India.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            2 crore Indians carry sickle cell trait.<br />
                            Most do not know.<br />
                            <span className="font-semibold text-slate-900">We want to tell them — before it is too late.</span>
                        </p>
                        <div className="space-y-3">
                            {[
                                { icon: "💰", text: "Seed funding to build Phase 2" },
                                { icon: "🤝", text: "Mentorship in health-tech and biotech" },
                                { icon: "🏥", text: "Introductions to diagnostic lab partners" },
                                { icon: "🧬", text: "Advisors in genetics and preventive medicine" },
                            ].map((a, i) => (
                                <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-xl">{a.icon}</span>
                                    <span className="text-slate-700">{a.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                                    <Dna className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-semibold">HelixCare</span>
                            </div>
                            <div className="space-y-4 text-sm">
                                {[
                                    { label: "Live Product", value: "helixcare.vercel.app" },
                                    { label: "GitHub", value: "github.com/rashidsiddique868-cell" },
                                    { label: "Stack", value: "Next.js · GPT-4o · GPT-4o-mini" },
                                    { label: "Built in", value: "Under 24 hours" },
                                ].map((d, i) => (
                                    <div key={i} className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-slate-400">{d.label}</span>
                                        <span className="text-white font-medium">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                            <p className="text-teal-900 font-semibold text-lg">Prevention begins before symptoms.</p>
                            <p className="text-teal-700 text-sm mt-1">helixcare.vercel.app</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
];

export default function PitchDeck() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                setCurrent((prev) => Math.min(prev + 1, slides.length - 1));
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                setCurrent((prev) => Math.max(prev - 1, 0));
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const slide = slides[current];
    const SlideContent = slide.content;

    return (
        <div className={`w-screen h-screen ${slide.bg} relative transition-all duration-300 overflow-hidden`}>
            <SlideContent />

            {/* Navigation */}
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-50">
                <button
                    onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
                    disabled={current === 0}
                    className="w-10 h-10 rounded-full bg-black/10 backdrop-blur border border-black/10 flex items-center justify-center hover:bg-black/20 transition disabled:opacity-30"
                >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>

                <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-teal-500" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setCurrent((prev) => Math.min(prev + 1, slides.length - 1))}
                    disabled={current === slides.length - 1}
                    className="w-10 h-10 rounded-full bg-black/10 backdrop-blur border border-black/10 flex items-center justify-center hover:bg-black/20 transition disabled:opacity-30"
                >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
            </div>

            {/* Slide counter */}
            <div className="absolute top-5 right-6 text-xs text-slate-400 font-medium z-50">
                {current + 1} / {slides.length}
            </div>

            {current === 0 && (
                <div className="absolute bottom-16 right-6 text-xs text-slate-500 flex items-center gap-1.5">
                    <span>Use arrow keys to navigate</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-mono">→</span>
                </div>
            )}
        </div>
    );
}