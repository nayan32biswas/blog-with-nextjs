"use client";

import Link from "next/link";
import React, { useState } from "react";

import AuthPageContainer from "@/components/auth/AuthPageContainer";
import BackHome from "@/components/auth/BackHome";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Sign In Component
export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthPageContainer>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-blue-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-blue-50"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <Link className="block text-center text-sm text-gray-600" href="/auth/signin">
              <span className="px-4 py-2 hover:bg-gray-100">Do not have an account? Sign Up</span>
            </Link>
            <BackHome />
          </form>
        </CardContent>
      </Card>
    </AuthPageContainer>
  );
};

export default SignIn;
