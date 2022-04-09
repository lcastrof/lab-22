export type ProductProps = {
  id: number;
  name: string;
  price: number;
  formattedPrice?: string;
  picture: string;
  stock: number;
};
/**
 * TODO -> Maybe use something like:
 * {
 *   id: number;
 *   product: ProductProps;
 *   quantity: number;
 *   total: number;
 *   formattedTotal: string;
 * }
 */

//TODO -> refactor this to a minor scope
export type CartProduct = {
  id: number;
  name: string;
  price: number;
  total: number;
  formattedPrice?: string;
  formattedTotal?: string;
  picture: string;
  quantity: number;
  stock: number;
};
