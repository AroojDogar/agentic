import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import QuoteForm from "@/components/services/QuoteForm";
import { services, reasons } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, software development, automation, chatbots and consulting services by Agentic.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Our Services"
        title="AI & software services that"
        highlight="grow your business"
        description="From strategy to deployment, Agentic delivers end-to-end AI and software services for organizations around the world."
      />

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Services built for"
            highlight="real results"
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-linear-to-r ${service.color}`} />

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${service.color} text-white shadow-lg transition group-hover:scale-110`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-display mt-6 text-2xl font-bold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{service.description}</p>

                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#quote"
                    className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-brand-purple"
                  >
                    Get a Quote
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Why Agentic"
            title="Why clients"
            highlight="choose us"
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center transition hover:border-brand-purple"
                >
                  <div className="bg-brand-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-slate-400">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="scroll-mt-20 bg-slate-50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Started"
            title="Request a"
            highlight="free quote"
            description="Tell us about your project and our team will reply within 24 hours."
          />
          <div className="mt-12">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}