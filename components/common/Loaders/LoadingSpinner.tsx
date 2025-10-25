import { LoaderCircle } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
  iconClassName?: string;
  color?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  const { className, iconClassName, color = '#0084d1' } = props;

  return (
    <div
      className={className || 'flex items-center justify-center'}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className={iconClassName || 'h-12 w-12 animate-spin'}
        aria-hidden="true"
        color={color}
      />
    </div>
  );
}
