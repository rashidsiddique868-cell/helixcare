"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dna,
    AlertTriangle,
    Activity,
    CheckCircle2,
    Calendar,
    Lightbulb,
    ArrowRight,
    FileText,
    Sparkles,
    TrendingUp,
    Shield,
} from "lucide-react";

const URGENCY_COLORS = {
    routine: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
    soon: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
    priority: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", dot: "bg-rose-500" },
};

const LEVEL_COLORS = {
    low: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" },
    moderate: { bg: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" },
    high: { bg: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50" },
};

export default function Dashboard() {
    const router = useRouter();
    const [report, setReport] = useState(null);
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
        const r = localStorage.getItem("helixcare_report");
        const a = localStorage.getItem("helixcare_answers");
        if (!r) {
            router.push("/assessment");
            return;
        }
        setReport(JSON.parse(r));
        if (a) setAnswers(JSON.parse(a));
    }, [router]);

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-slate-500">Loading your report...</div>
            </div>
        );
    }

    const overallLevel = LEVEL_COLORS[report.overallRiskLevel] || LEVEL_COLORS.moderate;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Top nav */}
            <nav className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Dna className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900">HelixCare</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/vault">
                            <Button variant="outline" className="rounded-full border-slate-300">
                                <FileText className="w-4 h-4 mr-2" />
                                HelixVault
                            </Button>
                        </Link>
                        <Link href="/lab">
                            <Button variant="outline" className="rounded-full border-slate-300">
                                <Sparkles className="w-4 h-4 mr-2" />
                                HelixLab
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs font-medium text-teal-700">
                            Your Personal Risk Report
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                        Hello{answers?.age ? `, ${answers.age}-year-old` : ""}.
                        <br />
                        Here's what we found.
                    </h1>
                </div>

                {/* Overall risk card */}
                <div
                    className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 text-white relative overflow-hidden fade-up"
                    style={{ animationDelay: "100ms" }}
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-sm text-teal-300 font-medium mb-3">
                                OVERALL RISK ASSESSMENT
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-semibold tracking-tight capitalize">
                                    {report.overallRiskLevel}
                                </span>
                                {typeof report.overallScore === "number" && (
                                    <span className="text-2xl text-slate-400">
                                        {report.overallScore}/100
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 text-slate-300 leading-relaxed max-w-md">
                                {report.summary}
                            </p>
                        </div>

                        {/* Risk gauge visual */}
                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="6"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeDasharray={`${(report.overallScore || 50) * 2.64} 264`}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#14b8a6" />
                                            <stop offset="100%" stopColor="#06b6d4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Shield className="w-7 h-7 text-teal-400 mb-1" />
                                    <div className="text-xs text-slate-400">Risk Score</div>
                                    <div className="text-3xl font-semibold">
                                        {report.overallScore || "—"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk factors */}
                <div className="mt-12 fade-up" style={{ animationDelay: "200ms" }}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Risk Indicators
                            </h2>
                            <p className="text-sm text-slate-600 mt-1">
                                Conditions to be aware of based on your profile
                            </p>
                        </div>
                        <div className="text-sm text-slate-500">
                            {report.riskFactors?.length || 0} identified
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {report.riskFactors?.map((rf, i) => {
                            const level = LEVEL_COLORS[rf.level] || LEVEL_COLORS.moderate;
                            const urgency = URGENCY_COLORS[rf.urgency] || URGENCY_COLORS.routine;
                            return (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/40 transition-all fade-up"
                                    style={{ animationDelay: `${250 + i * 80}ms` }}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                            <div className="text-lg font-semibold text-slate-900">
                                                {rf.condition}
                                            </div>
                                            <div
                                                className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${urgency.bg} ${urgency.text} ${urgency.border} border`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
                                                {rf.urgency}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-semibold ${level.text}`}>
                                                {rf.riskScore}
                                            </div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                                                risk
                                            </div>
                                        </div>
                                    </div>

                                    {/* Score bar */}
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                                        <div
                                            className={`h-full ${level.bg} rounded-full transition-all duration-700`}
                                            style={{ width: `${rf.riskScore}%` }}
                                        />
                                    </div>

                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {rf.reasoning}
                                    </p>

                                    <div className="pt-4 border-t border-slate-100 space-y-2">
                                        <div className="flex items-start gap-2 text-xs">
                                            <Calendar className="w-3.5 h-3.5 text-teal-600 mt-0.5" />
                                            <span className="text-slate-700">
                                                <span className="font-medium">Screen:</span> {rf.recommendedScreening}
                                            </span>
                                        </div>
                                        {rf.ageToScreen && (
                                            <div className="flex items-start gap-2 text-xs">
                                                <TrendingUp className="w-3.5 h-3.5 text-teal-600 mt-0.5" />
                                                <span className="text-slate-700">
                                                    <span className="font-medium">When:</span> {rf.ageToScreen}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommendations */}
                {report.topRecommendations?.length > 0 && (
                    <div className="mt-12 fade-up" style={{ animationDelay: "300ms" }}>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">
                            Top 3 Actions for You
                        </h2>
                        <p className="text-sm text-slate-600 mb-6">
                            The most impactful steps you can take right now.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            {report.topRecommendations.map((rec, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 fade-up"
                                    style={{ animationDelay: `${350 + i * 100}ms` }}
                                >
                                    <div className="w-9 h-9 rounded-xl bg-white border border-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm mb-3">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-slate-800 leading-relaxed">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Lifestyle insights */}
                {report.lifestyleInsights?.length > 0 && (
                    <div className="mt-12 fade-up" style={{ animationDelay: "400ms" }}>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-500" />
                            Lifestyle Insights
                        </h2>
                        <div className="space-y-3">
                            {report.lifestyleInsights.map((insight, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-white border border-slate-200 flex gap-3 items-start"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Next steps CTA */}
                <div
                    className="mt-16 rounded-3xl bg-white border border-slate-200 p-8 md:p-10 fade-up"
                    style={{ animationDelay: "500ms" }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Make this report even smarter.
                            </h3>
                            <p className="mt-2 text-slate-600 max-w-xl">
                                Upload your past lab reports to HelixVault. Our AI cross-references
                                them with your risk profile to detect early warning trends.
                            </p>
                        </div>
                        <Link href="/vault">
                            <Button
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-7 h-12"
                            >
                                Open HelixVault
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3 items-start">
                    <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-medium text-slate-800">Disclaimer:</span> This
                        report identifies potential risk indicators based on self-reported
                        information and AI analysis. It is not a medical diagnosis. Please
                        consult a qualified physician for clinical interpretation and screening.
                    </p>
                </div>
            </div>
        </div>
    );
}