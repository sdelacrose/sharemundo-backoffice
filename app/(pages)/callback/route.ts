import {getSession} from '@auth0/nextjs-auth0';
import {NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export async function GET(){
  const session=await getSession();
  const origin=process.env.AUTH0_BASE_URL!;
  if(!session?.accessToken) return NextResponse.redirect(new URL('/api/auth/login',origin));
  // Server-to-server call: the browser-only gateway cookie is not forwarded or bypassed.
  const api=process.env.ADMIN_API_INTERNAL_URL || 'http://links-recette-admin-api:8001';
  const profile=await fetch(api+'/admin-api/accounts/auth/me',{
    headers:{Authorization:'Bearer '+session.accessToken},cache:'no-store',
  });
  if(!profile.ok) return new NextResponse('Administration account unavailable',{status:403});
  const response=NextResponse.redirect(new URL('/dashboard',origin));
  const expires=Number(session.accessTokenExpiresAt || 0);
  const remaining=expires ? Math.max(0,expires-Math.floor(Date.now()/1000)) : 3600;
  if(!remaining) return NextResponse.redirect(new URL('/api/auth/logout',origin));
  response.cookies.set('auth-token',session.accessToken,{
    path:'/',secure:true,sameSite:'lax',maxAge:Math.min(remaining,3600),
  });
  response.headers.set('Cache-Control','private, no-store');
  return response;
}
