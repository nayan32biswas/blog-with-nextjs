import { Metadata } from "next";
import { cache } from "react";

import UserPublicProfile from "@/components/user/UserPublicProfile";
import { publicEnv } from "@/lib/config";
import { IUserPublicProfile } from "@/lib/features/user/types";
import { UserApiService } from "@/lib/features/user/userApi";

const getUserPublicProfileUrl = (username: string) => `${publicEnv.BASE_API_URL}/${username}`;

const getUserPublicProfileDetails = cache(
  async (username: string): Promise<[IUserPublicProfile | null, any]> => {
    const [user, errorObj] = await UserApiService.getUserPublicProfile({ username });
    return [user, errorObj];
  },
);

export async function generateMetadata({ params }): Promise<Metadata> {
  const { username } = await params;
  const [user, errorObj] = await getUserPublicProfileDetails(username);

  if (!user || errorObj) {
    return {
      title: "User Not Found",
      description: "The requested post could not be found.",
      openGraph: {
        title: "User Not Found",
        description: "The requested post could not be found.",
      },
    };
  }

  const title = user.full_name || "";
  const image = user.image || "";
  const bio = user.bio || "";

  return {
    title: title,
    description: bio,
    alternates: { canonical: getUserPublicProfileUrl(username) },
    openGraph: {
      title: title,
      description: bio,
      url: getUserPublicProfileUrl(username),
      type: "article",
      images: [{ url: image || "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: bio,
      images: [image || ""],
    },
  };
}

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const [user, errorObj] = await getUserPublicProfileDetails(username);

  if (!user || errorObj) {
    return null;
  }

  return <UserPublicProfile user={user} username={username} />;
}
