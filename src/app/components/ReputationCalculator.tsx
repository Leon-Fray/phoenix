"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  Users,
  AlertTriangle,
  ChevronDown,
  Star,
  Info,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { value: "restaurant", label: "Restaurant / Food Service", multiplier: 1.0 },
  { value: "dental", label: "Dentist / Medical", multiplier: 1.0 },
  { value: "retail", label: "Retail / E-commerce", multiplier: 1.0 },
  { value: "plumber", label: "Plumber", multiplier: 1.3 },
  { value: "hvac", label: "HVAC / Electrician", multiplier: 1.3 },
  { value: "movers", label: "Movers", multiplier: 1.2 },
  { value: "contractor", label: "General Contractor", multiplier: 1.3 },
  { value: "lawyer", label: "Lawyer / Legal", multiplier: 1.0 },
  { value: "realestate", label: "Real Estate Agent", multiplier: 1.3 },
  { value: "autoshop", label: "Auto Shop / Mechanic", multiplier: 1.3 },
];

type GoogleRating = "1-2" | "3" | "4+";
type YelpRating = "1-2" | "3" | "4+";
type RedditSentiment = "negative" | "mixed" | "positive";

function googleTax(r: GoogleRating) {
  if (r === "1-2") return 0.25;
  if (r === "3") return 0.15;
  return 0;
}
function yelpTax(r: YelpRating) {
  if (r === "1-2") return 0.15;
  if (r === "3") return 0.1;
  return 0;
}
const glassdoorTax = 0.05; // fixed if "negative"
function redditTax(s: RedditSentiment) {
  if (s === "negative") return 0.2;
  if (s === "mixed") return 0.1;
  return 0;
}

// Slider fill style helper
function sliderFill(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #0d9488 0%, #0d9488 ${pct}%, #cbd5e1 ${pct}%, #cbd5e1 100%)`,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-guardrep-500 mb-3">
      {children}
      {tooltip && (
        <span title={tooltip} className="cursor-help">
          <Info className="w-3.5 h-3.5 text-guardrep-400" />
        </span>
      )}
    </div>
  );
}

function RatingToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; taxLabel: string; color: string }[];
}) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-xl py-2.5 px-3 text-center transition-all border text-sm font-semibold ${
            value === o.value
              ? `${o.color} shadow-sm`
              : "border-guardrep-200 bg-guardrep-50 text-guardrep-500 hover:border-guardrep-300"
          }`}
        >
          <div>{o.label}</div>
          <div
            className={`text-xs mt-0.5 font-normal ${
              value === o.value ? "opacity-90" : "opacity-60"
            }`}
          >
            {o.taxLabel}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReputationCalculator() {
  // Core inputs
  const [spend, setSpend] = useState(500);
  const [target, setTarget] = useState(10);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);

  // Platform ratings
  const [googleRating, setGoogleRating] = useState<GoogleRating>("3");
  const [yelpRating, setYelpRating] = useState<YelpRating>("4+");
  const [glassdoorNegative, setGlassdoorNegative] = useState(false);
  const [reddit, setReddit] = useState<RedditSentiment>("mixed");

  // ── Formula ──────────────────────────────────────────────────────────────
  const { revenueLost, totalTaxPct, potentialRevenue } = useMemo(() => {
    let tax =
      googleTax(googleRating) +
      yelpTax(yelpRating) +
      (glassdoorNegative ? glassdoorTax : 0) +
      redditTax(reddit);

    if (tax > 0.7) tax = 0.7;
    tax *= industry.multiplier;
    // Re-cap after multiplier
    if (tax > 0.7) tax = 0.7;

    const potential = spend * target;
    return {
      revenueLost: Math.round(potential * tax),
      totalTaxPct: Math.round(tax * 100),
      potentialRevenue: potential,
    };
  }, [spend, target, industry, googleRating, yelpRating, glassdoorNegative, reddit]);

  const isHighStakes = industry.multiplier > 1.0;
  const leakSeverity =
    totalTaxPct >= 40 ? "critical" : totalTaxPct >= 20 ? "serious" : "moderate";

  const severityConfig = {
    critical: {
      bar: "bg-red-500",
      label: "Critical Leak",
      textColor: "text-red-400",
    },
    serious: {
      bar: "bg-orange-400",
      label: "Serious Leak",
      textColor: "text-orange-400",
    },
    moderate: {
      bar: "bg-yellow-400",
      label: "Moderate Leak",
      textColor: "text-yellow-400",
    },
  }[leakSeverity];

  return (
    <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-guardrep-200/60 overflow-hidden max-w-4xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-guardrep-900 to-guardrep-800 px-8 py-5 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-accent-400 flex-shrink-0" />
        <div>
          <p className="text-white font-bold text-base leading-tight">
            Reputation Tax Calculator
          </p>
          <p className="text-guardrep-400 text-xs mt-0.5">
            Weighted loss across every platform you appear on
          </p>
        </div>
      </div>

      <div className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* ── LEFT: Core Inputs ──────────────────────────────────────── */}
        <div className="space-y-8">
          <h3 className="font-bold text-guardrep-900 text-sm uppercase tracking-widest border-b border-guardrep-100 pb-3">
            Your Business
          </h3>

          {/* Avg Customer Spend */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-guardrep-700">
                <DollarSign className="w-4 h-4 text-accent-600" />
                Avg Customer Spend
              </label>
              <span className="text-2xl font-black text-guardrep-900 tabular-nums">
                ${spend.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={sliderFill(spend, 100, 10000)}
            />
            <div className="flex justify-between text-xs text-guardrep-400 mt-1.5">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Target New Customers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-guardrep-700">
                <Users className="w-4 h-4 text-accent-600" />
                Target New Customers/Mo
              </label>
              <span className="text-2xl font-black text-guardrep-900 tabular-nums">
                {target}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              step={1}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={sliderFill(target, 1, 200)}
            />
            <div className="flex justify-between text-xs text-guardrep-400 mt-1.5">
              <span>1</span>
              <span>200 customers</span>
            </div>
          </div>

          {/* Industry Select */}
          <div>
            <SectionLabel tooltip="High-trust industries (movers, contractors) face a 1.2–1.3× tax multiplier because customers vet them more carefully.">
              Industry
            </SectionLabel>
            <div className="relative">
              <select
                value={industry.value}
                onChange={(e) =>
                  setIndustry(
                    INDUSTRIES.find((i) => i.value === e.target.value) ??
                      INDUSTRIES[0]
                  )
                }
                className="w-full appearance-none rounded-xl border border-guardrep-200 bg-guardrep-50 px-4 py-3 pr-10 text-sm font-semibold text-guardrep-900 focus:outline-none focus:ring-2 focus:ring-accent-400 cursor-pointer"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                    {i.multiplier > 1 ? ` (${i.multiplier}× trust tax)` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-guardrep-400" />
            </div>
            {isHighStakes && (
              <p className="mt-2 text-xs text-amber-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                High-stakes industry — {industry.multiplier}× tax multiplier applied.
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Platform Ratings ────────────────────────────────── */}
        <div className="space-y-6">
          <h3 className="font-bold text-guardrep-900 text-sm uppercase tracking-widest border-b border-guardrep-100 pb-3">
            Your Current Ratings
          </h3>

          {/* Google */}
          <div>
            <SectionLabel tooltip="Google is your highest-traffic review platform.">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              Google Rating
            </SectionLabel>
            <RatingToggle
              value={googleRating}
              onChange={setGoogleRating}
              options={[
                {
                  value: "1-2",
                  label: "1–2 Stars",
                  taxLabel: "−25% tax",
                  color: "bg-red-50 border-red-300 text-red-700",
                },
                {
                  value: "3",
                  label: "3 Stars",
                  taxLabel: "−15% tax",
                  color: "bg-orange-50 border-orange-300 text-orange-700",
                },
                {
                  value: "4+",
                  label: "4+ Stars",
                  taxLabel: "No tax",
                  color: "bg-emerald-50 border-emerald-300 text-emerald-700",
                },
              ]}
            />
          </div>

          {/* Yelp */}
          <div>
            <SectionLabel tooltip="Yelp's review algorithm heavily influences foot traffic and local discovery.">
              <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              Yelp Rating
            </SectionLabel>
            <RatingToggle
              value={yelpRating}
              onChange={setYelpRating}
              options={[
                {
                  value: "1-2",
                  label: "1–2 Stars",
                  taxLabel: "−15% tax",
                  color: "bg-red-50 border-red-300 text-red-700",
                },
                {
                  value: "3",
                  label: "3 Stars",
                  taxLabel: "−10% tax",
                  color: "bg-orange-50 border-orange-300 text-orange-700",
                },
                {
                  value: "4+",
                  label: "4+ Stars",
                  taxLabel: "No tax",
                  color: "bg-emerald-50 border-emerald-300 text-emerald-700",
                },
              ]}
            />
          </div>

          {/* Glassdoor */}
          <div>
            <SectionLabel tooltip="Negative Glassdoor reviews affect employee quality and hiring, costing you 5% of potential revenue.">
              <Star className="w-3.5 h-3.5 fill-green-500 text-green-500" />
              Glassdoor
            </SectionLabel>
            <div className="flex gap-3">
              {[
                {
                  active: glassdoorNegative,
                  label: "Negative Reviews",
                  sub: "−5% (hiring tax)",
                  set: true,
                  color: "bg-red-50 border-red-300 text-red-700",
                },
                {
                  active: !glassdoorNegative,
                  label: "Clean / N/A",
                  sub: "No tax",
                  set: false,
                  color: "bg-emerald-50 border-emerald-300 text-emerald-700",
                },
              ].map((opt) => (
                <button
                  key={String(opt.set)}
                  onClick={() => setGlassdoorNegative(opt.set)}
                  className={`flex-1 rounded-xl py-2.5 px-3 text-center transition-all border text-sm font-semibold ${
                    opt.active
                      ? `${opt.color} shadow-sm`
                      : "border-guardrep-200 bg-guardrep-50 text-guardrep-500 hover:border-guardrep-300"
                  }`}
                >
                  <div>{opt.label}</div>
                  <div className="text-xs mt-0.5 font-normal opacity-70">
                    {opt.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reddit */}
          <div>
            <SectionLabel tooltip="Reddit threads rank on Google searches — a negative thread on page 1 can cost you 20% of potential customers.">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              Reddit / Search Sentiment
            </SectionLabel>
            <RatingToggle
              value={reddit}
              onChange={setReddit}
              options={[
                {
                  value: "negative",
                  label: "All Negative",
                  taxLabel: "−20% tax",
                  color: "bg-red-50 border-red-300 text-red-700",
                },
                {
                  value: "mixed",
                  label: "Mixed",
                  taxLabel: "−10% tax",
                  color: "bg-orange-50 border-orange-300 text-orange-700",
                },
                {
                  value: "positive",
                  label: "All Positive",
                  taxLabel: "No tax",
                  color: "bg-emerald-50 border-emerald-300 text-emerald-700",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── Result Panel ─────────────────────────────────────────────────── */}
      <div className="mx-7 mb-7 sm:mx-10 sm:mb-10 rounded-2xl bg-gradient-to-br from-guardrep-900 via-guardrep-800 to-guardrep-900 overflow-hidden">
        {/* Severity progress bar */}
        <div className="h-1.5 bg-guardrep-700/50">
          <div
            className={`h-full transition-all duration-500 ${severityConfig.bar}`}
            style={{ width: `${Math.min(totalTaxPct / 70 * 100, 100)}%` }}
          />
        </div>

        <div className="p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0d948828_0%,transparent_65%)] pointer-events-none" />

          {/* Tax badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
            <span className={`text-xs font-bold uppercase tracking-widest ${severityConfig.textColor}`}>
              {severityConfig.label}
            </span>
            <span className="text-guardrep-400 text-xs">·</span>
            <span className="text-guardrep-300 text-xs font-mono">
              Combined Tax: {totalTaxPct}%
            </span>
            {isHighStakes && (
              <>
                <span className="text-guardrep-400 text-xs">·</span>
                <span className="text-amber-400 text-xs font-semibold">
                  {industry.multiplier}× multiplier
                </span>
              </>
            )}
          </div>

          {/* Main figure */}
          <p className="text-guardrep-400 text-xs font-semibold uppercase tracking-widest mb-2">
            Potential Revenue Lost
          </p>
          <p className="text-6xl sm:text-7xl font-black text-white tabular-nums leading-none mb-1">
            ${revenueLost.toLocaleString()}
          </p>
          <p className="text-guardrep-400 text-sm mb-6">
            per month
            <span className="text-guardrep-600 mx-2">·</span>
            out of{" "}
            <span className="text-guardrep-300 font-semibold">
              ${potentialRevenue.toLocaleString()}
            </span>{" "}
            potential
          </p>

          {/* Pitch copy */}
          <p className="text-guardrep-200 text-base leading-relaxed max-w-lg mx-auto">
            At a{" "}
            <span className="text-accent-400 font-bold">
              ${revenueLost.toLocaleString()} monthly leak
            </span>
            , your reputation is your biggest expense. Our{" "}
            <span className="text-white font-bold">$1,500 setup</span> stops
            the leak instantly.
          </p>

          {/* Tax breakdown pills */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-2 text-xs">
            {googleTax(googleRating) > 0 && (
              <span className="bg-red-900/30 border border-red-500/20 text-red-300 rounded-full px-3 py-1">
                Google −{googleTax(googleRating) * 100}%
              </span>
            )}
            {yelpTax(yelpRating) > 0 && (
              <span className="bg-red-900/30 border border-red-500/20 text-red-300 rounded-full px-3 py-1">
                Yelp −{yelpTax(yelpRating) * 100}%
              </span>
            )}
            {glassdoorNegative && (
              <span className="bg-red-900/30 border border-red-500/20 text-red-300 rounded-full px-3 py-1">
                Glassdoor −5%
              </span>
            )}
            {redditTax(reddit) > 0 && (
              <span className="bg-red-900/30 border border-red-500/20 text-red-300 rounded-full px-3 py-1">
                Reddit −{redditTax(reddit) * 100}%
              </span>
            )}
            {isHighStakes && (
              <span className="bg-amber-900/30 border border-amber-500/20 text-amber-300 rounded-full px-3 py-1">
                Industry {industry.multiplier}× applied
              </span>
            )}
            {totalTaxPct === 0 && (
              <span className="bg-emerald-900/30 border border-emerald-500/20 text-emerald-300 rounded-full px-3 py-1">
                ✓ No active reputation tax
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
