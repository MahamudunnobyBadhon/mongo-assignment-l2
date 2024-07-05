import { Request, Response } from 'express';
import { productServices } from './product.services';
import { productZodSchema } from './product.zod.validation';

const createProductController = async (req: Request, res: Response) => {
  const productData = req.body;
  const { error } = productZodSchema.safeParse(productData);
  if (error) {
    return res.status(500).json({ message: error.errors });
  } else {
    try {
      const productResult = await productServices.createProductToDb(productData);
      res.status(201).send({ success: true, message: 'Product created successfully!', data: productResult });
    } catch (err) {
      res.status(500).send({ success: false, message: "Can't create products", error: err });
    }
  }
};

const getAllProductController = async (req: Request, res: Response) => {
  const { searchTerm } = req.query as { searchTerm: string };
  if (searchTerm) {
    try {
      const productResult = await productServices.searchProductFromDb(searchTerm);
      res.status(201).send({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: productResult,
      });
    } catch (err) {
      res.status(500).send({ success: false, message: "Can't create products", error: err });
    }
  } else {
    try {
      const productResult = await productServices.getAllProductFromDb();

      res.status(201).send({ success: true, message: 'Products fetched successfully!', data: productResult });
    } catch (err) {
      res.status(500).send({ success: false, message: "Can't create products", error: err });
    }
  }
};
const getOneProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productResult = await productServices.getOneProductFromDb(productId);
    res.status(201).send({ success: true, message: 'Product fetched successfully!', data: productResult });
  } catch (err) {
    res.status(500).send({ success: false, message: "Can't create products", error: err });
  }
};
const updateOneProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { productId } = req.params;
    const productResult = await productServices.updateOneProductFromDb(productId, productData);

    res.status(201).send({ success: true, message: 'Product updated successfully!', data: productResult });
  } catch (err) {
    res.status(500).send({ success: false, message: "Can't create products", error: err });
  }
};
const deleteOneProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productResult = await productServices.deleteOneProductFromDb(productId);

    res.status(201).send({ success: true, message: 'Product deleted successfully!', data: productResult });
  } catch (err) {
    res.status(500).send({ success: false, message: "Can't create products", error: err });
  }
};

export const productControllers = {
  createProductController,
  getAllProductController,
  getOneProductController,
  updateOneProductController,
  deleteOneProductController,
};
