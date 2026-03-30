'use client';

import MovieGrid from '@/components/MovieGrid';
import SectionHeader from '@/components/SectionHeader';
import { useDataContext } from '@/context/ApiContext';

function FavouritePage() {
  const {
    addWatchlist,
    favourites,
    removeFavourite,
    watchlist,
  } = useDataContext();

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Library"
        title="Your favourite picks"
        description="Keep a shortlist of movies you want to revisit or show off in your personal collection."
      />

      <MovieGrid
        movies={favourites}
        emptyTitle="No favourites yet"
        emptyDescription="Save standout titles from the home page and they will appear here."
        buildActions={(movie) => ({
          primaryAction: {
            label: watchlist.some((item) => item.imdbID === movie.imdbID)
              ? 'Saved to watchlist'
              : 'Add to watchlist',
            onClick: () => addWatchlist(movie),
          },
          secondaryAction: {
            label: 'Remove favourite',
            onClick: () => removeFavourite(movie.imdbID),
          },
          secondaryVariant: 'danger',
        })}
      />
    </main>
  );
}

export default FavouritePage;
