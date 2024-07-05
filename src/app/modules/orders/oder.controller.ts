import { orderServices } from './order.services';

import { Request, Response } from 'express';
import { orderZodSchema } from './order.zod.validation';

const orderCreateController = async (req: Request, res: Response) => {
  const orderData = req.body;
  const { error } = orderZodSchema.safeParse(orderData);
  if (error) {
    return res.status(500).json({ message: error.errors });
  } else {
    const result = await orderServices.orderCreateToDb(orderData);
    res.status(201).send(result);
  }
};
const getAllOrderController = async (req: Request, res: Response) => {
  const { email } = req.query as { email: string };
  if (email) {
    const result = await orderServices.orderByEmailFromDb(email);
    res.status(201).send(result);
  } else {
    const result = await orderServices.allOrderFromDb();
    res.status(201).send(result);
  }
};

export const orderController = {
  orderCreateController,
  getAllOrderController,
};
