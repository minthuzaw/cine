# Cine - Movie & TV Show Discovery App

A modern web application built with Next.js and Tailwind CSS for discovering movies and TV shows. The app uses the TMDB API to fetch movie data and provides a beautiful, responsive interface for browsing content.

## Features

- 🎬 Browse popular movies and TV shows
- 📺 Discover currently airing TV shows
- 🎭 Filter movies by genre
- 🔍 Search functionality
- 📱 Responsive design for all screen sizes
- ⚡ Fast and optimized performance
- 🎨 Modern UI with smooth animations

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TMDB API](https://www.themoviedb.org/documentation/api) - Movie and TV show data
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- TMDB API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/minthuzaw/cine.git
cd cine
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your TMDB API key:

```env
NEXT_PUBLIC_TMDB_BEARER_TOKEN=your_tmdb_bearer_token
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
cine/
├── app/                    # Next.js app directory
│   ├── movies/            # Movies page
│   ├── tv-shows/          # TV shows page
│   ├── animation/         # Animation page
│   ├── genre/             # Genre page
│   └── search/            # Search page
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   ├── Sidebar.tsx       # Sidebar with genres and TV shows
│   ├── MovieCard.tsx     # Movie card component
│   └── MovieGrid.tsx     # Grid layout for movies
├── lib/                  # Utility functions and types
│   ├── api.ts           # API calls
│   └── types.ts         # TypeScript types
└── public/              # Static assets
```

## Features in Detail

### Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Collapsible sidebar
- Mobile-friendly navigation

### Performance Optimizations

- Image optimization with Next.js Image component
- API response caching
- Lazy loading components
- Optimized bundle size

### User Experience

- Infinite scroll for movie lists
- Smooth transitions and animations
- Intuitive navigation
- Search functionality with instant results

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) team for the utility-first CSS framework
