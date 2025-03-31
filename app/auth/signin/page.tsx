"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { serverLogin } from "@/app/actions/auth";
import AuthPageContainer from "@/components/auth/AuthPageContainer";
import BackHome from "@/components/auth/BackHome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FormData = {
  username: string;
  password: string;
};

// Sign In Component
export default function SignInPage() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const { success, errorMessage } = await serverLogin(data);
      if (success) {
        window.location.href = "/";
      } else {
        setErrorMessage(errorMessage);
      }
    } catch {}
  };

  const formValidation = {
    username: register("username", {
      required: "Username is required",
    }),
    password: register("password", {
      required: "Password is required",
      minLength: { value: 6, message: "Password must be at least 6 characters" },
    }),
  };

  return (
    <AuthPageContainer>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                autoComplete="current-password"
                {...formValidation.password}
                placeholder="Create a password"
                className={`bg-blue-50 ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

            <Button type="submit" className="w-full cursor-pointer">
              Sign In
            </Button>
            <Link className="block text-center text-sm text-gray-600" href="/auth/signup">
              <span className="px-4 py-2 hover:bg-gray-100">Do not have an account? Sign Up</span>
            </Link>
            <BackHome />
          </form>
        </CardContent>
      </Card>
    </AuthPageContainer>
  );
}
