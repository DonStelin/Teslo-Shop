import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(
    //Payload
    { _id, email },
    //Secret seed
    process.env.JWT_SECRET_SEED,
    //Options
    { expiresIn: '7d' }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('JWT_SECRET is not defined');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('Invalid token');

        const { _id } = payload as { _id: string };

        return resolve(_id);
      });
    } catch (error) {
      reject('Invalid token');
    }
  });
};
