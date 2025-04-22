"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getGenres, getOnTheAirShows, Genre } from '@/lib/api';
import MovieDetailsDialog from './MovieDetailsDialog';

interface SidebarProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string) => void;
  className?: string;
}

export default function Sidebar({ selectedGenre, onGenreSelect, className }: SidebarProps) {
  const router = useRouter();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [selectedShow, setSelectedShow] = useState<Movie | null>(null);
  const [showGenres, setShowGenres] = useState(true);

  useEffect(() => {
    // Fetch genres and TV shows
    Promise.all([
      getGenres(),
      getOnTheAirShows()
    ]).then(([genresData, showsData]) => {
      setGenres(genresData);
      setTvShows(showsData.slice(0, 7));
    });
  }, []);

  const handleGenreClick = (genre: Genre) => {
    onGenreSelect(genre.name);
    router.push(`/genre?id=${genre.id}&name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <aside className={cn("w-full lg:w-1/4 space-y-8", className)}>
      {/* Genres Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Genre</h3>
          <span
            className="text-xs text-muted-foreground cursor-pointer hover:underline"
            onClick={() => setShowGenres(!showGenres)}
          >
            {showGenres ? "Hide" : "Show"}
          </span>
        </div>

        {showGenres && (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className={cn(
                  "px-3 py-1 cursor-pointer transition-colors hover:bg-secondary",
                  selectedGenre === genre.name ? "bg-primary/20 border-primary/50" : ""
                )}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Discover TV Shows Section */}
      <div>
        <h3 className="font-semibold text-lg mb-4">On The Air</h3>

        <div className="space-y-6">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="flex gap-3 group cursor-pointer"
              onClick={() => setSelectedShow(show)}
            >
              <div className="relative rounded-md overflow-hidden w-16 h-24 flex-shrink-0">
                <Image
                  src={show.posterUrl}
                  alt={show.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                    {show.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {show.year}
                  </p>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < show.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TV Show Details Dialog */}
      <MovieDetailsDialog
        movie={selectedShow}
        onClose={() => setSelectedShow(null)}
      />
    </aside>
  );
}
