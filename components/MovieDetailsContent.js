'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EmptyState from '@/components/EmptyState';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = '70516783';
const FALLBACK_POSTER = '/wall.png';

function MovieDetailsContent({ imdbID }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayPosterSrc, setDisplayPosterSrc] = useState(FALLBACK_POSTER);

  useEffect(() => {
    if (!imdbID) {
      setIsLoading(false);
      setErrorMessage('No movie was selected.');
      return;
    }

    const controller = new AbortController();

    async function fetchMovieDetails() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const params = new URLSearchParams({
          i: imdbID,
          apikey: API_KEY,
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to fetch movie details right now.');
        }

        const result = await response.json();

        if (result.Response === 'False') {
          throw new Error(result.Error || 'Movie details are unavailable.');
        }

        setMovieDetails(result);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setErrorMessage(error.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();

    return () => controller.abort();
  }, [imdbID]);

  useEffect(() => {
    const posterSrc =
      movieDetails?.Poster && movieDetails.Poster !== 'N/A'
        ? movieDetails.Poster
        : FALLBACK_POSTER;

    setDisplayPosterSrc(posterSrc);
  }, [movieDetails]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="min-h-[520px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
      </main>
    );
  }

  if (errorMessage || !movieDetails) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmptyState
          title="Movie details unavailable"
          description={errorMessage || 'Please return to the home page and try another movie.'}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.9)]">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="relative min-h-[520px]">
            <Image
              src={displayPosterSrc}
              alt={movieDetails.Title}
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
              onError={() => setDisplayPosterSrc(FALLBACK_POSTER)}
            />
          </div>

          <div className="space-y-8 p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
                {movieDetails.Type}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {movieDetails.Title}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                {movieDetails.Plot}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Year</p>
                <p className="mt-2 text-lg font-semibold text-white">{movieDetails.Year}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Runtime</p>
                <p className="mt-2 text-lg font-semibold text-white">{movieDetails.Runtime}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">IMDb</p>
                <p className="mt-2 text-lg font-semibold text-white">{movieDetails.imdbRating}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Genre</p>
                <p className="mt-2 text-lg font-semibold text-white">{movieDetails.Genre}</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Cast</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">{movieDetails.Actors}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Director</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">{movieDetails.Director}</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetailsContent;
