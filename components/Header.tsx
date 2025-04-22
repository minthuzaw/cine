"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Animation', path: '/animation' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center">
              <Image
                src={`/logo.svg`}
                alt="Cine Logo"
                width={100}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-4">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.path}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-colors hover:bg-secondary",
                  pathname === tab.path
                    ? "bg-white text-black font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center relative max-w-md w-full mx-4">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies, TV shows..."
            className="pl-10 bg-secondary/50 border-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Profile & Notifications */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-secondary">
            {/* <Bell className="h-5 w-5" /> */}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="container mx-auto py-4 px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies, TV shows..."
                className="pl-10 bg-secondary/50 border-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <nav className="container mx-auto py-4 px-4 space-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.path}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors hover:bg-secondary",
                  pathname === tab.path
                    ? "bg-white text-black font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
