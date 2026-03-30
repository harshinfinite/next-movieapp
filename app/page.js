'use client';

import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import SectionHeader from '@/components/SectionHeader';
import Slider from '@/components/Slider';
import { useDataContext } from '@/context/ApiContext';

const heroSlides = [
  {
    image: 'first.jpg',
    eyebrow: 'Now showing',
    title: 'Search and track the films you actually want to watch.',
    description:
      'Browse OMDb results, save personal picks, and keep a curated watchlist in a cleaner, more polished experience.',
  },
  {
    image: 'godfather.jpg',
    eyebrow: 'Collections',
    title: 'Build a favourites shelf that feels intentional.',
    description:
      'Turn quick searches into a personal movie library with reusable cards, better states, and faster navigation.',
  },
  {
    image: 'horror.jpg',
    eyebrow: 'Details',
    title: 'Open richer movie detail screens without losing state.',
    description:
      'The details page now uses the movie ID in the route query so deep links and refreshes keep working.',
  },
];

export default function Home() {
  const {
    addFavourite,
    addWatchlist,
    errorMessage,
    favourites,
    isLoading,
    movies,
    query,
    totalResults,
    watchlist,
  } = useDataContext();

  return (
    <main className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Slider slides={heroSlides} />

      <section className="space-y-6">
        <SectionHeader
          eyebrow="Discover"
          title={`Results for "${query}"`}
          description={
            errorMessage
              ? errorMessage
              : `Browse ${totalResults} search results and add titles to your favourites or watchlist.`
          }
        />

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[460px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : (
          <MovieGrid
            movies={movies}
            emptyTitle="No matches found"
            emptyDescription="Try another search term to discover movies, series, or episodes."
            buildActions={(movie) => ({
              primaryAction: {
                label: favourites.some((item) => item.imdbID === movie.imdbID)
                  ? 'Saved to favourites'
                  : 'Add to favourites',
                onClick: () => addFavourite(movie),
              },
              secondaryAction: {
                label: watchlist.some((item) => item.imdbID === movie.imdbID)
                  ? 'Saved to watchlist'
                  : 'Add to watchlist',
                onClick: () => addWatchlist(movie),
              },
            })}
          />
        )}

        <Pagination />
      </section>
    </main>
  );
}
