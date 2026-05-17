"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dna,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Cpu,
  Microscope,
  Binary,
  Zap,
  Lock,
} from "lucide-react";

function encodeToDNA(text) {
  const binaryMap = { "00": "A", "01": "T", "10": "G", "11": "C" };
  let binary = "";
  for (let i = 0; i < text.length; i++) {
    binary += text.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let dna = "";
  for (let i = 0; i < binary.length; i += 2) {
    dna += binaryMap[binary.substr(i, 2)];
  }
  return dna;
}

function formatDNA(dna) {
  return dna.match(/.{1,10}/g)?.join(" ") || dna;
}

const FUTURE_TOOLS = [
  {
    icon: FlaskConical,
    name: "Virtual PCR Simulator",
    desc: "Simulate polymerase chain reaction experiments with AI-predicted amplification rates and contamination risks.",
    status: "Coming Soon",
  },
  {
    icon: Microscope,
    name: "CRISPR Edit Sandbox",
    desc: "Design gene edits virtually. AI predicts on-target efficiency and off-target risks before any real experiment.",
    status: "Coming Soon",
  },
  {
    icon: Cpu,
    name: "Protein Folding Viewer",
    desc: "Input amino acid sequences and visualize predicted 3D protein structures powered by foundation models.",
    status: "Coming Soon",
  },
  {
    icon: Binary,
    name: "DNA Data Encoder",
    desc: "Store any digital information in synthetic DNA sequences. Convert text, files, and data to nucleotide strings.",
    status: "Live Preview",
    highlight: true,
  },
];

export default function LabPage() {
  const [inputText, setInputText] = useState("");
  const [dnaOutput, setDnaOutput] = useState("");
  const [nucleotideCounts, setNucleotideCounts] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    if (!inputText.trim()) return;
    const dna = encodeToDNA(inputText);
    setDnaOutput(dna);

    const counts = { A: 0, T: 0, G: 0, C: 0 };
    for (const char of dna) counts[char]++;
    setNucleotideCounts(counts);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dnaOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const storageDensity = dnaOutput
    ? ((inputText.length * 8) / dnaOutput.length).toFixed(2)
    : null;

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
            <Link href="/vault">
              <Button variant="outline" className="rounded-full border-slate-300">
                HelixVault
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
              HelixLab — Experimental Research Environment
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            The future of biotech
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              is accessible.
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Today, cutting-edge biotech machines cost millions and sit in
            centralized labs. HelixLab is our vision for democratizing biological
            research — virtual, AI-powered, and open to everyone.
          </p>
        </div>

        {/* Vision stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 fade-up">
          {[
            { value: "$2M+", label: "Cost of a DNA synthesizer" },
            { value: "~50", label: "Cities with advanced bio labs" },
            { value: "0", label: "Virtual biotech IDEs today" },
            { value: "∞", label: "Researchers we could reach" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-slate-200 text-center"
            >
              <div className="text-3xl font-semibold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tool cards */}
        <div className="mt-14 fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">
            The HelixLab Toolkit
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Virtual biotech instruments — no hardware required.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {FUTURE_TOOLS.map((tool, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition-all ${tool.highlight
                    ? "border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50"
                    : "border-slate-200 bg-white"
                  }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <tool.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${tool.highlight
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-500 flex items-center gap-1"
                      }`}
                  >
                    {!tool.highlight && <Lock className="w-2.5 h-2.5 inline mr-1" />}
                    {tool.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DNA Encoder — LIVE */}
        <div className="mt-14 fade-up">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 mb-5">
                <Zap className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-medium text-teal-200">
                  Live — DNA Data Encoder
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight mb-2">
                Store anything in DNA.
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl">
                DNA can theoretically store 215 petabytes per gram of data. Type
                anything below and watch it become a nucleotide sequence in
                real-time. This is real — the same encoding used in DNA storage
                research.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your input
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type anything — a name, a message, genome data..."
                    rows={5}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 resize-none"
                  />
                  <Button
                    onClick={handleEncode}
                    disabled={!inputText.trim()}
                    className="mt-3 bg-teal-500 hover:bg-teal-400 text-white rounded-full px-6"
                  >
                    <Dna className="w-4 h-4 mr-2" />
                    Encode to DNA
                  </Button>
                </div>

                {/* Output */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    DNA sequence output
                  </label>
                  {dnaOutput ? (
                    <div>
                      <div className="bg-white/10 border border-white/20 rounded-xl p-4 font-mono text-sm text-teal-300 max-h-36 overflow-y-auto leading-relaxed break-all">
                        {formatDNA(dnaOutput.slice(0, 300))}
                        {dnaOutput.length > 300 && (
                          <span className="text-slate-500">
                            {" "}
                            ...+{dnaOutput.length - 300} more nucleotides
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                          <div className="text-xl font-semibold text-white">
                            {dnaOutput.length.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-400">Nucleotides</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3 text-center">
                          <div className="text-xl font-semibold text-white">
                            {(dnaOutput.length / 4).toFixed(0)} bp
                          </div>
                          <div className="text-xs text-slate-400">Base pairs</div>
                        </div>
                      </div>

                      {nucleotideCounts && (
                        <div className="mt-2 grid grid-cols-4 gap-1.5">
                          {Object.entries(nucleotideCounts).map(([base, count]) => (
                            <div
                              key={base}
                              className="bg-white/10 rounded-lg p-2 text-center"
                            >
                              <div
                                className={`text-lg font-bold ${base === "A"
                                    ? "text-green-400"
                                    : base === "T"
                                      ? "text-blue-400"
                                      : base === "G"
                                        ? "text-yellow-400"
                                        : "text-rose-400"
                                  }`}
                              >
                                {base}
                              </div>
                              <div className="text-xs text-slate-400">{count}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={handleCopy}
                        className="mt-3 text-xs text-teal-400 hover:text-teal-300 transition"
                      >
                        {copied ? "✓ Copied!" : "Copy sequence"}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center text-slate-500 text-sm h-36 flex items-center justify-center">
                      Your DNA sequence will appear here
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Encoding method: Binary → Base-4 mapping (A=00, T=01, G=10,
                C=11). Same principle used in Microsoft Research DNA Storage and
                Catalog Technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Vision roadmap */}
        <div className="mt-14 fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8">
            Where we're going
          </h2>
          <div className="space-y-4">
            {[
              {
                phase: "Phase 1 — Now",
                title: "Preventive Genetics Platform",
                desc: "AI risk assessment, report analysis, personalized prevention.",
                active: true,
              },
              {
                phase: "Phase 2 — Next",
                title: "Lab Integration + ABHA Connect",
                desc: "Direct integration with diagnostic labs and India's ABHA health ID.",
                active: false,
              },
              {
                phase: "Phase 3 — Vision",
                title: "HelixLab Virtual Research",
                desc: "Full virtual biotech environment — PCR simulation, CRISPR sandbox, protein viewers.",
                active: false,
              },
              {
                phase: "Phase 4 — Future",
                title: "Democratized Genomic Medicine",
                desc: "AI-native genomic sequencing, drug interaction modeling, precision therapy guidance.",
                active: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border flex gap-5 items-start ${item.active
                    ? "border-teal-300 bg-teal-50"
                    : "border-slate-200 bg-white"
                  }`}
              >
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${item.active ? "bg-teal-500" : "bg-slate-300"
                    }`}
                />
                <div>
                  <div
                    className={`text-xs font-semibold uppercase tracking-wide mb-1 ${item.active ? "text-teal-600" : "text-slate-500"
                      }`}
                  >
                    {item.phase}
                  </div>
                  <div className="text-base font-semibold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-slate-600 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 fade-up">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                Start with prevention today.
              </h3>
              <p className="mt-1 text-slate-600">
                While HelixLab grows, your health intelligence starts now.
              </p>
            </div>
            <Link href="/assessment">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-7 h-12"
              >
                Take the Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}