"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";

type ContactFormMode = "contact" | "apply";

type ContactFormProps = {
  mode?: ContactFormMode;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  desiredPlan: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  desiredPlan: "",
  message: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm({ mode = "contact" }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const title = useMemo(
    () => (mode === "apply" ? "Application starter form" : "Contact form"),
    [mode],
  );

  function validate(current: FormValues) {
    const next: FormErrors = {};

    if (!current.fullName.trim()) {
      next.fullName = "Please enter your name.";
    }
    if (!current.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!isEmail(current.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!current.phone.trim()) {
      next.phone = "Please enter your phone number.";
    }
    if (mode === "apply" && !current.desiredPlan.trim()) {
      next.desiredPlan = "Please select a plan.";
    }
    if (!current.message.trim()) {
      next.message = "Please provide a short message.";
    }

    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setValues(initialValues);
  }

  function fieldClass(name: keyof FormValues) {
    return `mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition ${
      errors[name]
        ? "border-rose-400 focus:border-rose-500"
        : "border-slate-300 focus:border-sky-500"
    }`;
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-label={title}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-slate-800">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={(event) =>
              setValues((current) => ({ ...current, fullName: event.target.value }))
            }
            className={fieldClass("fullName")}
            autoComplete="name"
          />
          {errors.fullName ? (
            <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((current) => ({ ...current, email: event.target.value }))
            }
            className={fieldClass("email")}
            autoComplete="email"
          />
          {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="phone" className="text-sm font-medium text-slate-800">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={(event) =>
            setValues((current) => ({ ...current, phone: event.target.value }))
          }
          className={fieldClass("phone")}
          autoComplete="tel"
        />
        {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone}</p> : null}
      </div>

      {mode === "apply" ? (
        <div className="mt-4">
          <label htmlFor="desiredPlan" className="text-sm font-medium text-slate-800">
            Desired plan
          </label>
          <select
            id="desiredPlan"
            name="desiredPlan"
            value={values.desiredPlan}
            onChange={(event) =>
              setValues((current) => ({ ...current, desiredPlan: event.target.value }))
            }
            className={fieldClass("desiredPlan")}
          >
            <option value="">Select a plan</option>
            <option value="Starter">Starter</option>
            <option value="Plus">Plus</option>
            <option value="Premium">Premium</option>
          </select>
          {errors.desiredPlan ? (
            <p className="mt-1 text-xs text-rose-600">{errors.desiredPlan}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          className={fieldClass("message")}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-rose-600">{errors.message}</p>
        ) : null}
      </div>

      <p className="mt-4 text-xs leading-6 text-slate-500">
        This form uses client-side validation only. Backend integration can be added
        later.
      </p>

      <motion.button
        type="submit"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 inline-flex rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
      >
        {mode === "apply" ? "Submit application starter" : "Send message"}
      </motion.button>

      {isSubmitted ? (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Thanks. This placeholder form was submitted successfully.
        </p>
      ) : null}
    </form>
  );
}
