"use client";

import { Movie } from '@/lib/types';
import MovieCard from './MovieCard';
import MovieDetailsDialog from './MovieDetailsDialog';
import { useState } from 'react';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 justify-items-center min-[425px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 min-[425px]:gap-3 sm:gap-4">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <MovieDetailsDialog
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
