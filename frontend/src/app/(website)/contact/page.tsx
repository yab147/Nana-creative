"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nanaContactContent } from "@/data/nanaContent";
import apiClient from "@/services/apiClient";
import { CreateContactDto, ContactResponseDto } from "@/types/api.types";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Clock,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export default function ContactPage() {
  const contact = nanaContactContent;

  const initialFormState: CreateContactDto = {
    name: "",
    phone: "",
    companyName: "",
    service: "Commercial Video Production",
    message: "",
  };

  const [formData, setFormData] = useState<CreateContactDto>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CreateContactDto, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<ContactResponseDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CreateContactDto, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      errors.phone = "Valid phone number is required (at least 8 digits).";
    }

    if (!formData.companyName.trim() || formData.companyName.trim().length < 2) {
      errors.companyName = "Company, organization, or brand name is required.";
    }

    if (!formData.service.trim()) {
      errors.service = "Please select a primary service needed.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Project vision or message must be at least 10 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    field: keyof CreateContactDto,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.contacts.createContact(formData);
      setSubmittedResponse(response);
      setSubmitSuccess(true);
      // Reset form fields back to blank defaults
      setFormData(initialFormState);
      setFieldErrors({});
    } catch (err: unknown) {
      console.error("[ContactPage] Submission failed:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "We encountered an issue submitting your inquiry. Please try again or reach out directly via our hotline.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmittedResponse(null);
    setErrorMessage(null);
    setFormData(initialFormState);
    setFieldErrors({});
  };

  return (
    <div className="min-h-screen bg-[#F7F9F8] py-10 sm:py-16 lg:py-20 text-[#1B263B]">
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
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-[#1B263B]/75 font-light leading-relaxed">
            {contact.subhook}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Direct Contact & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Hotline Card */}
            <div className="overflow-hidden rounded-3xl bg-[#0B3B24] p-6 sm:p-8 text-white shadow-xl shadow-[#0B3B24]/10 border border-[#8CC63F]/25">
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
            <div className="rounded-3xl border border-[#E8F3EC] bg-white p-6 sm:p-8 shadow-sm space-y-6">
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
                    Dual headquarters &amp; on-location production crew
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

          {/* Right Column: Live Interactive Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E8F3EC] bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-[#0B3B24]/5 relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#0B3B24]">
                    Schedule Brand Discovery
                  </h2>
                  <p className="mt-1 text-sm text-[#1B263B]/70">
                    Tell us about your brand goals. Our team will review your requirements and respond within 24 hours.
                  </p>
                </div>
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F3EC] text-[#0B3B24]">
                  <Send className="h-4 w-4" />
                </div>
              </div>

              {/* Toast Error Banner */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-xs sm:text-sm text-red-900"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-800">Inquiry Submission Failed</p>
                      <p className="mt-0.5 text-red-700/90">{errorMessage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="text-red-500 hover:text-red-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success View */}
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 rounded-2xl bg-[#E8F3EC] p-8 text-center border border-[#8CC63F]/40 shadow-xs"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0B3B24] text-[#8CC63F] mb-4 shadow-md">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B3B24]">
                    Discovery Inquiry Received!
                  </h3>
                  <p className="mt-2 text-sm text-[#082A19]/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#0B3B24]">{submittedResponse?.name || "partner"}</span>! Your inquiry has been securely routed to our creative directors in {contact.locations}.
                  </p>

                  {submittedResponse?.id && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 border border-[#8CC63F]/30 text-xs font-mono text-[#0B3B24]">
                      <span>Reference ID:</span>
                      <span className="font-bold text-[#1B263B]">{submittedResponse.id.slice(0, 8)}...</span>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-[#8CC63F]/20 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0B3B24] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-[#082A19] hover:shadow-md"
                    >
                      <RotateCcw className="h-3.5 w-3.5 text-[#8CC63F]" />
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="e.g. Dawit Bekele"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:bg-white focus:outline-none focus:ring-1 ${
                          fieldErrors.name
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500"
                            : "border-[#E8F3EC] bg-[#F7F9F8] focus:border-[#8CC63F] focus:ring-[#8CC63F]"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+251 91 123 4567"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:bg-white focus:outline-none focus:ring-1 ${
                          fieldErrors.phone
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500"
                            : "border-[#E8F3EC] bg-[#F7F9F8] focus:border-[#8CC63F] focus:ring-[#8CC63F]"
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company & Service Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Company or Organization <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="e.g. Free Spring Water"
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:bg-white focus:outline-none focus:ring-1 ${
                          fieldErrors.companyName
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500"
                            : "border-[#E8F3EC] bg-[#F7F9F8] focus:border-[#8CC63F] focus:ring-[#8CC63F]"
                        }`}
                      />
                      {fieldErrors.companyName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {fieldErrors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                        Primary Service Needed <span className="text-red-500">*</span>
                      </label>
                      <select
                        disabled={isSubmitting}
                        value={formData.service}
                        onChange={(e) => handleInputChange("service", e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B263B] transition-colors focus:bg-white focus:outline-none focus:ring-1 ${
                          fieldErrors.service
                            ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500"
                            : "border-[#E8F3EC] bg-[#F7F9F8] focus:border-[#8CC63F] focus:ring-[#8CC63F]"
                        }`}
                      >
                        <option value="Commercial Video Production">
                          Commercial Video Production
                        </option>
                        <option value="Social Media Marketing">
                          Social Media Marketing
                        </option>
                        <option value="Branding &amp; Visual Identity">
                          Branding &amp; Visual Identity
                        </option>
                        <option value="Performance Paid Advertising">
                          Performance Paid Advertising
                        </option>
                        <option value="SEO &amp; Web Development">
                          SEO &amp; Web Development
                        </option>
                        <option value="Creative Strategy &amp; Market Research">
                          Creative Strategy &amp; Market Research
                        </option>
                      </select>
                      {fieldErrors.service && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {fieldErrors.service}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message / Project Vision */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B3B24] mb-2">
                      Project Vision / Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your brand timeline, campaign goals, or commercial targets..."
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-[#1B263B] placeholder-[#1B263B]/40 transition-colors focus:bg-white focus:outline-none focus:ring-1 ${
                        fieldErrors.message
                          ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-500"
                          : "border-[#E8F3EC] bg-[#F7F9F8] focus:border-[#8CC63F] focus:ring-[#8CC63F]"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-xs text-red-600 font-medium">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B3B24] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#0B3B24]/15 transition-all hover:bg-[#082A19] hover:shadow-2xl hover:shadow-[#0B3B24]/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#8CC63F] disabled:opacity-60 disabled:pointer-events-none disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#8CC63F]" />
                        <span>Transmitting Discovery Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Discovery Request</span>
                        <Send className="h-4 w-4 text-[#8CC63F]" />
                      </>
                    )}
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
