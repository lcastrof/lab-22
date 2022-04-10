import create from "zustand";
import { ProductProps } from "../components/Product";
import api from "../services/api";
import { formatCurrency } from "../utils/format";

type CartProduct = {
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

type CartHookProps = {
  products: CartProduct[];
  productsCount: number;
  total: number;
  formattedTotal: string;
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
};

type ProductsHookProps = {
  products: ProductProps[];
  fetchProducts: () => void;
};

export const useCart = create<CartHookProps>((set, get) => ({
  products: [],
  productsCount: 0,
  total: 0,
  formattedTotal: '',

  addProduct: (product) => {
    set(({ products }) => {
      const productAlreadyAdded = products.find(
        (productInCart) => productInCart.id === product.id
      );

      if (productAlreadyAdded) {
        return {
          products: products.map((productInCart) => {
            if (productInCart.id === product.id) {
              const newQuantity = productInCart.quantity + 1;
              const newTotal = productInCart.price * newQuantity;
              return {
                ...productInCart,
                quantity: newQuantity,
                total: newTotal,
                formattedTotal: formatCurrency(newTotal),
              };
            }

            return productInCart;
          }),
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
    const product = get().products.find((productInCart) => productInCart.id === id);
    if (!product) return;

    set(({ products }) => {
      if (product?.quantity === 1) {
        return {
          products: products.filter((productInCart) => productInCart.id !== id),
        };
      }
      return {
        products: products.map((product) => {
          if (product.id === id) {
            const newQuantity = product.quantity - 1;
            const newTotal = product.price * newQuantity;
            return {
              ...product,
              quantity: newQuantity,
              total: newTotal,
              formattedTotal: formatCurrency(newTotal),
            };
          }

          return product;
        }),
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
  clearCart: () => {
    set(() => ({
      products: [],
      productsCount: 0,
      total: 0,
      formattedTotal: '',
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
