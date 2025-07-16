import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/auth/jwt' // همون decrypt JWT خودت

export async function middleware(req: NextRequest) {

  try {

    // اینجا می‌تونی یه call بزنی به /me یا مستقیم به db اگه خواستی
    const res = await fetch('http://localhost:5000/user/me', {
      credentials: 'include'
    });

    const user = await res.json();

    if (!user.admin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();

  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// فقط روی مسیر /admin اجرا شه
export const config = {
  matcher: ['/admin'],
}
