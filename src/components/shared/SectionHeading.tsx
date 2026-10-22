type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-purple">
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-3 text-3xl font-bold leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}