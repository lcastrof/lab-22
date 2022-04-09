import { Dispatch, SetStateAction } from "react";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import Button from "../Button";
import Typography from "../Typography";

import { Wrapper, Subtotal, Header } from "./styles";
import { useCart } from "../../states";
import Product from "../Product";

export type MenuPaymentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Adicionar itens ao carrinho, design ao seu critério mas deve conter:
 * - Nome do produto
 * - Imagem
 * - Preço
 * - Incrementador
 */

const MenuPayment = ({ isOpen, setIsOpen }: MenuPaymentProps) => {
  //TODO -> Clean cart button
  //TODO -> List products
  //TODO -> Deal different with incrementor? Only passing id?
  const { products, productsCount, formattedTotal } = useCart();

  if (productsCount === 0) {
    return (
      <Wrapper isOpen={isOpen}>
        <Header>
          {/* TODO -> refactor this style and improve empty message style */}
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
      <>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </>
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
