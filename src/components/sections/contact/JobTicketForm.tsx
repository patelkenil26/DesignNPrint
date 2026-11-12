'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, Loader2, Lock, MessageCircle, XCircle } from 'lucide-react';
import JobTicketPreview, { type TicketRow } from '@/components/sections/contact/JobTicketPreview';
import MobileTicketBar from '@/components/sections/contact/MobileTicketBar';
import { deadlineChoices, productChoices, quantityChoices } from '@/data/contactData';
import { findProduct } from '@/data/productCatalog';
import { buildWhatsAppLink } from '@/data/siteConfig';

interface TicketValues {
  productIds: string[];
  typeName: string;
  quantityId: string;
  customQuantity: string;
  deadlineId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

type TicketErrors = Partial<Record<'need' | 'name' | 'phone' | 'email', string>>;

interface ToastState {
  type: 'success' | 'error';
  text: string;
}

const FORM_ID = 'job-ticket-form';

const emptyValues: TicketValues = {
  productIds: [],
  typeName: '',
  quantityId: '',
  customQuantity: '',
  deadlineId: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};

const fieldClasses =
  'w-full rounded-2xl bg-white px-4 py-3.5 text-base text-ink ring-1 sm:text-sm ring-ink/10 transition placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-brand-blue aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-brand-red';

const chipClasses = (isActive: boolean) =>
  `rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:py-2 duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
    isActive ? 'bg-ink text-white shadow-lg' : 'bg-white text-ink/75 ring-1 ring-ink/10 hover:-translate-y-0.5 hover:text-ink hover:ring-ink/30'
  }`;

const labelOf = (choices: Array<{ id: string; label: string }>, id: string): string =>
  choices.find((choice) => choice.id === id)?.label ?? '';

function validateTicket(values: TicketValues): TicketErrors {
  const errors: TicketErrors = {};
  if (values.productIds.length === 0 && values.notes.trim().length < 3) errors.need = 'Pick a product, or describe what you need.';
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (values.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a valid 10-digit phone number.';
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'That email looks incomplete.';
  return errors;
}

function buildTicketNumber(): string {
  const today = new Date();
  const monthDay = `${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  return `DNP-${monthDay}-${Math.floor(100 + Math.random() * 900)}`;
}

/** Step title; a green tick pops in as soon as the step has an answer — small wins keep people moving. */
function StepHeading({ step, title, hint, isDone }: { step: number; title: string; hint?: string; isDone: boolean }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-display text-sm font-bold text-brand-red">0{step}</span>
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      {hint && <span className="text-xs text-muted">{hint}</span>}
      <AnimatePresence>
        {isDone && (
          <motion.span
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            role="img"
            aria-label="Step done"
          >
            <Check className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * The enquiry form, built as a job ticket: choose product → quantity → deadline → contact.
 * A live ticket beside it fills in as you go, and "Send" opens WhatsApp with the whole ticket ready.
 */
export default function JobTicketForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<TicketValues>(() => {
    const presetProduct = searchParams.get('product');
    const presetSubject = searchParams.get('subject');
    return {
      ...emptyValues,
      productIds: presetProduct && findProduct(presetProduct) ? [presetProduct] : [],
      notes: presetSubject ? `Looking for: ${presetSubject}` : '',
    };
  });
  const [errors, setErrors] = useState<TicketErrors>({});
  const [ticketNumber, setTicketNumber] = useState('DNP-····-···');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    // generated after mount so server and client markup match
    const timer = window.setTimeout(() => setTicketNumber(buildTicketNumber()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isSent) return;
    const timer = window.setTimeout(() => setIsSent(false), 3500);
    return () => window.clearTimeout(timer);
  }, [isSent]);

  const selectedProduct = values.productIds.length === 1 ? findProduct(values.productIds[0]) : undefined;

  const quantityText = values.customQuantity.trim() || labelOf(quantityChoices, values.quantityId);
  const deadlineChoice = deadlineChoices.find((choice) => choice.id === values.deadlineId);
  const deadlineText = deadlineChoice ? `${deadlineChoice.label}${deadlineChoice.hint ? ` (${deadlineChoice.hint})` : ''}` : '';
  const productText = values.productIds.map((id) => labelOf(productChoices, id)).join(', ');

  const ticketRows: TicketRow[] = useMemo(
    () => [
      { id: 'product', label: 'Product', value: productText },
      { id: 'type', label: 'Type', value: values.typeName },
      { id: 'quantity', label: 'Quantity', value: quantityText },
      { id: 'deadline', label: 'Needed by', value: deadlineText },
      { id: 'name', label: 'Name', value: values.name.trim() },
      { id: 'phone', label: 'Phone', value: values.phone.trim() },
      { id: 'email', label: 'Email', value: values.email.trim() },
      { id: 'notes', label: 'Notes', value: values.notes.trim() },
    ],
    [productText, values.typeName, quantityText, deadlineText, values.name, values.phone, values.email, values.notes],
  );

  const progressSteps = [productText || values.notes.trim(), quantityText, deadlineText, values.name.trim(), values.phone.trim()];
  const filledStepCount = progressSteps.filter(Boolean).length;
  const ticketProgress = filledStepCount / progressSteps.length;
  const stepsLeft = progressSteps.length - filledStepCount;
  const isTicketReady = stepsLeft === 0;

  const updateValue = <Key extends keyof TicketValues>(key: Key, value: TicketValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, need: key === 'productIds' || key === 'notes' ? undefined : current.need, [key]: undefined }));
  };

  const handleProductToggle = (productId: string) => {
    const nextIds = values.productIds.includes(productId)
      ? values.productIds.filter((id) => id !== productId)
      : [...values.productIds, productId];
    setValues((current) => ({ ...current, productIds: nextIds, typeName: nextIds.length === 1 && nextIds[0] === current.productIds[0] ? current.typeName : '' }));
    setErrors((current) => ({ ...current, need: undefined }));
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateValue(event.target.name as 'name' | 'phone' | 'email' | 'notes' | 'customQuantity', event.target.value);
    if (event.target.name === 'customQuantity') setValues((current) => ({ ...current, quantityId: '' }));
  };

  const handleTicketSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateTicket(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      window.setTimeout(() => document.querySelector<HTMLElement>(`#${FORM_ID} [aria-invalid="true"]`)?.focus(), 0);
      return;
    }

    setIsSending(true);
    try {
      const message = [
        'Hi Design N Print, I would like a quote.',
        `Job ticket: ${ticketNumber}`,
        ...ticketRows.filter((row) => row.value).map((row) => `${row.label}: ${row.value}`),
      ].join('\n');
      const opened = window.open(buildWhatsAppLink(message), '_blank');
      if (!opened) throw new Error('Popup blocked');
      opened.opener = null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSent(true);
      setToast({ type: 'success', text: 'WhatsApp opened with your job ticket — just press send.' });
      window.setTimeout(() => {
        setValues(emptyValues);
        setTicketNumber(buildTicketNumber());
      }, 3500);
    } catch (error) {
      console.error('Job ticket could not be opened in WhatsApp', error);
      setToast({ type: 'error', text: 'Could not open WhatsApp. Please allow pop-ups or call us directly.' });
    } finally {
      setIsSending(false);
    }
  };

