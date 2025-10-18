'use client';

import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ShowPasswordButton from '@/components/common/Buttons/ShowPasswordButtion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAxiosErrorMessage } from '@/lib/axios';
import { AuthApiService } from '@/lib/features/auth/authApi';

type PasswordFormValues = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const defaultValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    mode: 'onBlur',
    defaultValues,
  });

  const new_password = watch('new_password');

  const onSubmit = async (formData: PasswordFormValues) => {
    setIsLoading(true);

    const payload = {
      current_password: formData.current_password,
      new_password: formData.new_password,
    };

    const [data, errorObj] = await AuthApiService.changePassword(payload);
    if (data) {
      alert('Successfully Change password');
    } else if (errorObj) {
      alert(getAxiosErrorMessage(errorObj));
    }

    setIsLoading(false);
  };

  const formValidation = {
    current_password: register('current_password', {
      required: 'Current password is required',
    }),
    new_password: register('new_password', {
      required: 'New password is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
    }),
    confirm_password: register('confirm_password', {
      required: 'Please confirm your password',
      validate: (value) => value === new_password || 'Passwords do not match',
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
            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="current_password"
                className={`pr-10 pl-8 ${errors.current_password ? 'border-red-500' : ''}`}
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter your current password"
                {...formValidation.current_password}
              />
              <ShowPasswordButton
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
              />
            </div>
            {errors.current_password && (
              <p className="text-sm text-red-500">{errors.current_password.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="new_password"
                className={`pr-10 pl-8 ${errors.new_password ? 'border-red-500' : ''}`}
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                {...formValidation.new_password}
              />
              <ShowPasswordButton
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
              />
            </div>
            {errors.new_password && (
              <p className="text-sm text-red-500">{errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="confirm_password"
                className={`pr-10 pl-8 ${errors.confirm_password ? 'border-red-500' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                {...formValidation.confirm_password}
              />
              <ShowPasswordButton
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>
            {errors.confirm_password && (
              <p className="text-sm text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-2 flex justify-end">
          <Button type="submit" className="bg-gray-900 hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update password'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
