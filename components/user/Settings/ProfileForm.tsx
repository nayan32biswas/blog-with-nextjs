"use client";

import { Mail, MapPin, User } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUserDetails } from "@/lib/features/user/types";
import { UserApiService } from "@/lib/features/user/userApi";

import ProfileImageInput from "./ProfileImageInput";

interface ProfileFormValues {
  username: string;
  email: string;
  full_name: string;
  bio: string;
  location: string;
}

interface Props {
  userDetails: IUserDetails;
}

export function ProfileForm(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { userDetails } = props;

  const defaultValues = {
    username: userDetails.username || "",
    email: userDetails.email || "",
    full_name: userDetails.full_name || "",
    bio: userDetails.bio || "",
    location: userDetails.location || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    if (userDetails.image) {
      setProfileImage(userDetails.image);
    }
  }, [userDetails.image]);

  const onSubmit = async (payload: ProfileFormValues) => {
    setIsLoading(true);

    const [data] = await UserApiService.updateUser({ ...payload, image: profileImage });
    if (data) {
      alert("Profile updated successfully");
    }

    setIsLoading(false);
  };

  const formValidation = {
    username: register("username", { required: "Username is required" }),
    email: register("email", {}),
    full_name: register("full_name", {
      required: "Full name is required",
      minLength: { value: 2, message: "Full name must be at least 2 characters" },
    }),
    bio: register("bio", {
      maxLength: { value: 500, message: "Bio must not be longer than 500 characters" },
    }),
    location: register("location"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your profile information. This information will be displayed publicly.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <ProfileImageInput
            value={profileImage}
            onChange={(imageUrl) => setProfileImage(imageUrl)}
          />

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="username"
                className={`pl-8 ${errors.username ? "border-red-500" : ""}`}
                placeholder="username"
                disabled
                {...formValidation.username}
              />
            </div>
            <p className="text-sm text-gray-500">
              This is your public username. It can only contain letters, numbers, and underscores.
            </p>
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                className={`pl-8 ${errors.email ? "border-red-500" : ""}`}
                placeholder="email@example.com"
                {...formValidation.email}
              />
            </div>
            <p className="text-sm text-gray-500">
              We{"'"}ll send important notifications to this email address.
            </p>
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="full_name"
              placeholder="Enter your full name"
              {...formValidation.full_name}
              className={`${errors.full_name ? "border-red-500" : ""}`}
            />
            {errors.full_name && <p className="text-sm text-red-500">{errors.full_name.message}</p>}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us a little bit about yourself"
              className={`resize-none ${errors.bio ? "border-red-500" : ""}`}
              {...formValidation.bio}
            />
            <p className="text-sm text-gray-500">
              Brief description for your profile. Maximum 500 characters.
            </p>
            {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="location"
                className={`pl-8 ${errors.location ? "border-red-500" : ""}`}
                placeholder="City, Country"
                {...formValidation.location}
              />
            </div>
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="mt-2 flex justify-end">
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
