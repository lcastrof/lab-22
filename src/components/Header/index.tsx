import { Dispatch, SetStateAction } from "react";
import { ShoppingBagOutline as ShoppingIcon } from "styled-icons/evaicons-outline";
import { useCart } from "../../states";

import { Badge, Container, SvgWrapper } from "./styles";

type HeaderProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setIsOpen }: HeaderProps) => {
  const { productsCount } = useCart();

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
