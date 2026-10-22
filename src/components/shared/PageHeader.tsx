type PageHeaderProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
};

export default function PageHeader({
  badge,
  title,
  highlight,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-brand-purple/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand-cyan/25 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pt-36 pb-20 text-center sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
        <span className="inline-block rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-purple shadow-sm">
          {badge}
        </span>
        <h1 className="font-display mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {title} <span className="text-gradient">{highlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}