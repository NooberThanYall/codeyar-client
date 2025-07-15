'use client'

import { useUser } from '@/context/auth/UserCotext'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AppLayout = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signup');
    }
  }, [loading, user]);

  if (loading) return <div className="text-white p-4">در حال بارگذاری...</div>;

  if (!user) return null;

  return <>{children}</>;
};

export default AppLayout;
