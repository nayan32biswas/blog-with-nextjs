import { Loader2 } from 'lucide-react';

interface OverlayLoadingSpinnerProps {
  zIndex?: number;
  color?: string;
}

export default function OverlayLoadingSpinner(props: OverlayLoadingSpinnerProps) {
  const { zIndex = 50, color = '#0084d1' } = props;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-white/50"
      role="status"
      aria-live="polite"
      style={{ zIndex }}
    >
      <Loader2 className="h-12 w-12 animate-spin" aria-hidden="true" color={color} />
    </div>
  );
}
