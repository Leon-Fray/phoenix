"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  Wrench,
  TrendingUp,
  Check,
  Quote,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  Eye,
  Flag,
  Target,
  Crosshair,
} from "lucide-react";
import ReputationCalculator from "./components/ReputationCalculator";
import AuditModal from "./components/AuditModal";

/* ─── Inline SVG: Star Rating Recovery Chart ─────────────────────────────── */
function StarRecoveryChart() {
  // Decline then rise path on a 300×120 canvas
  const points = [
    [0, 80],
    [30, 95],
    [55, 115],
    [80, 105],
    [100, 100],
    [115, 85],  // treatment begins
    [135, 75],
    [160, 60],
    [185, 45],
    [215, 30],
    [250, 18],
    [300, 8],
  ] as [number, number][];

  const toPath = (pts: [number, number][]) =>
    pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

  const decline = points.slice(0, 6);
  const rise = points.slice(5);

  return (
    <svg viewBox="0 0 300 130" className="w-full" aria-hidden="true">
      {/* Grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          y1={i * 30 + 10}
          x2="300"
          y2={i * 30 + 10}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      {/* Decline (red) */}
      <path
        d={toPath(decline)}
        fill="none"
        stroke="#f87171"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Recovery (teal) */}
      <path
        d={toPath(rise)}
        fill="none"
        stroke="#0d9488"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Area fill under recovery */}
      <path
        d={`${toPath(rise)} L 300 130 L 115 130 Z`}
        fill="url(#tealGrad)"
        opacity="0.15"
      />
      <defs>
        <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Treatment start marker */}
      <line
        x1="115"
        y1="10"
        x2="115"
        y2="120"
        stroke="#0d9488"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <text x="117" y="22" fontSize="9" fill="#0d9488" fontWeight="600">
        Guard Rep Engaged
      </text>
      {/* End dot */}
      <circle cx="300" cy="8" r="5" fill="#0d9488" />
      <text x="262" y="5" fontSize="8" fill="#0f766e" fontWeight="700">
        4.7 ★
      </text>
    </svg>
  );
}

