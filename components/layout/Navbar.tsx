'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';

import { SearchDialog } from '@/components/common/SearchDialog';
import { Input } from '@/components/ui/input';

import NavRightSection from './NavRightSection';

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 items-center px-2 lg:px-4">
          {/* Left side - Pushed to start */}
          <div className="ml-4 flex flex-none justify-start">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Blog
            </Link>
          </div>

          {/* Search Box - Centered and takes remaining space */}
          <div className="flex flex-1 justify-center">
            <SearchDialog>
              <div className="relative w-40 sm:w-56 md:w-64">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="h-9 cursor-pointer border-gray-300 bg-white pl-8 focus:border-gray-500 focus:ring-gray-500"
                  readOnly
                />
              </div>
            </SearchDialog>
          </div>

          {/* Right side - Pushed to end */}
          <div className="flex flex-none items-center justify-end space-x-4">
            <NavRightSection />
          </div>
        </div>
      </header>
    </>
  );
}
