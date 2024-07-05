import { orderServices } from './order.services';

import { Request, Response } from 'express';
import { orderZodSchema } from './order.zod.validation';

const orderCreateController = async (req: Request, res: Response) => {
  const orderData = req.body;
  const { error } = orderZodSchema.safeParse(orderData);
  if (error) {
    res.status(500).send({ success: false, message: 'Order data invalid', error: error.errors });
  } else {
    try {
      const result = await orderServices.orderCreateToDb(orderData);
      res.status(201).send({ success: true, message: 'Order created successfully!', data: result });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Order can not be created', error: err });
    }
  }
};
const getAllOrderController = async (req: Request, res: Response) => {
  const { email } = req.query as { email: string };
  if (email) {
    try {
      const result = await orderServices.orderByEmailFromDb(email);
      res.status(201).send({ success: true, message: 'Orders fetched successfully for user email!', data: result });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Orders can not be fetched for this email ', error: err });
    }
  } else {
    try {
      const result = await orderServices.allOrderFromDb();
      res.status(201).send({ success: true, message: 'Orders fetched successfully!', data: result });
    } catch (err) {
      res.status(500).send({ success: false, message: 'Can not get the orders', error: err });
    }
  }
};

export const orderController = {
  orderCreateController,
  getAllOrderController,
};
