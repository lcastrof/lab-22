import { ProductProps } from "../../types";
import Incrementor from "../Incrementor";
import { Wrapper, Info, Column, Text, WrapperIncrementor } from "./styles";

const Product = ({ id, name, formattedPrice, picture }: ProductProps) => (
  <Wrapper>
    <img src={picture} alt={`Imagem de referência ${name}`} />

    <Info>
      <Column>
        <Text>{name}</Text>
        <Text>{formattedPrice}</Text>
      </Column>

      <WrapperIncrementor>
        <Incrementor id={id} quantity={1} />
      </WrapperIncrementor>
    </Info>
  </Wrapper>
);

export default Product;
