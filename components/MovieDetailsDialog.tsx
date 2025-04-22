"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Movie } from '@/lib/types';
import { Star, Clock, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface MovieDetailsDialogProps {
  movie: Movie | null;
  onClose: () => void;
}

interface MovieDetails extends Movie {
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export default function MovieDetailsDialog({ movie, onClose }: MovieDetailsDialogProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (movie?.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movie.id}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
                'Content-Type': 'application/json',
              }
            }
          );
          const data = await response.json();
          setDetails({
            ...movie,
            runtime: data.runtime,
            genres: data.genres,
          });
        } catch (error) {
          setDetails(null);
        }
      } else {
        setDetails(null);
      }
    };

    fetchDetails();
  }, [movie]);

  return (
    <Dialog open={!!movie} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setDetails(null);
      }
    }}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {details ? details.title : 'Loading movie details...'}
          </DialogTitle>
        </DialogHeader>

        {details && (
          <div className="grid gap-6 mt-4">
            {details.backdropUrl && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={details.backdropUrl}
                  alt={details.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{details.rating.toFixed(1)}/5</span>
              </div>

              {details.runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{details.year}</span>
              </div>
            </div>

            {details.genres && (
              <div className="flex flex-wrap gap-2">
                {details.genres.map(genre => (
                  <Badge key={genre.id} variant="outline">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-muted-foreground">{details.description}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
