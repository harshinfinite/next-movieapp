import MovieDetailsContent from '@/components/MovieDetailsContent';

async function DetailsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return <MovieDetailsContent imdbID={resolvedSearchParams?.imdbID} />;
}

export default DetailsPage;
