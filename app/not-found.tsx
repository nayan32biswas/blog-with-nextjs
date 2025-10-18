'use client';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2 text-center">
          <div className="mb-6 flex w-full justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <FileQuestion className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-black">Page not found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500">
            Sorry, we {"couldn't"} find the page {"you're"} looking for. It might have been moved,
            deleted, or never existed.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="w-full border-gray-200 text-gray-700 hover:bg-gray-100"
          >
            <Link href="/contact">Contact support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
