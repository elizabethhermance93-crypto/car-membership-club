type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  const maxWidth = align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl";

  return (
    <div className={`${alignment} ${maxWidth}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b88719]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1f3553] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
