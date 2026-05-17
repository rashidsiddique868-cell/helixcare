"use client";

import { Button } from "@/components/ui/button";
import {
  Dna,
  ShieldCheck,
  FileText,
  ArrowRight,
  Sparkles,
  Heart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Nav */}
      <nav className="border-b border-slate-200/60 backdrop-blur-md bg-white/70 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-900 tracking-tight">
              HelixCare
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">Features</a>
            <a href="#how" className="hover:text-slate-900 transition">How it works</a>
            <a href="#vision" className="hover:text-slate-900 transition">Vision</a>
          </div>
          <Link href="/assessment">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
              Start Assessment
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs font-medium text-teal-700">
              AI-Powered Preventive Genetics
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05]">
            Prevention begins
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              before symptoms.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            HelixCare uses AI to identify inherited health risks, analyze your
            medical reports, and guide you toward the right screenings — years
            before disease appears.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/assessment">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-7 h-12 text-base"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 text-base border-slate-300"
              >
                View Sample Report
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-xs text-slate-500">
            ⓘ HelixCare provides risk indicators, not medical diagnoses. Always consult a healthcare professional.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "2 Cr+", label: "Indians with sickle cell trait" },
            { value: "20%", label: "Infant mortality from genetic causes" },
            { value: "<2%", label: "Adults who get genetic screening" },
            { value: "Years", label: "Of warning we miss" },
          ].map((stat, i) => (
            <div key={i} className="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-3xl md:text-4xl font-semibold text-slate-900">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <div className="text-sm font-medium text-teal-600 mb-3">Built for prevention</div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            A complete picture of your health, before it changes.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Genetic Risk Assessment",
              desc: "AI analyzes your family history, lifestyle, and symptoms to surface inherited risks like sickle cell, thalassemia, and diabetes.",
            },
            {
              icon: FileText,
              title: "HelixVault",
              desc: "Upload any lab report. Our AI extracts every value, tracks trends across time, and flags anomalies before your doctor would.",
            },
            {
              icon: Heart,
              title: "Personalized Prevention",
              desc: "Get a screening timeline, lifestyle guidance, and the exact questions to ask your doctor — all tailored to your genetic profile.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100/40 transition-all fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-center mb-5">
                <f.icon className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl mb-14">
            <div className="text-sm font-medium text-teal-600 mb-3">How it works</div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
              Three steps to a lifetime of awareness.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Answer a few questions",
                desc: "Family history, lifestyle, symptoms. Takes under 4 minutes.",
              },
              {
                step: "02",
                title: "Upload health reports (optional)",
                desc: "Any past lab work. Our vision AI reads and structures every value.",
              },
              {
                step: "03",
                title: "Get your prevention plan",
                desc: "Personalized risks, screenings, and timelines — backed by AI.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl font-semibold text-teal-600/30 mb-3">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
              <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
              <span className="text-xs font-medium text-teal-100">
                The bigger picture
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight mb-5">
              From early awareness to programmable biology.
            </h2>
            <p className="text-slate-300 leading-relaxed">
              HelixCare begins with prevention — but our vision goes further. We
              are building the infrastructure for democratized biotech:
              AI-driven research environments, virtual lab simulations, and
              accessible genetic intelligence for every Indian.
            </p>
            <Link href="/lab">
              <Button
                variant="outline"
                className="mt-8 rounded-full bg-transparent text-white border-white/30 hover:bg-white/10"
              >
                Preview HelixLab <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
              <Dna className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm text-slate-700 font-medium">HelixCare</span>
          </div>
          <p className="text-xs text-slate-500 text-center">
            HelixCare is an awareness platform. It does not provide medical diagnosis. Always consult a qualified physician.
          </p>
        </div>
      </footer>
    </div>
  );
}