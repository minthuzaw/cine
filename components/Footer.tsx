"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Cine Logo"
              width={100}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}