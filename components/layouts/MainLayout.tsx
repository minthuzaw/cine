"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const searchParams = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    const genreName = searchParams.get('name');
    setSelectedGenre(genreName);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            {children}
          </div>
          <Sidebar
            className="hidden lg:block"
            selectedGenre={selectedGenre}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
