"use client";

import React, { useState } from "react";
import { nanaContactContent } from "@/data/nanaContent";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const contact = nanaContactContent;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    service: "Commercial Video Production",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] py-14 lg:py-20 text-[#1B263B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8F3EC] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0B3B24] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8CC63F] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8CC63F]" />
            </span>
            {contact.badge}
          </div>
          {/* Signature Hook */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#0B3B24] lowercase">
            {contact.hook}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-[#1B263B]/75 font-light leading-relaxed">
            {contact.subhook}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Hotline Card */}
            <div className="overflow-hidden rounded-3xl bg-[#0B3B24] p-8 text-white shadow-xl shadow-[#0B3B24]/10 border border-[#8CC63F]/25">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8CC63F]">
                <Clock className="h-4 w-4" />
                <span>{contact.availability}</span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Direct Hotline
              </h2>
              <p className="mt-1 text-sm text-[#E8F3EC]/80 font-light">
                Call our production and account teams directly:
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="group flex items-center justify-between rounded-2xl bg-[#082A19] border border-[#8CC63F]/25 p-4 text-white transition-all hover:border-[#8CC63F] hover:bg-[#082A19]/90"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8CC63F]/20 text-[#8CC63F]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#E8F3EC]/60 block font-mono">
                        Primary Line
                      </span>
                      <span className="text-lg font-bold">{contact.phone}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#8CC63F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={`tel:${contact.secondaryPhoneTel}`}
                  className="group flex items-center justify-between rounded-2xl bg-[#082A19] border border-[#8CC63F]/25 p-4 text-white transition-all hover:border-[#8CC63F] hover:bg-[#082A19]/90"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8CC63F]/20 text-[#8CC63F]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#E8F3EC]/60 block font-mono">
                        Secondary Line
                      </span>
                      <span className="text-lg font-bold">
                        {contact.secondaryPhone}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#8CC63F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Locations & Social */}
            <div className="rounded-3xl border border-[#E8F3EC] bg-white p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EC]">
                  <MapPin className="h-5 w-5 text-[#0B3B24]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                    Hub Locations
                  </span>
                  <p className="mt-1 text-base font-semibold text-[#1B263B]">
                    {contact.locations}
                  </p>
                  <p className="mt-0.5 text-xs text-[#1B263B]/60">
                    Dual headquarters & on-location production crew
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#E8F3EC]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EC]">
                  <Mail className="h-5 w-5 text-[#0B3B24]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                    Official Inquiry
                  </span>
                  <p className="mt-1 text-base font-semibold text-[#1B263B]">
                    {contact.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#E8F3EC]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EC]">
                  <Sparkles className="h-5 w-5 text-[#0B3B24]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3B24]">
                    Social Media
                  </span>
                  <p className="mt-1 text-base font-semibold text-[#1B263B]">
                    <a
                      href={contact.socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0B3B24] hover:text-[#8CC63F] underline decoration-[#8CC63F]/40"
                    >
                      TikTok {contact.social}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E8F3EC] bg-white p-8 sm:p-10 shadow-xl shadow-[#0B3B24]/5">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B3B24]">
                Schedule Brand Discovery
              </h2>
              <p className="mt-1 text-sm text-[#1B263B]/70">
                Tell us about your brand goals. Our team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl bg-[#E8F3EC] p-8 text-center border border-[#8CC63F]/40 animate-in fade-in duration-300">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0B3B24] text-[#8CC63F] mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3B24]">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-sm text-[#082A19]/80 max-w-md mx-auto">
                    Thank you, {formData.name || "partner"}! Our team in {contact.locations} has received your inquiry and will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Dawit Bekele"
                        className="w-full rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="09..."
                        className="w-full rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Company or Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="e.g. Free Spring Water"
                        className="w-full rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-3 text-sm text-[#1B263B] focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
                      >
                        <option value="Commercial Video Production">
                          Commercial Video Production
                        </option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Performance Paid Advertising">
                          Performance Paid Advertising
                        </option>
                        <option value="Creative Strategy & Market Research">
                          Creative Strategy & Market Research
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                      Project Vision / Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your brand timeline, current challenges, or goals..."
                      className="w-full rounded-xl border border-[#E8F3EC] bg-[#F7F9F8] px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 focus:border-[#8CC63F] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B3B24] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#0B3B24]/15 transition-all hover:bg-[#082A19] hover:shadow-2xl hover:shadow-[#0B3B24]/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F]"
                  >
                    <span>Send Discovery Request</span>
                    <Send className="h-4 w-4 text-[#8CC63F]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
