'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FALLBACK_POSTER = '/wall.png';

function MovieCard({
  movie,
  primaryAction,
  secondaryAction,
  secondaryVariant = 'secondary',
}) {
  const initialPosterSrc =
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER;
  const [posterSrc, setPosterSrc] = useState(initialPosterSrc);

  useEffect(() => {
    setPosterSrc(initialPosterSrc);
  }, [initialPosterSrc]);

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <Link href={`/details?imdbID=${movie.imdbID}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
          <Image
            src={posterSrc}
            alt={movie.Title}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setPosterSrc(FALLBACK_POSTER)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
            {movie.Type}
          </p>
          <h2 className="line-clamp-2 text-xl font-semibold text-white">
            {movie.Title}
          </h2>
          <p className="text-sm text-slate-300">{movie.Year}</p>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {primaryAction.label}
          </button>
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
              secondaryVariant === 'danger'
                ? 'border-rose-400/40 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {secondaryAction.label}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
