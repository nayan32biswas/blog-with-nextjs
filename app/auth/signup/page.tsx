"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import AuthPageContainer from "@/components/auth/AuthPageContainer";
import BackHome from "@/components/auth/BackHome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthApiService } from "@/lib/features/auth/authApi";
import { EXCEPTION_TYPE } from "@/lib/features/common/constants";

type FormData = {
  full_name: string;
  username: string;
  password: string;
  confirm_password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormData>({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (payload: FormData) => {
    const [userData, errorObj] = await AuthApiService.registration(payload);
    if (userData) {
      window.location.href = "/auth/signin";
    } else {
      if (errorObj?.code == EXCEPTION_TYPE.USERNAME_EXISTS) {
        setError("username", { type: "manual", message: errorObj?.detail });
      }
    }
  };

  const formValidation = {
    full_name: register("full_name", {
      required: "Full name is required",
      minLength: { value: 2, message: "Full name must be at least 2 characters" },
    }),
    username: register("username", {
      required: "Username is required",
    }),
    password: register("password", {
      required: "Password is required",
      minLength: { value: 6, message: "Password must be at least 6 characters" },
    }),
    confirm_password: register("confirm_password", {
      required: "Please confirm your password",
      validate: (value) => value === password || "Passwords do not match",
    }),
  };

  return (
    <AuthPageContainer>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="full_name"
                type="text"
                autoComplete="name"
                {...formValidation.full_name}
                placeholder="Enter your full name"
                className={`bg-blue-50 ${errors.full_name ? "border-red-500" : ""}`}
              />
              {errors.full_name && (
                <p className="text-sm text-red-500">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="username"
                autoComplete="username"
                {...formValidation.username}
                placeholder="Enter your username"
                className={`bg-blue-50 ${errors.username ? "border-red-500" : ""}`}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...formValidation.password}
                placeholder="Create a password"
                className={`bg-blue-50 ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirm_password"
                type="password"
                autoComplete="new-password"
                {...formValidation.confirm_password}
                placeholder="Confirm your password"
                className={`bg-blue-50 ${errors.confirm_password ? "border-red-500" : ""}`}
              />
              {errors.confirm_password && (
                <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
              )}
            </div>
            <Button type="submit" className="mt-4 w-full cursor-pointer">
              Sign Up
            </Button>

            <Link className="block text-center text-sm text-gray-600" href="/auth/signin">
              <span className="px-4 py-2 hover:bg-gray-100">Already have an account? Sign In</span>
            </Link>

            <BackHome />
          </form>
        </CardContent>
      </Card>
    </AuthPageContainer>
  );
}
