import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import Sidebar from "@/components/lms/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/lms/login");

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar role={user.role} />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
          <p className="text-sm font-medium text-slate-500">Agentic LMS</p>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="text-xs capitalize text-slate-500">{user.role.toLowerCase()}</p>
            </div>
            <div className="bg-brand-gradient flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <form action={logout}>
              <button
                type="submit"
                title="Sign out"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </header>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}