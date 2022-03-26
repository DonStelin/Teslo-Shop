import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@database';
import { Product } from '@models';
import { IProduct } from '@interfaces';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProductByQuery(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProductByQuery = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { query = '' } = req.query;

  if (query.length === 0 || !query) {
    return res.status(400).json({ message: 'Must specify the search query' });
  }

  query = query.toString().toLowerCase();

  await db.connect();
  const products = await Product.find({ $text: { $search: query } })
    .select('title images price inStock slug -_id')
    .lean();

  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await db.disconnect();
  return res.status(200).json(products);
};
