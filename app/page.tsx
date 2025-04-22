import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/HeroSection';
import MovieCarousel from '@/components/MovieCarousel';
import { getPopularMovies, getNowPlayingMovie, getTopRatedShows } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const [featuredMovie, popularMoviesData, topRatedShows] = await Promise.all([
    getNowPlayingMovie(),
    getPopularMovies(),
    getTopRatedShows()
  ]);

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <HeroSection movie={featuredMovie} />

          <section className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Popular Movies</h2>
              <Link
                href="/popular"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                See More
              </Link>
            </div>
            <MovieCarousel movies={popularMoviesData.movies.slice(0, 40)} />
          </section>

          <section className="mt-12">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Series</h2>
              <Link
                href="/tv-shows"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                See More
              </Link>
            </div>
            <MovieCarousel movies={topRatedShows} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