/* ─── Inline SVG: Search Rank Suppression Chart ─────────────────────────────*/
function RankSuppressionChart() {
  const stages = [
    { label: "Day 0", rank: 2 },
    { label: "Day 10", rank: 4 },
    { label: "Day 20", rank: 8 },
    { label: "Day 30", rank: 15 },
    { label: "Day 45", rank: 42 },
  ];

  const maxRank = 50;
  const chartH = 100;
  const chartW = 280;
  const barW = 38;
  const gap = (chartW - stages.length * barW) / (stages.length + 1);

  return (
    <svg viewBox="0 0 300 140" className="w-full" aria-hidden="true">
      {/* y-axis labels */}
      <text x="2" y="14" fontSize="8" fill="#94a3b8">Rank #1</text>
      <text x="2" y="114" fontSize="8" fill="#94a3b8">Rank #50</text>

      {stages.map((s, i) => {
        const x = gap + i * (barW + gap) + 20;
        const barH = (s.rank / maxRank) * chartH;
        const y = 120 - barH;
        const isFirst = i === 0;
        const isLast = i === stages.length - 1;
        const fill = isFirst
          ? "#f87171"
          : isLast
            ? "#0d9488"
            : "#94a3b8";

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx="4"
              fill={fill}
              opacity={isFirst || isLast ? 1 : 0.55}
            />
            <text
              x={x + barW / 2}
              y={y - 4}
              fontSize="9"
              textAnchor="middle"
              fill={isLast ? "#0f766e" : isFirst ? "#dc2626" : "#64748b"}
              fontWeight={isFirst || isLast ? "700" : "400"}
            >
              #{s.rank}
            </text>
            <text
              x={x + barW / 2}
              y={132}
              fontSize="7.5"
              textAnchor="middle"
              fill="#94a3b8"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Arrow trend line */}
      <path
        d="M 35 28 Q 160 108 265 108"
        fill="none"
        stroke="#0d9488"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0.6"
      />
      <polygon points="265,104 275,108 265,112" fill="#0d9488" opacity="0.6" />
    </svg>
  );
}

/* ─── Comparison table data ─────────────────────────────────────────────────*/
const comparisonRows = [
  {
    feature: "Review Monitoring",
    guardRep: "24/7 Automated Monitoring",
    others: "Once a month",
  },
  {
    feature: "Reddit & Search",
    guardRep: "Expert SEO & RPA Suppression",
    others: "No coverage",
  },
  {
    feature: "Review Gating",
    guardRep: "Custom Private Feedback Funnel",
    others: "Manual requests only",
  },
  {
    feature: "Platform Reach",
    guardRep: "Google, Yelp, Reddit, Threads",
    others: "Google only",
  },
  {
    feature: "Speed of Response",
    guardRep: "Same-day negative mitigation",
    others: "3–5 business days",
  },
  {
    feature: "Competitor Attacks",
    guardRep: "Proactive flagging & legal referral",
    others: "Not addressed",
  },
  {
    feature: "Reporting",
    guardRep: "Bi-weekly dashboard + alerts",
    others: "Monthly PDF at best",
  },
];

/* ─── Trust Bar data ────────────────────────────────────────────────────────*/
const trustMetrics = [
  { icon: Eye, label: "SEO Sentiment", sub: "Tracked & reported" },
  { icon: Flag, label: "Fraudulent Flags", sub: "Identified & reported" },
  { icon: Target, label: "Competitor Attacks", sub: "Detected & blocked" },
  { icon: Crosshair, label: "Keyword Suppression", sub: "28-day SERPs sweep" },
];

/* ─── Page ───────────────────────────────────────────────────────────────────*/
export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const openAuditModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsAuditModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-guardrep-50 text-guardrep-900 selection:bg-accent-200">
      {/* Navbar */}
      {/* Teal accent top bar */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
      <header className="fixed top-[3px] inset-x-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-guardrep-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-accent-700" />
            <span className="text-xl font-bold tracking-tight text-guardrep-900">Guard Rep</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-guardrep-600">
            <Link href="#process" className="hover:text-guardrep-900 transition-colors">Our Process</Link>
            <Link href="#pricing" className="hover:text-guardrep-900 transition-colors">Pricing</Link>
            <Link href="#results" className="hover:text-guardrep-900 transition-colors">Results</Link>
            <Link href="#advantage" className="hover:text-guardrep-900 transition-colors">Why Us</Link>
          </nav>
          <button
            onClick={openAuditModal}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-guardrep-900 rounded-lg hover:bg-guardrep-800 transition-colors shadow-sm"
          >
            Get a Free Audit
          </button>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white">
          {/* Teal glow blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-accent-200/40 via-accent-100/20 to-transparent -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-accent-100/30 via-transparent to-transparent -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-guardrep-100/50 via-white to-white -z-10" />

          <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 text-sm font-medium text-accent-800">
                  <Star className="w-4 h-4 fill-accent-500 text-accent-500" />
                  Specialists in Local Business Reputation
                </div>
              </div>
              <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-guardrep-900 sm:text-6xl leading-[1.1] text-balance">
                Stop losing customers to bad reviews.
              </h1>
              <p className="mt-6 text-lg leading-8 text-guardrep-600 sm:max-w-md lg:max-w-none text-balance">
                We help local businesses—plumbers, contractors, restaurants, and dentists—clean up their brand image. We repair your online reputation quietly and effectively, so you can focus on running your business without the drama.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  onClick={openAuditModal}
                  className="rounded-lg bg-accent-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-accent-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700 transition-all flex items-center gap-2"
                >
                  Fix My Reputation <ArrowRight className="w-4 h-4" />
                </button>
                <Link href="#process" className="text-base font-medium leading-6 text-guardrep-900 hover:text-guardrep-700 transition-colors">
                  See how we do it <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Hero Visual / Trust Indicator */}
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 rounded-xl bg-guardrep-50/50 mix-blend-multiply blur-2xl filter" />
                <div className="relative rounded-2xl bg-white shadow-xl shadow-guardrep-200/50 ring-1 ring-guardrep-200/50 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xl font-semibold text-guardrep-900 mb-6 font-sans">Platforms We Clean Up</h3>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="flex items-center justify-center">
                      <Image src="/google_logo.png" alt="Google" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/yelp_logo.png" alt="Yelp" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/reddit_logo.png" alt="Reddit" width={120} height={40} className="object-contain h-20 w-auto" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image src="/glassdoor_logo.svg" alt="Glassdoor" width={120} height={40} className="object-contain h-10 w-auto" />
                    </div>
                  </div>
                  <p className="mt-8 text-sm text-guardrep-500">Over 50+ local businesses restored.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3-Step Process Section ─────────────────────────────────────── */}
        <section id="process" className="py-24 sm:py-32 bg-gradient-to-br from-guardrep-50 via-accent-50/40 to-guardrep-50 border-t border-accent-200/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-accent-700">Clear Action Plan</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-guardrep-900 sm:text-4xl text-balance">
                Our 3-Step Process
              </p>
              <p className="mt-6 text-lg leading-8 text-guardrep-600">
                We take the burden of reputation management off your shoulders with a straightforward, transparent approach.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-guardrep-200/50 hover:shadow-md hover:ring-accent-200/60 transition-all border-l-4 border-accent-400/60">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-guardrep-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <Search className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 1: Audit &amp; Assess
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-guardrep-600">
                    <p className="flex-auto">
                      We perform a deep dive into your current online presence across Google, Yelp, and specialized platforms. We identify negative sentiment, unfair reviews, and areas of high leverage.
                    </p>
                  </dd>
                </div>

                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-guardrep-200/50 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-guardrep-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <Wrench className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 2: Respond &amp; Rebuild
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-guardrep-600">
                    <p className="flex-auto">
                      Our team professionally addresses existing complaints, flags illegitimate reviews for removal, and implements strategies to bury negative threads by generating positive, authentic engagement.
                    </p>
                  </dd>
                </div>

                <div className="flex flex-col bg-white rounded-2xl p-8 shadow-sm ring-1 ring-guardrep-200/50 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-guardrep-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 border border-accent-100">
                      <TrendingUp className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Step 3: Maintain &amp; Grow
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-guardrep-600">
                    <p className="flex-auto">
                      With your baseline restored, we deploy continuous monitoring and automated pathways to capture positive reviews from your happy customers, ensuring your brand stays top-tier.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── Pricing Section ────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-guardrep-900 sm:text-4xl text-balance">Simple, Transparent Pricing</h2>
              <p className="mt-6 text-lg leading-8 text-guardrep-600">
                No hidden fees. We fix the immediate bleeding with a one-time reset, and keep your reputation spotless with ongoing maintenance.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-guardrep-200/50 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none shadow-sm overflow-hidden">
              <div className="p-8 sm:p-10 lg:flex-auto bg-white">
                <h3 className="text-2xl font-bold tracking-tight text-guardrep-900">Reputation Reset (One-Time)</h3>
                <p className="mt-6 text-base leading-7 text-guardrep-600">
                  A comprehensive overhaul of your current brand image. Perfect for businesses suffering from an unwarranted wave of bad reviews or a specific negative thread.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-accent-700">What&apos;s included in the Reset</h4>
                  <div className="h-px flex-auto bg-guardrep-100" />
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-guardrep-600 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Current state full audit</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Review flagging &amp; removal requests</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Professional responses drafted</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-700" /> Reddit/Search baseline mitigation</li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-guardrep-50 py-10 text-center ring-1 ring-inset ring-guardrep-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full border-l border-guardrep-200/50 lg:border-l-0">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-guardrep-600">One-time flat fee</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-guardrep-900">$1,500</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-guardrep-600">USD</span>
                    </p>
                    <button
                      onClick={openAuditModal}
                      className="mt-10 block w-full rounded-md bg-accent-700 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700 transition-colors"
                    >
                      Start the Audit
                    </button>
                    <p className="mt-6 text-xs leading-5 text-guardrep-500">Typically delivered in 14-30 days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-guardrep-200/50 lg:mx-0 lg:flex lg:max-w-none shadow-sm overflow-hidden bg-guardrep-900">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-white">Monthly Maintenance</h3>
                <p className="mt-6 text-base leading-7 text-guardrep-300">
                  After your reset, ensure you never slip back. We monitor your brand daily and build a strong moat of positive reviews.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-accent-400">What&apos;s included in Maintenance</h4>
                  <div className="h-px flex-auto bg-guardrep-700" />
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-guardrep-300 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> 24/7 web monitoring</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Automated review requests</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Same-day negative mitigation</li>
                  <li className="flex gap-x-3"><Check className="h-6 w-5 flex-none text-accent-400" /> Bi-weekly reports</li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-guardrep-800/50 py-10 text-center ring-1 ring-inset ring-white/10 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-guardrep-300">Retainer</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-white">$500</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-guardrep-400">/ month</span>
                    </p>
                    <Link
                      href="#contact"
                      className="mt-10 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-guardrep-900 shadow-sm hover:bg-guardrep-50 transition-colors"
                    >
                      Subscribe
                    </Link>
                    <p className="mt-6 text-xs leading-5 text-guardrep-400">Cancel anytime. No lock-in contracts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE COST OF SILENCE — Reputation Calculator ────────────────── */}
        <section id="calculator" className="py-24 sm:py-32 bg-gradient-to-br from-guardrep-50 via-accent-50/30 to-guardrep-50 border-t border-accent-200/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
          {/* Decorative blob */}
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-accent-100/30 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-sm font-semibold text-red-700 mb-6">
                <TrendingDown className="w-4 h-4" />
                Revenue Leak Analysis
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-guardrep-900 sm:text-4xl text-balance">
                The Cost of Silence
              </h2>
              <p className="mt-6 text-lg leading-8 text-guardrep-600">
                Every day you wait is costing you real money. Use our calculator to see exactly how much your unmanaged reputation is bleeding each month.
              </p>
            </div>

            <ReputationCalculator />
          </div>
        </section>

        {/* ── RECOVERY TRAJECTORIES — Proof Section ──────────────────────── */}
        <section id="results" className="py-24 sm:py-32 bg-white border-t border-accent-200/40 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-accent-700">Visual Proof</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-guardrep-900 sm:text-4xl text-balance">
                Recovery Trajectories
              </p>
              <p className="mt-6 text-lg leading-8 text-guardrep-600">
                See real transformation with measurable results — no vague promises, just data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Card 1 — Star Rating Recovery */}
              <div className="bg-white rounded-3xl shadow-lg ring-1 ring-guardrep-200/60 overflow-hidden flex flex-col">
                {/* Card header */}
                <div className="bg-gradient-to-r from-guardrep-900 to-guardrep-800 px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-1">Case Study 01</p>
                    <h3 className="text-white font-bold text-lg leading-snug">Local Restaurant<br />Reputation Recovery</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-guardrep-400">Timeline</span>
                    <span className="text-accent-400 font-bold text-sm">60 Days</span>
                  </div>
                </div>

                {/* Chart area */}
                <div className="px-8 pt-8 pb-4 bg-guardrep-50/50">
                  <StarRecoveryChart />
                </div>

                {/* Stats row */}
                <div className="px-8 py-6 flex flex-col sm:flex-row items-stretch gap-4 border-t border-guardrep-100 mt-auto">
                  <div className="flex-1 rounded-xl bg-red-50 border border-red-100 px-5 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">Before</p>
                    <p className="text-2xl font-black text-red-600">3.1 ★</p>
                    <p className="text-xs text-red-400 mt-1">22 reviews</p>
                  </div>
                  <div className="flex items-center justify-center text-guardrep-300 font-bold text-xl">→</div>
                  <div className="flex-1 rounded-xl bg-accent-50 border border-accent-100 px-5 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-1">After 60 Days</p>
                    <p className="text-2xl font-black text-accent-700 flex items-center justify-center gap-1">
                      4.7 ★ <ArrowUpRight className="w-5 h-5" />
                    </p>
                    <p className="text-xs text-accent-500 mt-1">140+ reviews</p>
                  </div>
                </div>
              </div>

              {/* Card 2 — Search Rank Suppression */}
              <div className="bg-white rounded-3xl shadow-lg ring-1 ring-guardrep-200/60 overflow-hidden flex flex-col">
                {/* Card header */}
                <div className="bg-gradient-to-r from-guardrep-900 to-guardrep-800 px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-1">Case Study 02</p>
                    <h3 className="text-white font-bold text-lg leading-snug">Contractor Search<br />Burying Front Page Negative Review</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-guardrep-400">Timeline</span>
                    <span className="text-accent-400 font-bold text-sm">45 Days</span>
                  </div>
                </div>

                {/* Chart area */}
                <div className="px-8 pt-8 pb-4 bg-guardrep-50/50">
                  <RankSuppressionChart />
                  <p className="text-xs text-center text-guardrep-400 mt-2 italic">
                    Reddit thread search rank (higher = better suppressed)
                  </p>
                </div>

                {/* Stats row */}
                <div className="px-8 py-6 flex flex-col sm:flex-row items-stretch gap-4 border-t border-guardrep-100 mt-auto">
                  <div className="flex-1 rounded-xl bg-red-50 border border-red-100 px-5 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-1">Before</p>
                    <p className="text-2xl font-black text-red-600">Rank #2</p>
                    <p className="text-xs text-red-400 mt-1">Page 1 — visible</p>
                  </div>
                  <div className="flex items-center justify-center text-guardrep-300 font-bold text-xl">→</div>
                  <div className="flex-1 rounded-xl bg-accent-50 border border-accent-100 px-5 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-600 mb-1">After 45 Days</p>
                    <p className="text-2xl font-black text-accent-700 flex items-center justify-center gap-1">
                      Rank #42 <ArrowDownRight className="w-5 h-5" />
                    </p>
                    <p className="text-xs text-accent-500 mt-1">Page 4 — buried</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE GUARD REP ADVANTAGE — Comparison Table ───────────────────── */}
        <section id="advantage" className="py-24 sm:py-32 bg-guardrep-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-guardrep-800 via-guardrep-900 to-guardrep-950 -z-10" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-accent-400 uppercase tracking-widest">7-0 Advantage</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                The Guard Rep Advantage
              </p>
              <p className="mt-6 text-lg leading-8 text-guardrep-300">
                We&apos;re not a typical agency. Here&apos;s how we stack up across every dimension that matters.
              </p>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              {/* Header row */}
              <div className="grid grid-cols-3 bg-guardrep-800/80 px-6 py-4 border-b border-white/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-guardrep-400">Category</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-accent-400 text-center">Guard Rep</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-guardrep-400 text-center">Typical Agencies / DIY</div>
              </div>

              {/* Data rows */}
              {comparisonRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 px-6 py-5 border-b border-white/5 items-center gap-4 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-guardrep-900/60" : "bg-guardrep-800/30"
                    }`}
                >
                  {/* Feature label */}
                  <div className="text-sm font-semibold text-guardrep-200">{row.feature}</div>

                  {/* Guard Rep col */}
                  <div className="flex items-center justify-center gap-2 text-center">
                    <Check className="w-4 h-4 text-accent-400 flex-shrink-0" />
                    <span className="text-sm text-accent-300 font-medium leading-snug">{row.guardRep}</span>
                  </div>

                  {/* Others col */}
                  <div className="flex items-center justify-center gap-2 text-center">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-guardrep-400 leading-snug">{row.others}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA nudge */}
            <div className="mt-12 text-center">
              <button
                onClick={openAuditModal}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-700 px-8 py-4 text-base font-semibold text-white hover:bg-accent-600 transition-all shadow-lg shadow-accent-900/40"
              >
                Start with a Free Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ── Testimonials Section ───────────────────────────────────────── */}
        <section id="testimonials" className="py-24 sm:py-32 bg-guardrep-900 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-guardrep-800 via-guardrep-900 to-guardrep-950 -z-10" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-accent-400">Client Stories</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                Trusted by 50+ Local Business Owners
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-3 shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
                    <video
                      src="/testimonial1.mp4"
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-3 shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
                    <video
                      src="/testimonial2.mp4"
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-3 shadow-sm ring-1 ring-white/10 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
                    <video
                      src="/testimonial3.mp4"
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact / CTA Section ──────────────────────────────────────── */}
        <section id="contact" className="py-24 sm:py-32 bg-gradient-to-b from-white via-accent-50/30 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-100/40 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-guardrep-900 sm:text-4xl">Ready to take control of your reputation?</h2>
            <p className="mt-6 text-lg leading-8 text-guardrep-600">
              Stop letting a few bad reviews dictate your business growth. Get a free, confidential audit of your online presence today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openAuditModal}
                className="w-full sm:w-auto rounded-lg bg-accent-700 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-accent-800 transition-colors"
              >
                Request Free Audit
              </button>
              <a
                href="tel:+19298328875"
                className="w-full sm:w-auto rounded-lg bg-guardrep-50 border border-guardrep-200 px-8 py-4 text-base font-semibold text-guardrep-900 shadow-sm hover:bg-guardrep-100 transition-colors"
              >
                Call (929) 832-8875
              </a>
            </div>
            <p className="mt-6 text-sm text-guardrep-500">
              No obligation. We&apos;ll show you exactly what&apos;s hurting your brand and how to fix it.
            </p>
          </div>
        </section>

        {/* ── TRUST BAR — What We Track ──────────────────────────────────── */}
        <section id="trust-bar" className="bg-guardrep-950 border-t border-white/5 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-950/30 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Counter headline */}
            <div className="text-center mb-12">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                <span className="text-accent-400">2,400+</span> Negative Reviews Successfully Mitigated
              </p>
              <p className="mt-3 text-guardrep-400 text-sm">Across Google, Yelp, Reddit, Glassdoor, and Threads</p>
            </div>

            {/* Icon grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {trustMetrics.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-6 py-8 text-center hover:bg-white/10 hover:border-accent-500/30 transition-all group"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-900/60 border border-accent-700/40 group-hover:bg-accent-800/60 transition-colors">
                    <Icon className="w-7 h-7 text-accent-400" />
                  </div>
                  <p className="text-white font-bold text-sm">{label}</p>
                  <p className="text-guardrep-500 text-xs leading-relaxed">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-guardrep-950 py-12 border-t border-guardrep-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-accent-400 drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]" />
            <span className="text-lg font-bold tracking-tight text-white">Guard Rep</span>
          </div>
          <p className="text-sm text-guardrep-400">
            &copy; {new Date().getFullYear()} Guard Rep Reputation Management. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-guardrep-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      <AuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </div>
  );
}
