import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export const maxDuration = 30;
const Callback = async () => {
  const session = await getSession();

  const getAuthToken = async () => {
    if (!session?.idToken) {
      console.error('No ID token found in session');
      return '';
    }

    try {
      // const response =
       await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/accounts/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_token: session.idToken }),
        },
      );

      // const data = await response.json();

      return session.accessToken;
    } catch (error) {
      redirect('/api/auth/logout');
      console.error('Error fetching auth token:', error);
      return '';
    }
  };

  const authToken = await getAuthToken();
  redirect(`/auth?auth-token=${authToken}`);

  return null;
};

export default Callback;
