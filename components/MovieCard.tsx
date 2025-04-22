"use client";

import { Star, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex-shrink-0 w-[180px] group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
      <div className="relative rounded-md overflow-hidden h-[270px]">
        {/* Poster Image */}
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm text-primary">
              <Play className="h-6 w-6 fill-current" />
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="absolute bottom-0 w-full p-3 space-y-1">
            <div className="flex items-center justify-between">
              {movie.genre && (
                <Badge variant="outline" className="text-xs bg-primary/20     border-primary/50">
                  {movie.genre.split('/')[0]}
                </Badge>
              )}
              
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Title and Year */}
      <div className="mt-2">
        <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
      </div>
    </div>
  );
}