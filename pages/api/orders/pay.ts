import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PaypalOrderStatusResponse } from '@interfaces';
import { db } from '@database';
import { Order } from '@models';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const getPaypalBearerToken = async (
  res: NextApiResponse<Data>
): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET;

  const body = new URLSearchParams('grant_type=client_credentials');
  const base64 = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
    'utf8'
  ).toString('base64');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    res.status(500).json({ message: 'Paypal token not found' });
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  /*   const session: any = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Unauthorized' }); */

  const { transactionId = '', orderId = '' } = req.body;

  if (!transactionId || !orderId) {
    return res
      .status(400)
      .json({ message: 'Missing transactionId or orderId' });
  }

  if (!isValidObjectId(orderId))
    return res.status(400).json({ message: 'Invalid orderId' });

  const paypalBearerToken = await getPaypalBearerToken(res);

  if (!paypalBearerToken) {
    return res.status(500).json({ message: 'Paypal token not found' });
  }

  try {
    const { data } = await axios.get<PaypalOrderStatusResponse>(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}` || '',
      {
        headers: {
          Authorization: `Bearer ${paypalBearerToken}`,
        },
      }
    );
    await db.connect();
    const dbOrder = await Order.findById(orderId);

    if (!dbOrder) {
      await db.disconnect();
      return res.status(400).json({ message: 'Order not found' });
    }

    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
      await db.disconnect();
      return res.status(400).json({ message: 'Order total mismatch' });
    }

    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;

    await dbOrder.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Order paid' });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
};
