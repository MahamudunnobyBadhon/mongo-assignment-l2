import { Request, Response } from 'express';
import { productServices } from './product.services';
import { productZodSchema } from './product.zod.validation';

const createProductController = async (req: Request, res: Response) => {
  const productData = req.body;
  const { error } = productZodSchema.safeParse(productData);
  if (error) {
    return res.status(500).json({ message: error.errors });
  } else {
    const productResult = await productServices.createProductToDb(productData);
    res.status(201).send(productResult);
  }
};

const getAllProductController = async (req: Request, res: Response) => {
  const { searchTerm } = req.query as { searchTerm: string };
  if (searchTerm) {
    const productResult = await productServices.searchProductFromDb(searchTerm);
    res.status(200).send(productResult);
  } else {
    const productResult = await productServices.getAllProductFromDb();

    res.status(201).send(productResult);
  }
};
const getOneProductController = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productResult = await productServices.getOneProductFromDb(productId);

  res.status(201).send(productResult);
};
const updateOneProductController = async (req: Request, res: Response) => {
  const productData = req.body;
  const { productId } = req.params;
  const productResult = await productServices.updateOneProductFromDb(productId, productData);

  res.status(201).send(productResult);
};
const deleteOneProductController = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productResult = await productServices.deleteOneProductFromDb(productId);

  res.status(201).send(productResult);
};

export const productControllers = {
  createProductController,
  getAllProductController,
  getOneProductController,
  updateOneProductController,
  deleteOneProductController,
};
