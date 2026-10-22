"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { approveAdmission, rejectAdmission, type Credentials } from "@/app/actions/admin";
import CredentialsModal from "./CredentialsModal";

type Props = {
  admissionId: string;
  applicantName: string;
};

export default function AdmissionActions({ admissionId, applicantName }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [error, setError] = useState("");

  function handleApprove() {
    setError("");
    startTransition(async () => {
      const result = await approveAdmission(admissionId);
      if (!result.success) {
        setError(result.error);
        return;
      }
      if (result.credentials) setCredentials(result.credentials);
      else router.refresh();
    });
  }

  function handleReject() {
    if (!confirm(`Reject the application from ${applicantName}?`)) return;
    setError("");
    startTransition(async () => {
      const result = await rejectAdmission(admissionId);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleApprove}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          {isPending ? "Working..." : "Approve"}
        </button>
        <button
          type="button"
          onClick={handleReject}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Reject
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {credentials && (
        <CredentialsModal
          credentials={credentials}
          onClose={() => {
            setCredentials(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}