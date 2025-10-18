'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostCard } from '@/components/posts/common/PostCard';
import { DEFAULT_ITEMS_LIMIT } from '@/lib/config';
import { API_STATE } from '@/lib/features/common/constants';
import { PostAction } from '@/lib/features/posts/postsSlice';
import { IUserPublicProfile } from '@/lib/features/user/types';
import { RootState } from '@/lib/store';

import UserProfileCard from './UserProfileCard';

interface Props {
  username: string;
  user: IUserPublicProfile;
}

export default function UserPublicProfileContainer(params: Props) {
  const { user, username } = params;
  const dispatch = useDispatch();

  const { userPostsApiData } = useSelector((state: RootState) => state.posts);

  const userPosts = userPostsApiData.results || [];
  const userPostsApiState = userPostsApiData.apiState;

  React.useEffect(() => {
    const loadPosts = async () => {
      const queryParams = { limit: DEFAULT_ITEMS_LIMIT, username: username };
      dispatch(PostAction.getUserPosts({ queryParams }));
    };

    loadPosts();
  }, [dispatch, username]);

  const renderPosts = () => {
    if (userPostsApiState === API_STATE.LOADING) {
      return <p className="text-gray-500">Loading posts...</p>;
    }

    if (!userPosts.length) {
      return <p className="text-gray-500">No posts found for this user.</p>;
    }

    return (
      <div className="grid gap-2">
        {userPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile: Author info at top */}
      <div className="mb-8 lg:hidden">
        <UserProfileCard user={user} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Posts by {user?.full_name}</h1>

          {renderPosts()}
        </div>

        {/* Desktop: Author info on right, sticky */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <UserProfileCard user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
