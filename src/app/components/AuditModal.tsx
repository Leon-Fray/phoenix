"use client";

import React, { useEffect, useState } from "react";
import { X, ShieldCheck, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-guardrep-950/40 backdrop-blur-md transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-guardrep-200/50 animate-in fade-in zoom-in duration-300">
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-guardrep-100 transition-colors text-guardrep-400 hover:text-guardrep-900 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column: Visual/Context */}
          <div className="hidden lg:flex lg:w-1/3 bg-guardrep-50 p-8 flex-col justify-between border-r border-guardrep-100">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-50 text-accent-700 border border-accent-100 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-guardrep-900 mb-4 leading-tight">
                Confidential<br />Reputation Audit
              </h3>
              <p className="text-sm text-guardrep-600 leading-relaxed">
                Our specialists will analyze your current presence and provide a clear recovery roadmap.
              </p>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-accent-600" />
                <span className="text-xs font-semibold text-guardrep-700 uppercase tracking-tight">Zero-Cost</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-accent-600" />
                <span className="text-xs font-semibold text-guardrep-700 uppercase tracking-tight">Secure & Private</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-accent-600" />
                <span className="text-xs font-semibold text-guardrep-700 uppercase tracking-tight">48-Hour TAT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex-1 p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-guardrep-900 mb-2">Request Your Free Audit</h2>
              <p className="text-sm text-guardrep-500">We&apos;ll show you exactly how to fix the &quot;bleeding&quot;.</p>
            </div>

            <form 
              action="https://formsubmit.co/hello@guardrep.com" 
              method="POST"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Redirect after submission (current URL placeholder) */}
              <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />
              
              {/* Spam prevention */}
              <input type="text" name="_honey" style={{ display: "none" }} />
              
              {/* Custom email subject */}
              <input type="hidden" name="_subject" value="New Reputation Audit Request - Guard Rep" />

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="name" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="email" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Work Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 text-left">
                <label htmlFor="company" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Company Name *</label>
                <input 
                  type="text" 
                  name="company" 
                  id="company" 
                  required 
                  placeholder="e.g. Elite Plumbing"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="phone" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  required 
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="website" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Website URL *</label>
                <input 
                  type="url" 
                  name="website" 
                  id="website" 
                  required 
                  placeholder="https://company.com"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="concerns" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">Primary Concerns *</label>
                <textarea 
                  name="concerns" 
                  id="concerns" 
                  rows={3} 
                  required 
                  placeholder="What negative threads or reviews are affecting you?"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all placeholder:text-guardrep-300 text-sm resize-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="heard" className="text-xs font-bold text-guardrep-700 uppercase tracking-wider ml-1">How did you hear about us?</label>
                <select 
                  name="heard" 
                  id="heard"
                  className="w-full px-4 py-2.5 bg-guardrep-50 border border-guardrep-200 rounded-xl focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 outline-none transition-all text-sm appearance-none"
                >
                  <option value="">-- Please select --</option>
                  <option value="google">Google Search</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                  <option value="podcast">Podcast</option>
                  <option value="social">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2 mt-4">
                <button 
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-700 text-white font-bold rounded-xl hover:bg-accent-800 focus:ring-4 focus:ring-accent-500/30 transition-all shadow-lg shadow-accent-700/20"
                >
                  Request Free Reputation Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="sm:col-span-2 text-center text-xs text-guardrep-400 mt-2">
                By submitting, you agree to our confidential analysis of your public data.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
