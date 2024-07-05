export type variantsInterface = {
  type: string;
  value: string;
};
export type inventoryInterface = {
  quantity: number;
  inStock: boolean;
};
export type productInterface = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: variantsInterface[];
  inventory: inventoryInterface;
};
