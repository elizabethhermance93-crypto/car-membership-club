"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { membershipPlans } from "@/lib/site-data";

type JoinFormValues = {
  fullName: string;
  phone: string;
  email: string;
  selectedPlan: string;
  insuranceHelp: "yes" | "no";
  notes: string;
};

const initialValues: JoinFormValues = {
  fullName: "",
  phone: "",
  email: "",
  selectedPlan: "Silver",
  insuranceHelp: "yes",
  notes: "",
};

export function JoinForm() {
  const router = useRouter();
  const [values, setValues] = useState<JoinFormValues>(initialValues);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams({
      name: values.fullName,
      plan: values.selectedPlan,
    });
    router.push(`/join/confirmation?${query.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="join-full-name" className="text-sm font-semibold text-[#1f3553]">
            Full Name
          </label>
          <input
            id="join-full-name"
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
          <label htmlFor="join-phone" className="text-sm font-semibold text-[#1f3553]">
            Phone Number
          </label>
          <input
            id="join-phone"
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
        <label htmlFor="join-email" className="text-sm font-semibold text-[#1f3553]">
          Email Address
        </label>
        <input
          id="join-email"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="join-plan" className="text-sm font-semibold text-[#1f3553]">
            Preferred Plan
          </label>
          <select
            id="join-plan"
            name="selectedPlan"
            value={values.selectedPlan}
            onChange={(event) =>
              setValues((current) => ({ ...current, selectedPlan: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
          >
            {membershipPlans.map((plan) => (
              <option key={plan.name} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="join-insurance" className="text-sm font-semibold text-[#1f3553]">
            Need Insurance Assistance?
          </label>
          <select
            id="join-insurance"
            name="insuranceHelp"
            value={values.insuranceHelp}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                insuranceHelp: event.target.value as "yes" | "no",
              }))
            }
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="join-notes" className="text-sm font-semibold text-[#1f3553]">
          Notes (optional)
        </label>
        <textarea
          id="join-notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={(event) =>
            setValues((current) => ({ ...current, notes: event.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#2a67ad] focus:outline-none focus:ring-2 focus:ring-[#2a67ad]/20"
          placeholder="Tell us about your vehicle needs."
        />
      </div>

      <p className="text-xs leading-6 text-slate-500">
        This form currently submits to a confirmation screen only. CRM and workflow
        integration will be added in a future backend phase.
      </p>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-[#2a67ad] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f568f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a67ad]"
      >
        Submit Membership Request
      </button>
    </form>
  );
}
