import { db } from '@database';
import { IUser } from '@interfaces';
import { User } from '@models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

type Data =
  | {
      message: string;
    }
  | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const users = await User.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json(users);
  } catch (error) {
    console.log('[GetUsers] Error: ', error);
    res.status(500).json({ message: 'Oops! Something went wrong' });
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;
  if (!userId || !role) {
    return res.status(400).json({ message: 'Bad request' });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'User not found ' });
  }

  const validRoles = ['admin', 'client'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  await db.connect();

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  user.role = role;

  await user.save();

  await db.disconnect();
  return res.status(200).json({ message: 'User updated' });
};
