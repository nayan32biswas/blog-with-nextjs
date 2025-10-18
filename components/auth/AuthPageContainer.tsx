import React from 'react';

const AuthPageContainer = ({ children }: any) => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="flex min-h-screen items-center justify-center overflow-auto">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthPageContainer;
