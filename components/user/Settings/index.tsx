'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IUserDetails } from '@/lib/features/user/types';

import { PasswordForm } from './PasswordForm';
import { ProfileForm } from './ProfileForm';

const TAB_KEY = {
  profile: 'profile',
  password: 'password',
};

interface Props {
  userDetails: IUserDetails;
}

export default function SettingsContainer(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { userDetails } = props;

  const [activeTab, setActiveTab] = useState(TAB_KEY.profile);

  React.useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && Object.keys(TAB_KEY).includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl) {
      // If no tab in URL, update URL to include default tab
      router.push('/settings?tab=profile', { scroll: false });
    }
  }, [searchParams, router]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/settings?tab=${value}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Account Settings</h1>

        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={TAB_KEY.profile} className="w-full">
              Profile
            </TabsTrigger>

            <TabsTrigger value={TAB_KEY.password} className="w-full">
              Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value={TAB_KEY.profile} className="mt-6">
            <ProfileForm userDetails={userDetails} />
          </TabsContent>

          <TabsContent value={TAB_KEY.password} className="mt-6">
            <PasswordForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
