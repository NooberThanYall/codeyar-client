import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const url = new URL(req.url);

  try {
    if (url.pathname.startsWith('/admin')) {
      const res = await fetch('http://localhost:5000/user/is-admin', {
        headers: { cookie },
      });

      if (!res.ok) throw new Error('not admin');
    }

    // سایر مسیرها مثل /dashboard که فقط subscription نیاز دارن
    if (url.pathname.startsWith('/dashboard')) {
      const res = await fetch('http://localhost:5000/user/subscription', {
        headers: { cookie },
      });

      const { hasActiveSubscription } = await res.json();

      if (!hasActiveSubscription) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/signup', req.url));
  }
}
