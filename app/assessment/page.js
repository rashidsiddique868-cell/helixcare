"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dna, ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";

const QUESTIONS = [
    {
        id: "basics",
        title: "Let's start with the basics",
        subtitle: "These help us tailor your risk profile.",
        fields: [
            { key: "age", label: "Your age", type: "number", placeholder: "e.g. 24" },
            {
                key: "gender",
                label: "Gender",
                type: "select",
                options: ["Male", "Female", "Other", "Prefer not to say"],
            },
            {
                key: "region",
                label: "Region / State (India)",
                type: "text",
                placeholder: "e.g. Maharashtra, Kerala",
            },
            {
                key: "ethnicity",
                label: "Ethnicity / Community (optional)",
                type: "text",
                placeholder: "Helps with genetic risk patterns",
            },
        ],
    },
    {
        id: "family",
        title: "Family medical history",
        subtitle: "Many genetic conditions run in families.",
        fields: [
            {
                key: "familyConditions",
                label: "Have any close relatives had these conditions? (select all that apply)",
                type: "multiselect",
                options: [
                    "Sickle cell anemia",
                    "Thalassemia",
                    "Diabetes (Type 2)",
                    "Heart disease",
                    "Hypertension",
                    "Cancer (any type)",
                    "Stroke",
                    "PCOS",
                    "Mental health conditions",
                    "None / Not sure",
                ],
            },
            {
                key: "consanguinity",
                label: "Are your parents related by blood (e.g. cousins)?",
                type: "select",
                options: ["No", "Yes", "Not sure"],
            },
        ],
    },
    {
        id: "symptoms",
        title: "How have you been feeling?",
        subtitle: "Recurring symptoms can be early warning signs.",
        fields: [
            {
                key: "symptoms",
                label: "Any of these in the last 6 months? (select all that apply)",
                type: "multiselect",
                options: [
                    "Chronic fatigue",
                    "Frequent infections",
                    "Unexplained weight changes",
                    "Joint pain",
                    "Frequent headaches",
                    "Shortness of breath",
                    "Dizziness",
                    "Pale skin",
                    "Irregular periods",
                    "None",
                ],
            },
        ],
    },
    {
        id: "lifestyle",
        title: "Lifestyle snapshot",
        subtitle: "Lifestyle shapes how genetics express.",
        fields: [
            {
                key: "exercise",
                label: "How often do you exercise?",
                type: "select",
                options: ["Daily", "3-4 times a week", "1-2 times a week", "Rarely", "Never"],
            },
            {
                key: "diet",
                label: "Diet type",
                type: "select",
                options: ["Vegetarian", "Non-vegetarian", "Vegan", "Mixed"],
            },
            {
                key: "smoking",
                label: "Do you smoke?",
                type: "select",
                options: ["Never", "Occasionally", "Regularly", "Quit"],
            },
            {
                key: "alcohol",
                label: "Alcohol consumption",
                type: "select",
                options: ["Never", "Occasionally", "Weekly", "Daily"],
            },
            {
                key: "sleep",
                label: "Average sleep per night",
                type: "select",
                options: ["Less than 5 hrs", "5-6 hrs", "7-8 hrs", "More than 8 hrs"],
            },
        ],
    },
    {
        id: "existing",
        title: "Existing conditions",
        subtitle: "Anything you've already been diagnosed with?",
        fields: [
            {
                key: "existingConditions",
                label: "Current diagnoses (optional)",
                type: "textarea",
                placeholder: "e.g. mild hypothyroidism, vitamin D deficiency, anemia...",
            },
            {
                key: "medications",
                label: "Medications you take regularly",
                type: "textarea",
                placeholder: "List any (or write 'none')",
            },
        ],
    },
    {
        id: "context",
        title: "Anything else?",
        subtitle: "Tell us anything that might matter for your health.",
        fields: [
            {
                key: "context",
                label: "Free text — share what's on your mind",
                type: "textarea",
                placeholder:
                    "e.g. I get tired easily even with 8 hours sleep, my mother had thyroid issues, I've been losing hair...",
            },
        ],
    },
];

