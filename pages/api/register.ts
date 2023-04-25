import { createJWT, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { serialize } from 'cookie';
import { SECONDS_IN_A_WEEK } from '@/lib/constants';

export const register: NextApiHandler<ApiError> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({
      statusCode: 405,
      message: 'Method Not Allowed',
      name: 'register',
    });
    res.end();
    return;
  }

  const { email, password, firstName, lastName } = req.body;

  const user = await db.user.create({
    data: {
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
    },
  });

  const jwt = await createJWT(user);

  res.setHeader('Set-Cookie', [
    serialize(process.env.COOKIE_NAME, jwt, {
      httpOnly: true,
      maxAge: SECONDS_IN_A_WEEK,
      path: '/',
    }),
  ]);

  res.status(201);
  res.end();
};
