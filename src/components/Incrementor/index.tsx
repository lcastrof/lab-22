import { Plus as PlusIcon } from "@styled-icons/boxicons-regular/Plus";
import { Subtract as SubtractIcon } from "@styled-icons/remix-fill/Subtract";

import { Wrapper, IconWrapper, Quantity } from "./styles";

type IncrementorProps = {
  quantity: number;
  maxQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Incrementor = ({ quantity, maxQuantity, onIncrement, onDecrement }: IncrementorProps) => (
  <Wrapper>
    <IconWrapper disabled={quantity === 0} onClick={onDecrement}>
      <SubtractIcon aria-label="Subtract item" />
    </IconWrapper>

    <Quantity>{quantity}</Quantity>

    <IconWrapper disabled={quantity >= maxQuantity} onClick={onIncrement}>
      <PlusIcon aria-label="Add item" />
    </IconWrapper>
  </Wrapper>
);

export default Incrementor;
