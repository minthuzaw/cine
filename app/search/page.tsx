"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Movie } from '@/lib/types';
import MainLayout from '@/components/layouts/MainLayout';
import MovieGrid from '@/components/MovieGrid';
import { searchMovies } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError('Failed to search movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">Found {movies.length} results for &quot;{query}&quot;</p>
        </div>

        {error && (
          <div className="text-destructive text-center py-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </MainLayout>
  );
}
