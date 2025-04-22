import { Movie } from '@/lib/types';
import MainLayout from '@/components/layouts/MainLayout';
import MovieGrid from '@/components/MovieGrid';
import { searchMovies } from '@/lib/api';

interface SearchPageProps {
  searchParams: { query: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query;

  if (!query) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Start searching for movies</h1>
          <p className="text-muted-foreground">Use the search bar above to find movies</p>
        </div>
      </MainLayout>
    );
  }

  const movies = await searchMovies(query);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">Found {movies.length} results for &quot;{query}&quot;</p>
        </div>

        <MovieGrid movies={movies} />
      </div>
    </MainLayout>
  );
}
