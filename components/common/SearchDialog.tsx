"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDebounce } from "@/lib/features/common/hooks/debounce";
import { PostApiService } from "@/lib/features/posts/postApi";
import { IPost } from "@/lib/features/posts/types";

const SEARCH_LIMIT = 10;

export function SearchDialog({ children }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IPost[]>([]);

  const debouncedInput = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedInput) {
      const getPosts = async () => {
        const queryParams = { q: debouncedInput, page: 1, limit: SEARCH_LIMIT };

        const [data] = await PostApiService.getPosts({ queryParams });
        if (data) {
          setResults(data.results);
        }
      };

      getPosts();
    }
  }, [debouncedInput]);

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
                      <Link href={`/posts/${result.slug}`} className="font-medium text-gray-900">
                        {result.title}
                      </Link>
                      <p className="text-sm text-gray-500">{result.short_description}</p>
                    </div>
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