export default function AssessmentPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    const isLast = step === QUESTIONS.length - 1;
    const currentQ = QUESTIONS[step];
    const progress = ((step + 1) / QUESTIONS.length) * 100;

    const updateAnswer = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const toggleMulti = (key, option) => {
        setAnswers((prev) => {
            const current = prev[key] || [];
            const exists = current.includes(option);
            return {
                ...prev,
                [key]: exists ? current.filter((o) => o !== option) : [...current, option],
            };
        });
    };

    const handleNext = async () => {
        if (!isLast) {
            setStep(step + 1);
            return;
        }
        // Submit
        setLoading(true);
        try {
            const res = await fetch("/api/risk-assessment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Save to localStorage
            localStorage.setItem("helixcare_answers", JSON.stringify(answers));
            localStorage.setItem("helixcare_report", JSON.stringify(data));
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Top bar */}
            <div className="border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Dna className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-slate-900">HelixCare</span>
                    </Link>
                    <div className="text-xs text-slate-500">
                        Step {step + 1} of {QUESTIONS.length}
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="max-w-3xl mx-auto px-6 py-32 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 mb-6 animate-pulse">
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                    </div>
                    <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
                        Analyzing your responses...
                    </h2>
                    <p className="mt-3 text-slate-600">
                        Our AI is cross-referencing your inputs against genetic risk patterns,
                        family history models, and lifestyle indicators.
                    </p>
                    <div className="mt-10 space-y-3 max-w-md mx-auto">
                        {[
                            "Parsing family history patterns",
                            "Mapping lifestyle factors to risk indicators",
                            "Identifying recommended screenings",
                            "Building your personalized prevention plan",
                        ].map((line, i) => (
                            <div
                                key={i}
                                className="text-left p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 fade-up flex items-center gap-3"
                                style={{ animationDelay: `${i * 400}ms` }}
                            >
                                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto px-6 py-16">
                    <div className="fade-up" key={step}>
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                            {currentQ.title}
                        </h1>
                        <p className="mt-3 text-slate-600 text-lg">{currentQ.subtitle}</p>

                        <div className="mt-10 space-y-6">
                            {currentQ.fields.map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-medium text-slate-800 mb-2">
                                        {field.label}
                                    </label>

                                    {field.type === "text" || field.type === "number" ? (
                                        <Input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={answers[field.key] || ""}
                                            onChange={(e) => updateAnswer(field.key, e.target.value)}
                                            className="h-12 text-base"
                                        />
                                    ) : field.type === "textarea" ? (
                                        <Textarea
                                            placeholder={field.placeholder}
                                            value={answers[field.key] || ""}
                                            onChange={(e) => updateAnswer(field.key, e.target.value)}
                                            rows={4}
                                            className="text-base"
                                        />
                                    ) : field.type === "select" ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {field.options.map((opt) => {
                                                const selected = answers[field.key] === opt;
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => updateAnswer(field.key, opt)}
                                                        className={`text-sm px-4 py-3 rounded-xl border transition-all text-left ${selected
                                                                ? "border-teal-500 bg-teal-50 text-teal-900 font-medium"
                                                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : field.type === "multiselect" ? (
                                        <div className="flex flex-wrap gap-2">
                                            {field.options.map((opt) => {
                                                const selected = (answers[field.key] || []).includes(opt);
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleMulti(field.key, opt)}
                                                        className={`text-sm px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${selected
                                                                ? "border-teal-500 bg-teal-50 text-teal-900 font-medium"
                                                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                                            }`}
                                                    >
                                                        {selected && <Check className="w-3.5 h-3.5" />}
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        {/* Nav buttons */}
                        <div className="mt-12 flex items-center justify-between">
                            <Button
                                variant="ghost"
                                onClick={() => setStep(Math.max(0, step - 1))}
                                disabled={step === 0}
                                className="text-slate-600"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                size="lg"
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-7 h-12"
                            >
                                {isLast ? "Generate My Report" : "Continue"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}