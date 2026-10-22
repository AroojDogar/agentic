"use client";

import { useActionState, useState } from "react";
import { UserPlus } from "lucide-react";
import { createStaffUser, type CreateUserState } from "@/app/actions/admin";
import { courses } from "@/data/courses";
import CredentialsModal from "./CredentialsModal";

export default function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createStaffUser, undefined);
  const [role, setRole] = useState("TEACHER");
  const [dismissed, setDismissed] = useState<CreateUserState>(undefined);

  const showModal = state?.success && state.credentials && state !== dismissed;

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-ink outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-violet-100";

  return (
    <>
      <form action={formAction} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display flex items-center gap-2 text-xl font-bold text-ink">
          <UserPlus className="h-5 w-5 text-brand-purple" /> Add Teacher / Staff
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Full Name *</label>
            <input id="name" name="name" required className={inputClass} placeholder="Full name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email *</label>
            <input id="email" name="email" type="email" required className={inputClass} placeholder="name@agentic.com" />
          </div>
          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700">Role *</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
            >
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </div>

        {role === "TEACHER" && (
          <fieldset className="mt-6">
            <legend className="mb-3 text-sm font-medium text-slate-700">Assign Courses</legend>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <label
                  key={course.slug}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition has-checked:border-brand-purple has-checked:bg-violet-50"
                >
                  <input type="checkbox" name="courses" value={course.slug} className="h-4 w-4 accent-violet-600" />
                  {course.title}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {state && !state.success && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-brand-gradient mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90 disabled:opacity-60"
        >
          <UserPlus className="h-5 w-5" />
          {pending ? "Creating..." : "Create Account"}
        </button>
      </form>

      {showModal && state.credentials && (
        <CredentialsModal credentials={state.credentials} onClose={() => setDismissed(state)} />
      )}
    </>
  );
}