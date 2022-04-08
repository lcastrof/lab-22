import { useState } from "react";
import useCart from "../../states";
import { ProductProps } from "../../types";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

const Product = (product: ProductProps) => {
  const { id, name, formattedPrice, picture, stock } = product;
  const { addProduct, removeProduct } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleAddProduct = () => {
    addProduct(product);
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  }
  
  const handleRemoveProduct = () => {
    removeProduct(id);
    setSelectedQuantity((prevQuantity) => prevQuantity - 1);
  }

  return(
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />

      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>{formattedPrice}</Text>
        </Column>

        <WrapperIncrementor>
          <Incrementor 
            quantity={selectedQuantity} 
            maxQuantity={stock}
            onIncrement={handleAddProduct}
            onDecrement={handleRemoveProduct} 
          />
        </WrapperIncrementor>
      </Info>
    </Wrapper>
  );
};

export default Product;
