import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

const hasAuth0Config = () =>
  Boolean(
    process.env.AUTH0_SECRET &&
      process.env.AUTH0_BASE_URL &&
      process.env.AUTH0_ISSUER_BASE_URL &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_CLIENT_SECRET,
  );

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const user = hasAuth0Config() ? await getSession(req, res) : null;

  const url = req.nextUrl.clone();
  const { searchParams } = url;

  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');


  if (
    error === 'unauthorized' &&
    errorDescription?.includes('user is blocked')
  ) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (
    url.pathname.includes('/api/auth/callback') &&
    error === 'access_denied' &&
    errorDescription?.includes('We sent an email to')
  ) {
    url.pathname = '/emailverification';
    return NextResponse.redirect(url);
  } else if (!user && !url.pathname.includes('/api/auth/callback')) {
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/billing',
    '/manage-customers',
    '/signin',
    '/manage-users',
    '/solutionn-and-licenses',
    '/soluition-license-freelacncer',
    '/solution-license-internaluser',
    '/api/auth/callback',
  ],
};
