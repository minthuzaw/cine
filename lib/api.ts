import { Movie } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
};

export async function getPopularMovies(page: number = 1): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const response = await fetch(
    `${BASE_URL}/movie/popular?page=${page}`,
    { headers }
  );
  const data = await response.json();

  const movies = data.results.map((movie: any) => ({
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average / 2,
    description: movie.overview,
    genre: null
  }));

  return {
    movies,
    hasMore: data.page < data.total_pages
  };
}

export async function getNowPlayingMovie(): Promise<Movie> {
  const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, { headers });
  const data = await response.json();
  const movie = data.results[0]; // Get the first movie from now playing

  // Get movie details including runtime
  const detailsResponse = await fetch(`${BASE_URL}/movie/${movie.id}?language=en-US`, { headers });
  const details = await detailsResponse.json();

  // Convert runtime to hours and minutes
  const hours = Math.floor(details.runtime / 60);
  const minutes = details.runtime % 60;
  const duration = `${hours}h ${minutes}m`;

  // Get genre names
  const genres = details.genres.map((g: any) => g.name).join('/');

  return {
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    genre: genres,
    duration,
    rating: movie.vote_average / 2,
    description: movie.overview
  };
}

export async function getTopRatedShows(): Promise<Movie[]> {
  const [page1, page2] = await Promise.all([
    fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, { headers }).then(res => res.json()),
    fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=2`, { headers }).then(res => res.json())
  ]);

  const combined = [...page1.results, ...page2.results].slice(0, 20);

  const shows = await Promise.all(
    combined.map(async (show: any) => {
      const detailsResponse = await fetch(`${BASE_URL}/tv/${show.id}?language=en-US`, { headers });
      const details = await detailsResponse.json();

      return {
        id: show.id.toString(),
        title: show.name,
        posterUrl: `${IMAGE_BASE_URL}/w500${show.poster_path}`,
        backdropUrl: `${IMAGE_BASE_URL}/original${show.backdrop_path}`,
        year: new Date(show.first_air_date).getFullYear(),
        genre: details.genres.map((g: any) => g.name).join('/'),
        rating: show.vote_average / 2,
        description: show.overview
      };
    })
  );

  return shows;
}

export async function getAnimationMovies(page: number = 1): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=16&sort_by=popularity.desc&page=${page}&include_adult=false&language=en-US`,
    { headers }
  );
  const data = await response.json();

  const movies = data.results.map((movie: any) => ({
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average / 2,
    description: movie.overview,
    genre: 'Animation'
  }));

  return {
    movies,
    hasMore: data.page < data.total_pages
  };
}

export interface Genre {
  id: number;
  name: string;
}

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, { headers });
  const data = await response.json();
  return data.genres;
}


export async function getMoviesByGenre(genreId: string, page: number = 1): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}&include_adult=false&language=en-US`,
    { headers }
  );
  const data = await response.json();

  const movies = data.results.map((movie: any) => ({
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average / 2,
    description: movie.overview,
    genre: null // This will be set by the page component
  }));

  return {
    movies,
    hasMore: data.page < data.total_pages
  };
}

export async function getAllMovies(page: number = 1): Promise<{ movies: Movie[]; hasMore: boolean }> {
  const response = await fetch(
    `${BASE_URL}/discover/movie?page=${page}&include_adult=false&language=en-US`,
    { headers }
  );
  const data = await response.json();

  const movies = data.results.map((movie: any) => ({
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average / 2,
    description: movie.overview,
    genre: null
  }));

  return {
    movies,
    hasMore: data.page < data.total_pages
  };
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US`,
    { headers }
  );
  const data = await response.json();

  return data.results.map((movie: any) => ({
    id: movie.id.toString(),
    title: movie.title,
    posterUrl: `${IMAGE_BASE_URL}/w500${movie.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${movie.backdrop_path}`,
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average / 2,
    description: movie.overview,
    genre: null
  }));
}

export async function getMovieDetails(movieId: string): Promise<Movie & { runtime?: number; genres?: { id: number; name: string }[] }> {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    { headers }
  );
  const data = await response.json();

  if (!data || !data.id) {
    throw new Error('Movie details not found');
  }

  return {
    id: data.id.toString(),
    title: data.title || '',
    posterUrl: data.poster_path ? `${IMAGE_BASE_URL}/w500${data.poster_path}` : '',
    backdropUrl: data.backdrop_path ? `${IMAGE_BASE_URL}/original${data.backdrop_path}` : '',
    year: data.release_date ? new Date(data.release_date).getFullYear() : 0,
    rating: data.vote_average ? data.vote_average / 2 : 0,
    description: data.overview || '',
    genre: data.genres ? data.genres.map((g: any) => g.name).join('/') : '',
    runtime: data.runtime,
    genres: data.genres
  };
}

export async function getOnTheAirShows(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/tv/on_the_air?language=en-US&page=1`,
    { headers }
  );
  const data = await response.json();

  return data.results.map((show: any) => ({
    id: show.id.toString(),
    title: show.name,
    posterUrl: `${IMAGE_BASE_URL}/w500${show.poster_path}`,
    backdropUrl: `${IMAGE_BASE_URL}/original${show.backdrop_path}`,
    year: new Date(show.first_air_date).getFullYear(),
    rating: show.vote_average / 2,
    description: show.overview,
    genre: null
  }));
}
