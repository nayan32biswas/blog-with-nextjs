"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IPost } from "@/lib/features/posts/types";
import { blogPosts } from "@/lib/temp_data";

export function SearchDialog({ children }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IPost[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = blogPosts.filter(
      (result) =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
    setResults(filtered);
  }, [searchTerm]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent hideCloseIcon isStaticTop className="top-[20%] p-0 sm:max-w-[700px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Search</DialogTitle>
          </VisuallyHidden>
          <div>
            <Search
              size={15}
              strokeWidth={3}
              className="absolute top-4.5 left-2 h-5 w-5 text-gray-500"
            />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-sm bg-white py-4 pr-12 pl-9 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="absolute top-5 right-3 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
              esc
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          {results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <div key={`post-search-result--${result.slug}`} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <span className="mr-3 text-gray-400">#</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-500">{result.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-700">
                      {result.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