  const renderError = (field: keyof TicketErrors) =>
    errors[field] ? (
      <span id={`${field}-error`} role="alert" className="mt-1.5 block text-xs font-medium text-brand-red">
        {errors[field]}
      </span>
    ) : null;

  return (
    <>
      <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* phones: the live ticket rides along as a slim bar under the navbar */}
        <div className="sticky top-[var(--nav-height)] z-20 -mx-5 sm:-mx-10 lg:hidden">
          <MobileTicketBar
            ticketNumber={ticketNumber}
            rows={ticketRows}
            progress={ticketProgress}
            filledSteps={filledStepCount}
            totalSteps={progressSteps.length}
            isSending={isSending}
            isSent={isSent}
            formId={FORM_ID}
          />
        </div>

        <form id={FORM_ID} onSubmit={handleTicketSubmit} noValidate className="space-y-8 rounded-3xl bg-paper p-5 shadow-xl ring-1 ring-ink/5 sm:space-y-9 sm:p-9">
          <fieldset>
            <legend className="sr-only">What do you need?</legend>
            <StepHeading step={1} title="What do you need?" hint="pick one or more" isDone={Boolean(progressSteps[0])} />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Products">
              {productChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  aria-pressed={values.productIds.includes(choice.id)}
                  onClick={() => handleProductToggle(choice.id)}
                  className={chipClasses(values.productIds.includes(choice.id))}
                >
                  {choice.label}
                </button>
              ))}
            </div>
            {renderError('need')}

            <AnimatePresence initial={false}>
              {selectedProduct && (
                <motion.div
                  key={selectedProduct.slug}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Which type of {selectedProduct.name.toLowerCase()}? <span className="font-normal normal-case tracking-normal">(optional)</span>
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label={`${selectedProduct.name} types`}>
                    {selectedProduct.types.map((type) => (
                      <button
                        key={type.name}
                        type="button"
                        aria-pressed={values.typeName === type.name}
                        onClick={() => updateValue('typeName', values.typeName === type.name ? '' : type.name)}
                        className={chipClasses(values.typeName === type.name)}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </fieldset>

          <fieldset>
            <legend className="sr-only">How many?</legend>
            <StepHeading step={2} title="How many?" isDone={Boolean(progressSteps[1])} />
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Quantity">
              {quantityChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  aria-pressed={values.quantityId === choice.id && !values.customQuantity}
                  onClick={() => setValues((current) => ({ ...current, quantityId: current.quantityId === choice.id ? '' : choice.id, customQuantity: '' }))}
                  className={chipClasses(values.quantityId === choice.id && !values.customQuantity)}
                >
                  {choice.label}
                </button>
              ))}
              <input
                name="customQuantity"
                value={values.customQuantity}
                onChange={handleFieldChange}
                inputMode="numeric"
                placeholder="or type a number"
                aria-label="Custom quantity"
                className={`${fieldClasses} !w-44 !rounded-full !py-2`}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="sr-only">When do you need it?</legend>
            <StepHeading step={3} title="When do you need it?" isDone={Boolean(progressSteps[2])} />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Deadline">
              {deadlineChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  aria-pressed={values.deadlineId === choice.id}
                  onClick={() => updateValue('deadlineId', values.deadlineId === choice.id ? '' : choice.id)}
                  className={chipClasses(values.deadlineId === choice.id)}
                >
                  {choice.label}
                  {choice.hint && <span className="ml-1.5 text-xs opacity-70">· {choice.hint}</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="sr-only">Who should we reply to?</legend>
            <StepHeading step={4} title="Who should we reply to?" isDone={Boolean(progressSteps[3] && progressSteps[4])} />
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
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={fieldClasses}
                />
                {renderError('phone')}
              </label>
            </div>
            <label className="mt-4 block">
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
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Anything else?</span>
              <textarea
                name="notes"
                value={values.notes}
                onChange={handleFieldChange}
                rows={4}
                placeholder="Size, finish, artwork status — anything that helps us quote faster."
                className={`${fieldClasses} resize-y`}
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={isSending}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:hidden${isTicketReady ? ' animate-ring-pulse' : ''}`}
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Opening WhatsApp…
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </>
            )}
          </button>
          <p className="-mt-3 flex items-center justify-center gap-1.5 text-center text-xs leading-relaxed text-muted sm:-mt-4" aria-live="polite">
            <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
            {isTicketReady
              ? 'All set — opens in WhatsApp, nothing is stored on this site.'
              : `${stepsLeft} quick ${stepsLeft === 1 ? 'step' : 'steps'} left — or send now and we will ask the rest.`}
          </p>
        </form>

        <div className="hidden lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)] lg:block">
          <JobTicketPreview
            ticketNumber={ticketNumber}
            rows={ticketRows}
            progress={ticketProgress}
            isSending={isSending}
            isSent={isSent}
            formId={FORM_ID}
          />
          <p className="mt-4 text-center text-xs leading-relaxed text-muted">
            Your ticket opens in WhatsApp, ready to send. Nothing is stored on this website.
          </p>
        </div>
      </div>

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
