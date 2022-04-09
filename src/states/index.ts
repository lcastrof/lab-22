import create from "zustand";
import api from "../services/api";
import { CartProduct, ProductProps } from "../types";
import { formatCurrency } from "../utils/format";

type CartHookProps = {
  products: CartProduct[];
  productsCount: number;
  total: number;
  formattedTotal: string;
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: number) => void;
  cleanCart: () => void;
};

type ProductsHookProps = {
  products: ProductProps[];
  fetchProducts: () => void;
};

// TODO -> Refactor code
export const useCart = create<CartHookProps>((set, get) => ({
  products: [],
  productsCount: 0,
  total: 0,
  formattedTotal: '',

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
              ? {
                ...p,
                quantity: p.quantity + 1,
                total: p.price * (p.quantity + 1),
                formattedTotal: formatCurrency(p.price * (p.quantity + 1))
              }
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
        stock: product.stock,
        total: product.price,
        formattedPrice: product.formattedPrice,
        formattedTotal: product.formattedPrice,
      };

      return ({
        products: [...products, cartProduct],
      });
    });

    set(({ productsCount }) => ({
      productsCount: productsCount + 1,
    }));

    set(({ total }) => {
      const newTotal = total + product.price;
      const newFormattedTotal = formatCurrency(newTotal);
      return ({
        total: newTotal,
        formattedTotal: newFormattedTotal,
      });
    });
  },
  removeProduct: (id: number) => {
    const product = get().products.find((p) => p.id === id);
    // TODO -> Throw error?
    if (!product) return;

    set(({ products }) => {
      if (product?.quantity === 1) {
        return {
          products: products.filter((p) => p.id !== id),
        };
      }
      return {
        products: products.map((p) =>
          p.id === id
            ? {
              ...p,
              quantity: p.quantity - 1,
              total: p.price * (p.quantity - 1),
              formattedTotal: formatCurrency(p.price * (p.quantity - 1))
            }
            : p
        ),
      };
    });

    set(({ productsCount }) => ({
      productsCount: productsCount - 1,
    }));

    set(({ total }) => {
      const newTotal = total - product.price;
      const newFormattedTotal = formatCurrency(newTotal);
      return ({
        total: newTotal,
        formattedTotal: newFormattedTotal,
      });
    });
  },
  cleanCart: () => {
    set(() => ({
      products: [],
    }));
  }
}));

export const useProducts = create<ProductsHookProps>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await api.get("/products");
      const formattedProducts = response.data.map((product: ProductProps) => {
        return {
          ...product,
          formattedPrice: formatCurrency(product.price),
        }
      });
      set(() => ({
        products: formattedProducts,
      }));
    } catch (error) {
      console.log({ error });
    }
  },
}));
