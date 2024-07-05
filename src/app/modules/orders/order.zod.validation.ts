import z from 'zod';
export const orderZodSchema = z.object({
  productId: z.string({ message: 'ProductId should be string' }),
  email: z.string().email({ message: 'Email is not valid' }),
  quantity: z.number({ message: 'Quantity should be number' }),
  price: z.number({ message: 'Price should be number' }),
});
