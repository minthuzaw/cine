import { Movie } from './types';

export const featuredMovie: Movie = {
  id: 'dune',
  title: 'Dune',
  posterUrl: 'https://images.pexels.com/photos/3761508/pexels-photo-3761508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  backdropUrl: 'https://images.pexels.com/photos/4840135/pexels-photo-4840135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  year: 2021,
  genre: 'Sci-Fi/Adventure',
  duration: '2h 35m',
  rating: 4.5,
  description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
};

export const recommendedMovies: Movie[] = [
  {
    id: 'interstellar',
    title: 'Interstellar',
    posterUrl: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2014,
    genre: 'Sci-Fi/Adventure',
    rating: 4.8,
  },
  {
    id: 'avatar2',
    title: 'Avatar: The Way of Water',
    posterUrl: 'https://images.pexels.com/photos/7808800/pexels-photo-7808800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2022,
    genre: 'Sci-Fi/Action',
    rating: 4.2,
  },
  {
    id: 'ghosted',
    title: 'Ghosted',
    posterUrl: 'https://images.pexels.com/photos/8112107/pexels-photo-8112107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Romance/Action',
    rating: 3.7,
  },
  {
    id: 'blackPanther',
    title: 'Black Panther',
    posterUrl: 'https://images.pexels.com/photos/1145274/pexels-photo-1145274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2018,
    genre: 'Action/Adventure',
    rating: 4.5,
  },
  {
    id: 'flowerMoon',
    title: 'Flower Moon',
    posterUrl: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Drama/Crime',
    rating: 4.6,
  }
];

export const latestMovies: Movie[] = [
  {
    id: 'creed3',
    title: 'Creed III',
    posterUrl: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Drama/Sport',
    rating: 4.1,
  },
  {
    id: 'scream6',
    title: 'Scream VI',
    posterUrl: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Horror/Thriller',
    rating: 3.9,
  },
  {
    id: 'renfield',
    title: 'Renfield',
    posterUrl: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Horror/Comedy',
    rating: 3.6,
  },
  {
    id: 'airForce',
    title: '80 For Brady',
    posterUrl: 'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Comedy/Drama',
    rating: 3.5,
  }
];

export const topRatedMovies: Movie[] = [
  {
    id: 'johnWick4',
    title: 'John Wick 4',
    posterUrl: 'https://images.pexels.com/photos/4154153/pexels-photo-4154153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Action/Thriller',
    rating: 4.9,
  },
  {
    id: 'megan',
    title: 'M3GAN',
    posterUrl: 'https://images.pexels.com/photos/9072215/pexels-photo-9072215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2022,
    genre: 'Horror/Sci-Fi',
    rating: 4.5,
  },
  {
    id: 'quantumania',
    title: 'Ant-Man: Quantumania',
    posterUrl: 'https://images.pexels.com/photos/14344637/pexels-photo-14344637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2023,
    genre: 'Action/Adventure',
    rating: 4.3,
  },
  {
    id: 'smile',
    title: 'Smile',
    posterUrl: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    year: 2022,
    genre: 'Horror',
    rating: 4.7,
  }
];