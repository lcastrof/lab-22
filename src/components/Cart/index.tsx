import { Dispatch, SetStateAction } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header, ProductsList, ClearCartButton } from "./styles";
import { useCart } from "../../store";
import Product from "../Product";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {
  const { products, productsCount, formattedTotal, clearCart } = useCart();

  if (productsCount === 0) {
    return (
      <Wrapper isOpen={isOpen}>
        <Header>
          <CloseOutline style={{ marginLeft: 'auto' }} onClick={() => setIsOpen(false)} />
        </Header>
        <div style={{ textAlign: 'center' }}>
          <Typography level={5} size="large" fontWeight={600}>
            Nenhum produto no carrinho :(
          </Typography>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Header>
        <Typography level={5} size="large" fontWeight={600}>
          Produtos no carrinho
        </Typography>
        <CloseOutline onClick={() => setIsOpen(false)} />
      </Header>
      <ProductsList>
        <ClearCartButton type="button" onClick={clearCart}>Limpar carrinho</ClearCartButton>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </ProductsList>
      <Subtotal>
        <Typography level={5} size="large" fontWeight={600}>
          Total
        </Typography>
        <Typography>{formattedTotal}</Typography>
      </Subtotal>

      <Button fullWidth>Finalizar compra</Button>
    </Wrapper>
  )
};

export default MenuPayment;
