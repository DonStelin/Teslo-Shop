import { db } from '@database';
import { Order, Product, User } from '@models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | {
      numberOfOrders: number;
      paidOrders: number;
      notPaidOrders: number;
      numberOfClients: number;
      numberOfProducts: number;
      productsOutOfStock: number;
      lowInventory: number; // products with less than 10 units in stock
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getDashboardStats(req, res);
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}

const getDashboardStats = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();

  const data = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowInventory,
  ] = data;

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsOutOfStock,
    lowInventory,
  });
};
