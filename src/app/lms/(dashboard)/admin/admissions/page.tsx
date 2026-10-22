import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, GraduationCap, Code2, CalendarDays } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/lms/StatusBadge";
import AdmissionActions from "@/components/lms/AdmissionActions";

export const metadata: Metadata = { title: "Admissions" };

const statuses = ["PENDING", "APPROVED", "REJECTED"] as const;
type Status = (typeof statuses)[number];

const tabs = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: "ALL" },
];

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdmissionsPage({ searchParams }: PageProps) {
  await requireRole("ADMIN");

  const { status = "PENDING" } = await searchParams;
  const filter = statuses.includes(status as Status) ? (status as Status) : null;
  const activeTab = filter ?? "ALL";

  const admissions = await prisma.admission.findMany({
    where: filter ? { status: filter } : {},
    orderBy: { createdAt: "desc" },
    include: { user: { select: { studentId: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Admissions</h1>
      <p className="mt-1 text-slate-500">Review applications and create student accounts.</p>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/lms/admin/admissions?status=${tab.value}`}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.value
                ? "bg-brand-gradient text-white shadow-md shadow-violet-500/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-brand-purple hover:text-brand-purple"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {admissions.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            No admissions in this category.
          </div>
        )}

        {admissions.map((a) => (
          <div key={a.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl font-bold text-ink">{a.fullName}</h2>
                  <StatusBadge status={a.status} />
                </div>
                <p className="mt-1 font-medium text-brand-purple">{a.courseTitle}</p>
              </div>

              {a.status === "PENDING" ? (
                <AdmissionActions admissionId={a.id} applicantName={a.fullName} />
              ) : (
                a.user?.studentId && (
                  <p className="rounded-xl bg-slate-50 px-4 py-2 font-mono text-sm font-semibold text-ink">
                    {a.user.studentId}
                  </p>
                )
              )}
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" /> {a.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /> {a.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /> {a.city}, {a.country}</p>
              <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-slate-400" /> {a.education}</p>
              <p className="flex items-center gap-2"><Code2 className="h-4 w-4 text-slate-400" /> {a.experience ?? "Not specified"}</p>
              <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-slate-400" /> Applied {a.createdAt.toLocaleDateString("en-GB")}</p>
            </div>

            {a.motivation && (
              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <span className="font-semibold text-ink">Motivation: </span>
                {a.motivation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}