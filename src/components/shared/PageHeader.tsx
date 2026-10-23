type PageHeaderProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
};

export default function PageHeader({ badge, title, highlight, description }: PageHeaderProps) {
  return (
    <section className="border-b border-spruce/10 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-sm font-medium text-stone">
          <span className="h-2 w-2 rounded-full bg-saffron" />
          {badge}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-spruce sm:text-5xl lg:text-6xl">
          {title} {highlight}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">{description}</p>
      </div>
    </section>
  );
}