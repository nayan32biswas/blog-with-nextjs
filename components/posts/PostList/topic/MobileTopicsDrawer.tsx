"use client";

import { ListFilter } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ITopic } from "@/lib/features/posts/post.types";

import { TopicsBlock } from "./TopicsBlock";

interface MobileTopicsDrawerProps {
  topics: ITopic[];
}

export function MobileTopicsDrawer({ topics }: MobileTopicsDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ListFilter className="h-4 w-4" />
          <span>Topics</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="sr-only">Topics</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <TopicsBlock topics={topics} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
