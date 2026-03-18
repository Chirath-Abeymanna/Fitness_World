"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/lib/contact";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone && !/^[+\d\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error for field as user types
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setIsSuccess(true);
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        setErrors({});
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg("Failed to send message. Please try again later.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-5 bg-card/50 rounded-2xl border border-ring/10"
        noValidate
      >
        {/* Full Name */}
        <div className="grid gap-1.5">
          <Label htmlFor="fullName" className="text-white text-sm">
            Full Name
          </Label>
          <Input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className={`bg-transparent border-0 border-b rounded-none px-0 text-white placeholder:text-white/30 h-9 shadow-none focus:ring-0 focus-visible:ring-0 transition-colors duration-300 ${
              errors.fullName
                ? "border-red-500 focus-visible:border-red-500"
                : "border-white/20 focus-visible:border-primary"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-400 text-[11px] mt-0.5">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1.5">
          <Label htmlFor="email" className="text-white text-sm">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className={`bg-transparent border-0 border-b rounded-none px-0 text-white placeholder:text-white/30 h-9 shadow-none focus:ring-0 focus-visible:ring-0 transition-colors duration-300 ${
              errors.email
                ? "border-red-500 focus-visible:border-red-500"
                : "border-white/20 focus-visible:border-primary"
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-[11px] mt-0.5">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="grid gap-1.5">
          <Label htmlFor="phone" className="text-white text-sm">
            Phone Number <span className="text-white/30">(Optional)</span>
          </Label>
          <Input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            className={`bg-transparent border-0 border-b rounded-none px-0 text-white placeholder:text-white/30 h-9 shadow-none focus:ring-0 focus-visible:ring-0 transition-colors duration-300 ${
              errors.phone
                ? "border-red-500 focus-visible:border-red-500"
                : "border-white/20 focus-visible:border-primary"
            }`}
          />
          {errors.phone && (
            <p className="text-red-400 text-[11px] mt-0.5">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className="grid gap-1.5">
          <Label htmlFor="message" className="text-white text-sm">
            Your Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Enter Your Message"
            className={`bg-white/5 border py-3 text-white placeholder:text-white/30 min-h-25 resize-none transition-all duration-300 ${
              errors.message
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-white/10 focus-visible:ring-primary focus-visible:border-primary"
            }`}
          />
          {errors.message && (
            <p className="text-red-400 text-[11px] mt-0.5">{errors.message}</p>
          )}
        </div>

        {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}

        {isSuccess && (
          <div className="text-green-500 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Message sent successfully!
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group cursor-pointer flex items-center gap-2 bg-primary hover:bg-[#765f11] text-white h-10 px-5 rounded-lg font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
