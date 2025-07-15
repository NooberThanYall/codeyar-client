'use client'

import { useUser } from '@/context/auth/UserCotext'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AppLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.admin) {
      router.replace('/dashboard');
    }
  }, [user]);

  if (!user.admin) return null; 

  return (
    <>
      {children}
    </>
  );
};

export default AppLayout;
