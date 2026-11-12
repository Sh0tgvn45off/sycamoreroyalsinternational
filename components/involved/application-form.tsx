"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LoaderCircle, Send } from "lucide-react";
import { forwardRef, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { emptyApplication, validateApplication, type ApplyErrors, type ApplyFields } from "@/lib/apply";
import { applicationTypes, interests, type ApplicationType } from "@/lib/content/involved";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = { state: "idle" | "sending" } | { state: "sent"; name: string; type: string } | { state: "error"; message: string };

type FieldProps = {
  name: keyof ApplyFields;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode;
};

function Field({ name, label, error, optional, children }: FieldProps) {
  const id = `apply-${name}`;
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-tertiary">(optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errId : undefined })}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pt-1.5 text-[13px] font-medium text-[#C2410C]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const invalid = "border-[#C2410C]/50 bg-[#FFF7F3] focus:border-[#C2410C]/60 focus:ring-[#C2410C]/15";

/** The application form: one segmented control picks Volunteer, Prayer Community or Skill Share. */
export const ApplicationForm = forwardRef<HTMLDivElement, { type: ApplicationType; onTypeChange: (t: ApplicationType) => void }>(
  function ApplicationForm({ type, onTypeChange }, ref) {
    const [values, setValues] = useState<ApplyFields>(emptyApplication);
    const [errors, setErrors] = useState<ApplyErrors>({});
    const [status, setStatus] = useState<Status>({ state: "idle" });
    const formId = useId();

    const fields = { ...values, appType: type };
    const set = (key: keyof ApplyFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const submit = async (e: React.FormEvent) => {
      e.preventDefault();
      const found = validateApplication(fields);
      setErrors(found);
      if (Object.keys(found).length) {
        const first = Object.keys(found)[0];
        document.getElementById(`apply-${first}`)?.focus();
        return;
      }
      setStatus({ state: "sending" });
      const body = new FormData();
      for (const [k, v] of Object.entries(fields)) body.append(k, v);
      try {
        const res = await fetch("/api/apply", { method: "POST", body });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: ApplyErrors };
        if (res.ok && data.ok) {
          const label = applicationTypes.find((t) => t.value === type)?.label ?? "application";
          setStatus({ state: "sent", name: fields.full_name.split(/\s+/)[0], type: label });
          setValues(emptyApplication);
          return;
        }
        if (data.errors) setErrors(data.errors);
        setStatus({ state: "error", message: data.message ?? "Something went wrong. Please try again." });
      } catch {
        setStatus({ state: "error", message: `You seem to be offline. Please try again, or email ${site.email}.` });
      }
    };

    const sending = status.state === "sending";

    return (
      <div ref={ref} className="card mx-auto max-w-3xl overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {status.state === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center px-6 py-16 text-center md:py-20"
              role="status"
            >
              <svg viewBox="0 0 52 52" className="size-20" aria-hidden>
                <motion.circle
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                  stroke="#3F7F2E"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M15 27l7 7 15-16"
                  fill="none"
                  stroke="#3F7F2E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <h3 className="mt-6 font-serif text-[30px] font-bold">Thank you{status.name ? `, ${status.name}` : ""}.</h3>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-secondary">
                Your {status.type.toLowerCase()} application has been sent and recorded. We’ll be in touch soon.
              </p>
              <Button variant="secondary" className="mt-8" onClick={() => setStatus({ state: "idle" })}>
                Send another application
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              id={formId}
              onSubmit={submit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 sm:p-10"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-[14px] text-ink-secondary">Select a category to begin.</p>
                <SegmentedControl id="apply-type" label="Application type" options={applicationTypes} value={type} onChange={onTypeChange} />
              </div>

              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <Field name="full_name" label="Full Name" error={errors.full_name}>
                  {(p) => <input {...p} name="full_name" autoComplete="name" value={values.full_name} onChange={set("full_name")} className={cn("field", errors.full_name && invalid)} />}
                </Field>
                <Field name="email" label="Email Address" error={errors.email}>
                  {(p) => <input {...p} type="email" name="email" autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} className={cn("field", errors.email && invalid)} />}
                </Field>
                <Field name="phone" label="Phone Number" error={errors.phone}>
                  {(p) => <input {...p} type="tel" name="phone" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} className={cn("field", errors.phone && invalid)} />}
                </Field>
                <Field name="location" label="Your Location" error={errors.location}>
                  {(p) => <input {...p} name="location" autoComplete="address-level2" placeholder="City, Country" value={values.location} onChange={set("location")} className={cn("field", errors.location && invalid)} />}
                </Field>
              </div>

              {/* Type-specific questions animate their height as the category changes */}
              <motion.div layout transition={{ type: "spring", stiffness: 400, damping: 40 }} className="overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-5 pt-5 sm:grid-cols-2"
                  >
                    {type === "VOLUNTEER" && (
                      <>
                        <Field name="interest" label="Area of Interest" error={errors.interest}>
                          {(p) => (
                            <div className="relative">
                              <select {...p} name="interest" value={values.interest} onChange={set("interest")} className={cn("field appearance-none pr-10", errors.interest && invalid)}>
                                <option value="">Select an option</option>
                                {interests.map((i) => (
                                  <option key={i.value} value={i.value}>
                                    {i.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-secondary" />
                            </div>
                          )}
                        </Field>
                        <Field name="availability" label="Availability" error={errors.availability}>
                          {(p) => <input {...p} name="availability" placeholder="Weekends, specific dates, ongoing…" value={values.availability} onChange={set("availability")} className={cn("field", errors.availability && invalid)} />}
                        </Field>
                      </>
                    )}
                    {type === "PRAYER_COMMUNITY" && (
                      <>
                        <div className="sm:col-span-2">
                          <Field name="prayer_focus" label="Prayer Focus" error={errors.prayer_focus}>
                            {(p) => <textarea {...p} name="prayer_focus" rows={3} placeholder="Tell us how you’d like to pray with us" value={values.prayer_focus} onChange={set("prayer_focus")} className={cn("field resize-y", errors.prayer_focus && invalid)} />}
                          </Field>
                        </div>
                        <Field name="prayer_availability" label="Availability" error={errors.prayer_availability}>
                          {(p) => <input {...p} name="prayer_availability" placeholder="e.g. weekly, specific days" value={values.prayer_availability} onChange={set("prayer_availability")} className={cn("field", errors.prayer_availability && invalid)} />}
                        </Field>
                      </>
                    )}
                    {type === "SKILL_SHARE" && (
                      <>
                        <Field name="skill_area" label="Skill Area" error={errors.skill_area}>
                          {(p) => <input {...p} name="skill_area" placeholder="e.g. medical, engineering, design" value={values.skill_area} onChange={set("skill_area")} className={cn("field", errors.skill_area && invalid)} />}
                        </Field>
                        <div className="sm:col-span-2">
                          <Field name="skill_details" label="Brief Description" error={errors.skill_details}>
                            {(p) => <textarea {...p} name="skill_details" rows={3} placeholder="What can you help with? How long? Remote or on-site?" value={values.skill_details} onChange={set("skill_details")} className={cn("field resize-y", errors.skill_details && invalid)} />}
                          </Field>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="mt-5">
                <Field name="message" label="Additional Information" optional error={errors.message}>
                  {(p) => <textarea {...p} name="message" rows={4} placeholder="Anything else you’d like us to know?" value={values.message} onChange={set("message")} className={cn("field resize-y", errors.message && invalid)} />}
                </Field>
              </div>

              {/* Honeypot: hidden from people and assistive tech */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} />
                </label>
              </div>

              <AnimatePresence>
                {status.state === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl bg-[#FFF7F3] px-4 py-3 text-[14px] font-medium text-[#9A3412]"
                  >
                    {status.message}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-[13px] text-ink-tertiary">Your application will be securely sent and recorded.</p>
                <Button type="submit" variant="leaf" size="lg" disabled={sending} className="w-full sm:w-auto">
                  {sending ? <LoaderCircle aria-hidden className="size-[18px] animate-spin" /> : <Send aria-hidden className="size-[18px]" />}
                  {sending ? "Sending…" : "Submit application"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
