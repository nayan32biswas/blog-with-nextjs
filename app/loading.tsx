import LoadingSpinner from '@/components/common/Loaders/LoadingSpinner';

export default function Loading() {
  return (
    <LoadingSpinner className="absolute inset-0 z-50 flex items-center justify-center bg-white/50" />
  );
}
