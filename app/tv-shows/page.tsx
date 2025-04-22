"use client";

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import MovieGrid from '@/components/MovieGrid';
import { Movie } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function TvShowsPage() {
  const [shows, setShows] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchShows = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv?page=${pageNum}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const data = await response.json();

      const newShows = data.results.map((show: any) => ({
        id: show.id.toString(),
        title: show.name,
        posterUrl: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/original${show.backdrop_path}`,
        year: new Date(show.first_air_date).getFullYear(),
        rating: show.vote_average / 2,
        description: show.overview,
        genre: null
      }));

      if (pageNum === 1) {
        setShows(newShows);
      } else {
        setShows(prev => [...prev, ...newShows]);
      }

      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError('Failed to load TV shows. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        if (!loading && hasMore) {
          setPage(prev => prev + 1);
          fetchShows(page + 1);
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
          <h1 className="text-3xl font-bold">TV Shows</h1>
          <p className="text-muted-foreground">Discover popular TV series and shows</p>
        </div>

        {error && (
          <div className="text-destructive text-center py-4">
            {error}
          </div>
        )}

        <MovieGrid movies={shows} />

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
