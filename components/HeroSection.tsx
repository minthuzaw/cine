"use client";

import { Play, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/lib/types';

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  return (
    <section className="relative rounded-xl overflow-hidden group h-[50vh] min-h-[400px] max-h-[600px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="max-w-xl space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">{movie.title}</h1>
          
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
            <span>{movie.genre}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
            <span>{movie.duration}</span>
          </div>
          
          <p className="text-muted-foreground max-w-md line-clamp-2 md:line-clamp-3">
            {movie.description}
          </p>
          
          <div className="flex items-center gap-3 pt-2">
            <Button className="gap-2 bg-red-600 hover:bg-red-700 transition-colors">
              <Play className="h-4 w-4" /> Watch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}