'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, MessageCircle, XCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface EnquiryValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

interface ToastState {
  type: 'success' | 'error';
  text: string;
}

const emptyValues: EnquiryValues = { name: '', phone: '', email: '', subject: '', message: '' };

function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a valid 10-digit phone number.';
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'That email looks incomplete.';
  if (values.subject.trim().length < 2) errors.subject = 'Tell us what you need printed.';
  return errors;
}

const fieldClasses =
  'w-full rounded-2xl bg-white px-4 py-3.5 text-sm text-ink ring-1 ring-ink/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-blue';

/** Enquiry form that composes a ready-to-send WhatsApp message. */
export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<EnquiryValues>(() => ({ ...emptyValues, subject: searchParams.get('subject') ?? '' }));
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!searchParams.get('subject')) return;
    const timer = window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleEnquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateEnquiry(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const lines = [
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        values.email ? `Email: ${values.email}` : null,
        `Looking for: ${values.subject}`,
        values.message ? `Message: ${values.message}` : null,
      ].filter(Boolean);
      const opened = window.open(buildWhatsAppLink(lines.join('\n')), '_blank');
      if (!opened) throw new Error('Popup blocked');
      opened.opener = null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      setValues(emptyValues);
      setToast({ type: 'success', text: 'WhatsApp opened with your enquiry — just press send.' });
    } catch (error) {
      console.error('Enquiry could not be opened in WhatsApp', error);
      setToast({ type: 'error', text: 'Could not open WhatsApp. Please allow pop-ups or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof EnquiryValues) =>
    errors[field] ? (
      <span id={`${field}-error`} role="alert" className="mt-1.5 block text-xs font-medium text-brand-red">
        {errors[field]}
      </span>
    ) : null;

  return (
    <>
      <form ref={formRef} onSubmit={handleEnquirySubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Name *</span>
            <input
              name="name"
              value={values.name}
              onChange={handleFieldChange}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={fieldClasses}
            />
            {renderError('name')}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Phone *</span>
            <input
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleFieldChange}
              placeholder="10-digit mobile number"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={fieldClasses}
            />
            {renderError('phone')}
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Email (optional)</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleFieldChange}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClasses}
          />
          {renderError('email')}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">What do you need printed? *</span>
          <input
            name="subject"
            value={values.subject}
            onChange={handleFieldChange}
            placeholder="e.g. 5,000 visiting cards, vertical boxes, bottle labels…"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={fieldClasses}
          />
          {renderError('subject')}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Message</span>
          <textarea
            name="message"
            value={values.message}
            onChange={handleFieldChange}
            rows={5}
            placeholder="Quantity, size, finish, deadline — anything that helps us quote faster."
            className={`${fieldClasses} resize-y`}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Opening WhatsApp…
            </>
          ) : (
            <>
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </>
          )}
        </button>
      </form>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              role="status"
              className={`pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium text-white shadow-2xl ${
                toast.type === 'success' ? 'bg-brand-green' : 'bg-brand-red'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <XCircle className="h-5 w-5 shrink-0" />}
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
