import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function HeroContainer() {
  return (
    <section className="mb-16 text-center">
      <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
        Welcome to <span className="text-gray-700">Blog</span>
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
        Discover thoughtful insights on technology, design, and productivity in a clean,
        distraction-free environment.
      </p>
      <Button className="cursor-pointer bg-gray-900 hover:bg-gray-800">
        <Link href={'/posts'}>Start Reading</Link>
      </Button>
    </section>
  );
}
