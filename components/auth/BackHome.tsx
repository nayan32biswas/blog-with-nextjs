import Link from 'next/link';
import React from 'react';

const BackHome = () => {
  return (
    <div className="text-center text-sm">
      <Link href="/" className="text-gray-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default BackHome;
