"use client";

import { FormEvent, useState } from "react";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setValues(initialValues);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-describedby="contact-form-note"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-full-name"
            className="text-sm font-semibold text-[#1f3553]"
          >
            Full Name
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) =>
              setValues((current) => ({ ...current, fullName: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="text-sm font-semibold text-[#1f3553]"
          >
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(event) =>
              setValues((current) => ({ ...current, phone: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-semibold text-[#1f3553]">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-[#1f3553]"
        >
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
        />
      </div>

      <p id="contact-form-note" className="text-xs leading-6 text-slate-500">
        Form submission is currently a placeholder and will be connected to CRM in
        a future backend phase.
      </p>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-[#2a67ad] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f568f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a67ad]"
      >
        Send Message
      </button>

      {submitted ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          Thanks. A representative will reach out shortly.
        </p>
      ) : null}
    </form>
  );
}
