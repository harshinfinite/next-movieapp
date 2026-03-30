'use client';

import MovieGrid from '@/components/MovieGrid';
import SectionHeader from '@/components/SectionHeader';
import { useDataContext } from '@/context/ApiContext';

function WatchlistPage() {
  const {
    addFavourite,
    favourites,
    removeWatchlist,
    watchlist,
  } = useDataContext();

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Queue"
        title="Your watchlist"
        description="Track what you plan to watch next and quickly move standout titles into favourites."
      />

      <MovieGrid
        movies={watchlist}
        emptyTitle="Your watchlist is empty"
        emptyDescription="Add movies from the search results to build a personal queue."
        buildActions={(movie) => ({
          primaryAction: {
            label: favourites.some((item) => item.imdbID === movie.imdbID)
              ? 'Saved to favourites'
              : 'Add to favourites',
            onClick: () => addFavourite(movie),
          },
          secondaryAction: {
            label: 'Remove watchlist item',
            onClick: () => removeWatchlist(movie.imdbID),
          },
          secondaryVariant: 'danger',
        })}
      />
    </main>
  );
}

export default WatchlistPage;
