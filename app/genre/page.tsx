"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout';
import MovieGrid from '@/components/MovieGrid';
import { Movie } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { getMoviesByGenre } from '@/lib/api';

interface Genre {
  id: number;
  name: string;
}

export default function GenrePage() {
  const searchParams = useSearchParams();
  const genreId = searchParams.get('id');
  const genreName = searchParams.get('name');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async (pageNum: number) => {
    if (!genreId) return;

    try {
      setLoading(true);
      setError(null);

      const { movies: newMovies, hasMore: more } = await getMoviesByGenre(genreId, pageNum);

      // Set the genre name for each movie
      const moviesWithGenre = newMovies.map(movie => ({
        ...movie,
        genre: genreName || null
      }));

      if (pageNum === 1) {
        setMovies(moviesWithGenre);
      } else {
        setMovies(prev => [...prev, ...moviesWithGenre]);
      }

      setHasMore(more);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [genreId, genreName]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [fetchMovies, genreId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage(prev => prev + 1);
          fetchMovies(page + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page, genreId, fetchMovies]);

  if (!genreId || !genreName) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Genre Not Found</h1>
          <p className="text-muted-foreground">Please select a valid genre from the sidebar.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{genreName} Movies</h1>
          <p className="text-muted-foreground">Discover the best {genreName.toLowerCase()} films</p>
        </div>

        {error && (
          <div className="text-destructive text-center py-4">
            {error}
          </div>
        )}

        <MovieGrid movies={movies} />

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
