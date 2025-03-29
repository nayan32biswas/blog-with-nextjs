"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { ITopic } from "@/lib/features/posts/types";

interface TopicsBlockProps {
  topics: ITopic[];
}

export function TopicsBlock({ topics }: TopicsBlockProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="mb-4 text-xl font-semibold text-gray-900">Topics</h3>

      {/* Search Box */}
      <div className="relative mb-4">
        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search topics..."
          className="border-gray-200 bg-white pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Topics List */}
      <div className="divide-y divide-gray-200">
        {filteredTopics.map((topic) => (
          <div key={`topic-${topic.slug}`} className="flex items-center justify-between py-3">
            <span className="text-gray-700">{topic.name}</span>
            <span className="text-gray-500">{topic.count}</span>
          </div>
        ))}

        {filteredTopics.length === 0 && (
          <div className="py-3 text-center text-gray-500">No topics found</div>
        )}
      </div>
    </div>
  );
}
