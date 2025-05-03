"use client";

import React from "react";

import SettingsContainer from "@/components/user/Settings";
import { useAuth } from "@/contexts/AuthContext";
import { IUserDetails } from "@/lib/features/user/types";
import { UserApiService } from "@/lib/features/user/userApi";

export default function SettingsPage() {
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userDetails, setUserDetails] = React.useState<IUserDetails | null>(null);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const [data] = await UserApiService.getUserDetails();
      if (data) setUserDetails(data);
      setIsLoading(false);
    };
    fetchUserDetails();
  }, [authUser?.username]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Error loading user details</div>;
  }

  return <SettingsContainer userDetails={userDetails} />;
}
