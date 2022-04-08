import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product from "../components/Product";
import api from "../services/api";
import { ProductProps } from "../types";
import { formatCurrency } from "../utils/format";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsList, setProductsList] = useState<ProductProps[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        const formattedProducts = response.data.map((product: ProductProps) => {
          return {
            ...product,
            formattedPrice: formatCurrency(product.price),
          }
        });
        setProductsList(formattedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Container>
        {productsList.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </>
  );
};

export default Home;
