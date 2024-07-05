import { Schema, model } from 'mongoose';
import { orderInterface } from './order.interface';

const orderSchema = new Schema<orderInterface>({
  email: {
    type: String,
    require: true,
  },
  productId: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const orderModel = model<orderInterface>('order', orderSchema);
export default orderModel;
