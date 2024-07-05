import { productInterface } from './product.interface';
import ProductModel from './product.model';

const createProductToDb = async (product: productInterface) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};
const getOneProductFromDb = async (productId: string) => {
  const result = await ProductModel.find({ _id: productId });
  return result;
};
const updateOneProductFromDb = async (productId: string, product: productInterface) => {
  const result = await ProductModel.findByIdAndUpdate({ _id: productId }, product, { new: true });

  return result;
};
const deleteOneProductFromDb = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id: productId });

  return result;
};
const searchProductFromDb = async (searchTerm: string) => {
  const result = await ProductModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  });

  return result;
};
const updateProductInventory = async (productId: string, quantity: number) => {
  const product = await ProductModel.findById({ _id: productId });
  const productQuantity = product?.inventory?.quantity as number;
  if (quantity === productQuantity) {
    const productResult = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      { 'inventory.quantity': 0, 'inventory.inStock': false },
    );
    return productResult;
  } else {
    const productResult = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { 'inventory.quantity': -quantity } },
    );
    return productResult;
  }
};

export const productServices = {
  createProductToDb,
  getAllProductFromDb,
  getOneProductFromDb,
  updateOneProductFromDb,
  deleteOneProductFromDb,
  searchProductFromDb,
  updateProductInventory,
};
