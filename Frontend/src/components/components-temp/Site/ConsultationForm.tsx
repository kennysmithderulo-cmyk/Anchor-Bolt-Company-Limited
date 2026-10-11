import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createConsultation, type ConsultationResult } from "@/lib/api";
import { COMPANY, PROJECT_TYPES } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  project_type: string;
  project_location: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  full_name: "",
  phone: "",
  email: "",
  project_type: "",
  project_location: "",
  message: "",
};

const labelClass = "text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground";
const fieldClass =
  "h-11 rounded border-input bg-background text-[15px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0";

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ConsultationResult | null>(null);

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your full name.";
    if (form.phone.replace(/[^0-9]/g, "").length < 7) next.phone = "Enter a phone number we can reach you on.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.project_type) next.project_type = "Select the type of project.";
    if (form.project_location.trim().length < 2) next.project_location = "Where is the site located?";
    if (form.message.trim().length < 10) next.message = "Add a little more detail (10 characters minimum).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await createConsultation({
        ...form,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        project_location: form.project_location.trim(),
        message: form.message.trim(),
      });
      setResult(response);
      setForm(EMPTY);
      toast.success("Request received", {
        description: `Your reference number is ${response.reference}.`,
      });
    } catch {
      toast.error("We could not send that request", {
        description: `Please try again, or call ${COMPANY.phoneDisplay}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="border border-border p-6 lg:p-8" role="status">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-accent" strokeWidth={2} />
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">Request received</p>
        </div>
        <h2 className="mt-5 font-display text-[28px] font-bold uppercase leading-[1.08] tracking-[0.02em] lg:text-[34px]">
          Thank you — we have your enquiry.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">
          Our team will review your project details and respond within one business day. Keep this reference
          number for your records:
        </p>
        <p className="mt-2 font-display text-[26px] font-bold tabular-nums tracking-[0.06em] text-foreground">
          {result.reference}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="heroPill" size="pill">
            <a href={COMPANY.phoneHref}>
              <Phone className="h-4 w-4" /> Call {COMPANY.phoneDisplay}
            </a>
          </Button>
          <Button asChild variant="ghostPill" size="pill">
            <a href={COMPANY.whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          <Button variant="link" className="px-0" onClick={() => setResult(null)}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-border p-6 lg:p-8">
      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent">Consultation request</p>
      <h2 className="mt-3 font-display text-[26px] font-bold uppercase leading-[1.08] tracking-[0.02em] lg:text-[32px]">
        Tell us about your project
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="full_name" className={labelClass}>
            Full name
          </Label>
          <Input
            id="full_name"
            name="full_name"
            autoComplete="name"
            value={form.full_name}
            onChange={(event) => update("full_name", event.target.value)}
            aria-invalid={Boolean(errors.full_name)}
            aria-describedby={errors.full_name ? "full_name-error" : undefined}
            className={cn(fieldClass, "mt-2")}
            placeholder="e.g. Kwabena Mensah"
          />
          {errors.full_name ? (
            <p id="full_name-error" className="mt-2 text-[13px] text-destructive">
              {errors.full_name}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="phone" className={labelClass}>
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(fieldClass, "mt-2")}
            placeholder="+233 ..."
          />
          {errors.phone ? (
            <p id="phone-error" className="mt-2 text-[13px] text-destructive">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="email" className={labelClass}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldClass, "mt-2")}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-[13px] text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="project_type" className={labelClass}>
            Project type
          </Label>
          <Select value={form.project_type} onValueChange={(value) => update("project_type", value)}>
            <SelectTrigger
              id="project_type"
              aria-invalid={Boolean(errors.project_type)}
              aria-describedby={errors.project_type ? "project_type-error" : undefined}
              className={cn(fieldClass, "mt-2 w-full")}
            >
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.project_type ? (
            <p id="project_type-error" className="mt-2 text-[13px] text-destructive">
              {errors.project_type}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="project_location" className={labelClass}>
            Project location
          </Label>
          <Input
            id="project_location"
            name="project_location"
            value={form.project_location}
            onChange={(event) => update("project_location", event.target.value)}
            aria-invalid={Boolean(errors.project_location)}
            aria-describedby={errors.project_location ? "project_location-error" : undefined}
            className={cn(fieldClass, "mt-2")}
            placeholder="Town / district"
          />
          {errors.project_location ? (
            <p id="project_location-error" className="mt-2 text-[13px] text-destructive">
              {errors.project_location}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message" className={labelClass}>
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="mt-2 rounded border-input bg-background text-[15px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
            placeholder="Scope, site conditions, timeline, budget expectations…"
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-[13px] text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="heroPill" size="pill" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            "Request Consultation"
          )}
        </Button>
        <p className="text-[13px] leading-[1.5] text-muted-foreground">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
