"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

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
            onGenreSelect={handleGenreSelect} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}