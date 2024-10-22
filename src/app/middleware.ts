import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('refreshToken')?.value;
  console.log('Current User Token:', currentUser); // Log for debugging

  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    console.log('Redirecting to /login'); // Log when redirecting
    return Response.redirect(new URL('/login', request.url));
  }
}
