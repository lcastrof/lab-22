import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ShoppingBagOutline as ShoppingIcon } from "styled-icons/evaicons-outline";
import useCart from "../../states";

import { Badge, Container, SvgWrapper } from "./styles";

type HeaderProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setIsOpen }: HeaderProps) => {
  const [productsCount, setProductsCount] = useState(0);
  const { products } = useCart();

  useEffect(() => {
    const productsTotalQuantity = products.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0
    );
    setProductsCount(productsTotalQuantity);
  }, [products]);

  return (
    <Container>
      <SvgWrapper onClick={() => setIsOpen(true)} aria-label="Shopping Icon">
        <ShoppingIcon />
        {productsCount > 0 && <Badge>{productsCount}</Badge>}
      </SvgWrapper>
    </Container>
  );
};

export default Header;
