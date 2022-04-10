import { useEffect, useState } from "react";
import { useCart } from "../../store";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor, SecondaryInfo, SubtotalWrapper } from "./styles";

export type ProductProps = {
  id: number;
  name: string;
  price: number;
  formattedPrice?: string;
  picture: string;
  stock: number;
};

const Product = (product: ProductProps & { formattedTotal?: string }) => {
  const { id, name, formattedPrice, picture, stock } = product;
  const { addProduct, removeProduct, products } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(0);

  useEffect(() => {
    const quantity = products.find((product) => product.id === id)?.quantity || 0;
    setSelectedQuantity(quantity);
  }, [products, id]);

  const handleAddProduct = () => {
    addProduct(product);
  }

  const handleRemoveProduct = () => {
    removeProduct(id);
  }

  return (
    <Wrapper>
      <img src={picture} alt={`Imagem de referência ${name}`} />

      <Info>
        <Column>
          <Text>{name}</Text>
          <Text>{formattedPrice}</Text>
        </Column>

        <SecondaryInfo>
          <WrapperIncrementor>
            <Incrementor
              quantity={selectedQuantity}
              maxQuantity={stock}
              onIncrement={handleAddProduct}
              onDecrement={handleRemoveProduct}
            />
          </WrapperIncrementor>
          {product.formattedTotal && (
            <SubtotalWrapper>
              <Text>Subtotal:</Text>
              <Text className="subtotal">{product.formattedTotal}</Text>
            </SubtotalWrapper>
          )}
        </SecondaryInfo>
      </Info>
    </Wrapper>
  );
};

export default Product;
