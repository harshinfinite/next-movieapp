function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
