import z from 'zod';
export const productZodSchema = z.object({
  name: z.string({ message: 'name should be string' }).trim(),
  price: z.number({ message: 'price should be number' }),
  description: z.string({ message: 'description should be string' }).trim(),
  category: z.string({ message: 'description should be string' }).trim(),
  tags: z.array(z.string({ message: 'description should be string' }).trim()),
  variants: z.array(
    z.object({
      type: z.string({ message: 'type should be string' }),
      value: z.string({ message: 'value should be string' }),
    }),
  ),
  inventory: z.object({
    quantity: z.number({ message: 'quantity should be number' }).min(0),
    inStock: z.boolean({ message: 'inStock should be boolean' }),
  }),
});
