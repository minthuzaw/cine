"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from '@/components/MovieCard';
import MovieDetailsDialog from '@/components/MovieDetailsDialog';
import { Movie } from '@/lib/types';
import useItemsPerPage from '@/lib/useItemsPerPage';

interface MovieCarouselProps {
  movies: Movie[];
}

export default function MovieCarousel({ movies }: MovieCarouselProps) {
  const itemsPerPage = useItemsPerPage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const maxIndex = Math.max(0, Math.ceil(movies.length / itemsPerPage) - 1);

  const handleScroll = (direction: 'left' | 'right') => {
    setCurrentIndex((prev) => {
      if (direction === 'left') return Math.max(prev - 1, 0);
      return Math.min(prev + 1, maxIndex);
    });
  };

  const visibleMovies = movies.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="relative group">
      {/* Left Chevron */}
      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {/* Right Chevron */}
      {currentIndex < maxIndex && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Movie Cards */}
      <div className="grid grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {visibleMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="cursor-pointer"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Movie Details Dialog */}
      <MovieDetailsDialog
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}