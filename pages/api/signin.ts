import { comparePassword, createJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { serialize } from 'cookie';
import { SECONDS_IN_A_WEEK } from '@/lib/constants';

export const signin: NextApiHandler<ApiError> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({
      statusCode: 405,
      message: 'Method Not Allowed',
      name: 'signin',
    });
    res.end();
    return;
  }

  const { email, password } = req.body;

  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).json({
      statusCode: 401,
      message: 'Invalid email or password',
      name: 'signin',
    });
    res.end();
    return;
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    res.status(401).json({
      statusCode: 401,
      message: 'Invalid email or password',
      name: 'signin',
    });
    res.end();
    return;
  }

  const jwt = await createJWT(user);

  res.setHeader('Set-Cookie', [
    serialize(process.env.COOKIE_NAME, jwt, {
      httpOnly: true,
      maxAge: SECONDS_IN_A_WEEK,
      path: '/',
    }),
  ]);

  res.status(200);
  res.end();
};
