import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ShowPasswordButtonProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function ShowPasswordButton({
  showPassword,
  setShowPassword,
}: ShowPasswordButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-gray-500" />
      ) : (
        <Eye className="h-4 w-4 text-gray-500" />
      )}
      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
    </Button>
  );
}
