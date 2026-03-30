'use client';

import MovieCard from '@/components/MovieCard';
import EmptyState from '@/components/EmptyState';

function MovieGrid({ movies, emptyTitle, emptyDescription, buildActions }) {
  if (!movies.length) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {movies.map((movie) => {
        const actions = buildActions(movie);

        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            primaryAction={actions.primaryAction}
            secondaryAction={actions.secondaryAction}
            secondaryVariant={actions.secondaryVariant}
          />
        );
      })}
    </div>
  );
}

export default MovieGrid;
