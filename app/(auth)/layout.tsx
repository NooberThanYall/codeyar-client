import { cookies } from 'next/headers'
import React, { useEffect } from 'react'
import { getCookieValue } from './../../lib/auth/jwt';
import { redirect, useRouter } from 'next/navigation';

const AuthLayout = async({children}) => {
   const cookielist = await cookies();
   const session = cookielist.get('session')?.value;
   if(session) redirect('/dashboard')
  return (
<>
    {children}
</>
  )
}

export default AuthLayout