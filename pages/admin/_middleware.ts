import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  const requestedPage = req.page.name;
  const url = req.nextUrl.clone();

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(`${url.origin}/auth/login?p=${requestedPage}`);
  }

  const validRoles = ['admin'];

  if (!validRoles.includes(session.user.role)) {
    return NextResponse.redirect(`${url.origin}`);
  }

  return NextResponse.next();
}
