'use client';

import { Github, Globe, Mail, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IUserPublicProfile } from '@/lib/features/user/types';
import { getNameInitials } from '@/lib/utils';

interface Props {
  user: IUserPublicProfile;
}

export default function UserProfileCard({ user }: Props) {
  const nameInitials = getNameInitials(user.full_name);

  return (
    <Card className="border-gray-200">
      <CardHeader className="flex flex-col items-center pb-2 text-center">
        <Avatar className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-gray-100">
          <AvatarImage src={user.full_name || ''} alt={user.full_name} />
          <AvatarFallback className="flex h-full w-full items-center justify-center text-2xl font-semibold">
            {nameInitials}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-gray-900">{user.full_name}</h2>
        <p className="font-medium text-gray-600">{user.role}</p>

        {user.location && (
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-3 w-3" />
            <span>{user.location}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700">{user.bio}</p>

        <Separator className="my-4" />

        <div className="flex flex-col space-y-2">
          {user.email && (
            <Link
              href={`mailto:${user.email}`}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>{user.email}</span>
            </Link>
          )}

          {user.website && (
            <Link
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <Globe className="mr-2 h-4 w-4" />
              <span>{user.website.replace(/^https?:\/\//, '')}</span>
            </Link>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          {user.twitter && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link
                href={`https://twitter.com/${user.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Link>
            </Button>
          )}

          {user.github && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
