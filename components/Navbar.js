'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDataContext } from '@/context/ApiContext';

const navigationLinks = [
  { href: '/', label: 'Discover' },
  { href: '/favourite', label: 'Favourites', countKey: 'favourites' },
  { href: '/watchlist', label: 'Watchlist', countKey: 'watchlist' },
];

function Navbar() {
  const pathname = usePathname();
  const { favourites, query, setPage, setQuery, watchlist } = useDataContext();
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      return;
    }

    setPage(1);
    setQuery(trimmedValue);
  }

  const counts = {
    favourites: favourites.length,
    watchlist: watchlist.length,
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl min-w-0 flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Image src="/wall.png" alt="Movie vault logo" width={44} height={44} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
                Resume Project
              </p>
              <h1 className="text-lg font-semibold text-white">Movie Vault</h1>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigationLinks.map((link) => {
              const count = link.countKey ? counts[link.countKey] : 0;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {count ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? 'bg-slate-950/10 text-slate-950'
                          : 'bg-cyan-400/15 text-cyan-200'
                      }`}
                    >
                      {count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 flex-col gap-3 sm:flex-row lg:w-auto lg:min-w-0 lg:max-w-[520px] lg:flex-1"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search movies, series, episodes..."
            className="min-w-0 w-full flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400/50 focus:bg-white/8 sm:min-w-0"
          />
          <button
            type="submit"
            className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Search
          </button>
        </form>

        <nav className="flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
          {navigationLinks.map((link) => {
            const count = link.countKey ? counts[link.countKey] : 0;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
                {count ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? 'bg-slate-950/10 text-slate-950'
                        : 'bg-cyan-400/15 text-cyan-200'
                    }`}
                  >
                    {count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
