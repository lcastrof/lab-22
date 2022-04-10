import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { Container } from "../components/Container";
import Header from "../components/Header";
import Product from "../components/Product";
import { useProducts } from "../states";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchProducts, products } = useProducts();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <Container>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
        <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
      </Container>
    </>
  );
};

export default Home;
