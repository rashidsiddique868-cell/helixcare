"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
    Dna,
    Upload,
    FileText,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Calendar,
    TrendingUp,
    TrendingDown,
    Minus,
    Sparkles,
    ArrowRight,
    Trash2,
    Activity,
} from "lucide-react";

const STATUS_COLORS = {
    normal: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: Minus },
    low: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: TrendingDown },
    high: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", icon: TrendingUp },
    borderline: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: AlertTriangle },
};

export default function VaultPage() {
    const [reports, setReports] = useState([]);
    const [extracting, setExtracting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [activeReport, setActiveReport] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("helixcare_vault");
        if (stored) {
            const parsed = JSON.parse(stored);
            setReports(parsed);
            if (parsed.length > 0) setActiveReport(parsed[0]);
        }
    }, []);

    const saveReports = (newReports) => {
        setReports(newReports);
        localStorage.setItem("helixcare_vault", JSON.stringify(newReports));
    };

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;
        setError(null);
        setExtracting(true);

        // Convert to base64
        const reader = new FileReader();
        reader.onload = async () => {
            const imageBase64 = reader.result;
            setPreviewImage(imageBase64);

            try {
                const res = await fetch("/api/extract-report", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imageBase64 }),
                });
                const data = await res.json();

                if (data.error === "not_a_medical_report") {
                    setError("This doesn't look like a health report. Try uploading a lab test image or PDF page.");
                    setExtracting(false);
                    return;
                }
                if (data.error) throw new Error(data.error);

                const newReport = {
                    id: Date.now(),
                    uploadedAt: new Date().toISOString(),
                    ...data,
                };
                const updated = [newReport, ...reports];
                saveReports(updated);
                setActiveReport(newReport);
                setExtracting(false);
            } catch (err) {
                console.error(err);
                setError("Failed to extract data. Try a clearer image.");
                setExtracting(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        },
        multiple: false,
    });

    const deleteReport = (id) => {
        const updated = reports.filter((r) => r.id !== id);
        saveReports(updated);
        if (activeReport?.id === id) setActiveReport(updated[0] || null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Nav */}
            <nav className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Dna className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900">HelixCare</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="outline" className="rounded-full border-slate-300">
                                Dashboard
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
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-xs font-medium text-teal-700">
                            HelixVault — Your Health Memory
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                        Every report. One timeline.
                        <br />
                        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            All understood by AI.
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                        Upload any lab report. Our vision AI extracts every value, tracks
                        trends, and flags what matters — automatically.
                    </p>
                </div>

                {/* Dropzone */}
                <div className="mt-10">
                    {extracting ? (
                        <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/50 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 mb-5 animate-pulse">
                                <Loader2 className="w-7 h-7 text-white animate-spin" />
                            </div>
                            <h3 className="text-2xl font-semibold text-slate-900">
                                Reading your report...
                            </h3>
                            <p className="mt-2 text-slate-600">
                                Our vision AI is extracting test names, values, and ranges.
                            </p>
                            <div className="mt-6 space-y-2 max-w-md mx-auto">
                                {[
                                    "Detecting report type",
                                    "Identifying test values",
                                    "Mapping reference ranges",
                                    "Flagging abnormalities",
                                ].map((line, i) => (
                                    <div
                                        key={i}
                                        className="text-left p-3 rounded-xl bg-white border border-teal-100 text-sm text-slate-700 fade-up flex items-center gap-3"
                                        style={{ animationDelay: `${i * 400}ms` }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                        {line}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div
                            {...getRootProps()}
                            className={`rounded-3xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${isDragActive
                                ? "border-teal-500 bg-teal-50"
                                : "border-slate-300 bg-white hover:border-teal-400 hover:bg-slate-50"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 mb-5">
                                <Upload className="w-7 h-7 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-semibold text-slate-900">
                                {isDragActive ? "Drop it here" : "Upload a health report"}
                            </h3>
                            <p className="mt-2 text-slate-600">
                                Drag and drop an image, or click to browse. PNG, JPG supported.
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Try any blood test, lipid panel, thyroid, or CBC report.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700 flex gap-2 items-start">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {error}
                        </div>
                    )}
                </div>

                {/* Reports list + viewer */}
                {reports.length > 0 && (
                    <div className="mt-12 grid md:grid-cols-[280px_1fr] gap-6">
                        {/* Sidebar: list */}
                        <div>
                            <div className="text-sm font-medium text-slate-700 mb-3">
                                Your Reports ({reports.length})
                            </div>
                            <div className="space-y-2">
                                {reports.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => setActiveReport(r)}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${activeReport?.id === r.id
                                            ? "border-teal-500 bg-teal-50"
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                            }`}
                                    >
                                        <div className="text-sm font-semibold text-slate-900 truncate">
                                            {r.reportType}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {r.reportDate !== "unknown"
                                                ? r.reportDate
                                                : new Date(r.uploadedAt).toLocaleDateString()}
                                        </div>
                                        {r.flags?.length > 0 && (
                                            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                                                <AlertTriangle className="w-2.5 h-2.5" />
                                                {r.flags.length} flag{r.flags.length > 1 ? "s" : ""}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active report */}
                        {activeReport && (
                            <div className="space-y-6 fade-up" key={activeReport.id}>
                                {/* Header card */}
                                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div>
                                            <div className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                                                Report Type
                                            </div>
                                            <h2 className="text-2xl font-semibold text-slate-900 mt-1">
                                                {activeReport.reportType}
                                            </h2>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                                {activeReport.labName !== "unknown" && (
                                                    <span>{activeReport.labName}</span>
                                                )}
                                                {activeReport.reportDate !== "unknown" && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {activeReport.reportDate}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteReport(activeReport.id)}
                                            className="text-slate-400 hover:text-rose-600 transition"
                                            title="Delete report"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {activeReport.summary}
                                    </p>

                                    {activeReport.flags?.length > 0 && (
                                        <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200">
                                            <div className="text-xs font-semibold text-rose-700 mb-2 flex items-center gap-1.5">
                                                <AlertTriangle className="w-3.5 h-3.5" />
                                                Flagged Findings
                                            </div>
                                            <ul className="space-y-1 text-sm text-rose-700">
                                                {activeReport.flags.map((f, i) => (
                                                    <li key={i}>• {f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Test values */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-teal-600" />
                                        Test Values ({activeReport.tests?.length || 0})
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {activeReport.tests?.map((t, i) => {
                                            const s = STATUS_COLORS[t.status] || STATUS_COLORS.normal;
                                            const Icon = s.icon;
                                            return (
                                                <div
                                                    key={i}
                                                    className="p-4 rounded-xl bg-white border border-slate-200 fade-up"
                                                    style={{ animationDelay: `${i * 40}ms` }}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="text-sm font-medium text-slate-900">
                                                            {t.name}
                                                        </div>
                                                        <div
                                                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${s.bg} ${s.text} ${s.border} border`}
                                                        >
                                                            <Icon className="w-3 h-3" />
                                                            {t.status}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-baseline gap-2">
                                                        <span className="text-2xl font-semibold text-slate-900">
                                                            {t.value}
                                                        </span>
                                                        <span className="text-xs text-slate-500">{t.unit}</span>
                                                    </div>
                                                    {t.normalRange && (
                                                        <div className="mt-1 text-[11px] text-slate-500">
                                                            Normal: {t.normalRange}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                {activeReport.recommendations?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-teal-600" />
                                            AI Recommendations
                                        </h3>
                                        <div className="space-y-2">
                                            {activeReport.recommendations.map((rec, i) => (
                                                <div
                                                    key={i}
                                                    className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 flex gap-3"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                                    <p className="text-sm text-slate-800">{rec}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Empty state */}
                {reports.length === 0 && !extracting && (
                    <div className="mt-16 text-center text-sm text-slate-500">
                        No reports yet. Upload your first one above to begin building your
                        health timeline.
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight">
                                See your full risk picture
                            </h3>
                            <p className="mt-2 text-slate-300 max-w-xl">
                                Combine your vault data with your genetic risk profile to get
                                cross-referenced AI insights.
                            </p>
                        </div>
                        <Link href="/dashboard">
                            <Button
                                size="lg"
                                className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-7 h-12"
                            >
                                Back to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}