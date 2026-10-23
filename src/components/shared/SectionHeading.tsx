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
    <div className="max-w-2xl">
      <p className={`text-sm font-medium ${dark ? "text-saffron" : "text-stone"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-spruce"
        }`}
      >
        {title}
        {highlight ? ` ${highlight}` : ""}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/60" : "text-stone"}`}>
          {description}
        </p>
      )}
    </div>
  );
}