import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const afterCallback = async (req: NextApiRequest, session: any, state: any) => {
  state.returnTo = '/callback';
  return session;
};

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await handleCallback(req, res, { afterCallback });
  } catch (err) {
    console.error(err);
  }
};

export const GET = handleAuth({ callback: callbackHandler });
