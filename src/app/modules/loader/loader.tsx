'use client';

import { useLoading } from '@/app/services/loading-service';
import ClipLoader from "react-spinners/ClipLoader";


export default function FullScreenLoader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      {/* Backdrop overlay – adjust bg-opacity as needed */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto"></div>

      {/* Spinner container */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <ClipLoader size={100} color="#3B82F6" loading={true} />
        <p className="text-white font-semibold text-sm">Loading...</p>
      </div>
    </div>
  );
  
}
