"use client";

import { Mail, MapPin, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const [avatar, setAvatar] = useState<string | null>("/placeholder.svg?height=200&width=200");

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

  const onSubmit = async (payload: ProfileFormValues) => {
    setIsLoading(true);

    const [data] = await UserApiService.updateUser({ ...payload });
    if (data) {
      alert("Profile updated successfully");
    }

    setIsLoading(false);
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-100">
              <AvatarImage src={avatar || ""} alt="Profile picture" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div>
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Change avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

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
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
