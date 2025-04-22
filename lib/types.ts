export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  year: number;
  genre: string | null;
  duration?: string;
  rating: number;
  description?: string;
}
