import create from "zustand";
import { CartProduct, ProductProps } from "../types";
import { formatCurrency } from "../utils/format";

type CartHookProps = {
  products: CartProduct[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: number) => void;
  cleanCart: () => void;
};

const useCart = create<CartHookProps>((set) => ({
  products: [],

  // TODO -> Validate if quantity surpasses stock and throw error if so
  addProduct: (product) => {
    set(({ products }) => {
      const productAlreadyAdded = products.find(
        (p) => p.id === product.id
      );

      if (productAlreadyAdded) {
        return {
          products: products.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + 1, total: p.price * (p.quantity + 1), formattedTotal: formatCurrency(p.price * (p.quantity + 1)) }
              : p
          ),
        };
      }

      const cartProduct: CartProduct = {
        id: product.id,
        name: product.name,
        picture: product.picture,
        price: product.price,
        quantity: 1,
        total: product.price,
        formattedPrice: product.formattedPrice,
        formattedTotal: product.formattedPrice,
      };

      return ({
        products: [...products, cartProduct],
      });
    });
  },
  removeProduct: (id: number) => {
    set(({ products }) => {
      const product = products.find((p) => p.id === id);
      if (product?.quantity === 1) {
        return {
          products: products.filter((p) => p.id !== id),
        };
      }
      return {
        products: products.map((p) =>
          p.id === id
            ? { ...p, quantity: p.quantity - 1, total: p.price * (p.quantity - 1), formattedTotal: formatCurrency(p.price * (p.quantity - 1)) }
            : p
        ),
      };
    });
  },
  cleanCart: () => {
    set(() => ({
      products: [],
    }));
  }
}));

export default useCart;
