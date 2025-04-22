"use client";

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import MovieGrid from '@/components/MovieGrid';
import { Movie } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { getPopularMovies } from '@/lib/api';

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const { movies: newMovies, hasMore: more } = await getPopularMovies(pageNum);

      if (pageNum === 1) {
        setMovies(newMovies);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
      }

      setHasMore(more);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

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
  }, [loading, hasMore, page]);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Popular Movies</h1>
          <p className="text-muted-foreground">Discover the most popular movies right now</p>
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
