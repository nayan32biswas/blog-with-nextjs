"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
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

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      alert(data);
    }, 1000);
  };

  const formValidation = {
    currentPassword: register("currentPassword", {
      required: "Current password is required",
    }),
    newPassword: register("newPassword", {
      required: "New password is required",
      minLength: { value: 8, message: "Password must be at least 8 characters" },
    }),
    confirmPassword: register("confirmPassword", {
      required: "Please confirm your password",
      validate: (value) => value === newPassword || "Passwords do not match",
    }),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password. We recommend using a strong, unique password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="currentPassword"
                className={`pr-10 pl-8 ${errors.currentPassword ? "border-red-500" : ""}`}
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                {...formValidation.currentPassword}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showCurrentPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="newPassword"
                className={`pr-10 pl-8 ${errors.newPassword ? "border-red-500" : ""}`}
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                {...formValidation.newPassword}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="confirmPassword"
                className={`pr-10 pl-8 ${errors.confirmPassword ? "border-red-500" : ""}`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...formValidation.confirmPassword}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
