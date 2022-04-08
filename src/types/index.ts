export type ProductProps = {
  id: number;
  name: string;
  price: number;
  formattedPrice?: string;
  picture: string;
  stock: number;
};

export type CartProduct = {
  id: number;
  name: string;
  price: number;
  total: number;
  formattedPrice?: string;
  formattedTotal?: string;
  picture: string;
  quantity: number;
};
