import Link from 'next/link';

function EmptyState({ title, description, ctaLabel = 'Browse movies', ctaHref = '/' }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 px-6 py-16 text-center shadow-[0_20px_80px_-45px_rgba(15,23,42,0.9)]">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
        {description}
      </p>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default EmptyState;
