import ProductModel from '../products/product.model';
import { productServices } from '../products/product.services';
import { orderInterface } from './order.interface';
import orderModel from './order.model';

const orderCreateToDb = async (orderData: orderInterface) => {
  const { productId, quantity } = orderData;
  const product = await ProductModel.findById({ _id: productId });
  if (product) {
    const productQuantity = product?.inventory?.quantity as number;
    if (productQuantity >= quantity) {
      productServices.updateProductInventory(productId, quantity);
      const result = await orderModel.create(orderData);
      return result;
    } else {
      throw new Error('Insufficient product quantity');
    }
  } else {
    throw new Error('product not found');
  }
};
const allOrderFromDb = async () => {
  const result = await orderModel.find();
  return result;
};
const orderByEmailFromDb = async (email: string) => {
  const result = await orderModel.find({ email });
  return result;
};

export const orderServices = {
  orderCreateToDb,
  allOrderFromDb,
  orderByEmailFromDb,
};
