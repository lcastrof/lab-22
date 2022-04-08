import styled, { css } from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 2rem;
  margin-bottom: 1.6rem;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const SvgWrapper = styled.div`
  position: relative;
  cursor: pointer;
  > svg {
    color: ${({ theme }) => theme.colors.black};
    width: 3rem;
  }
`;

export const Badge = styled.span`
  position: absolute;
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  font-weight: bold;
  left: -0.4rem;
  bottom: -0.4rem;
  ${({ theme }) => css`
    border-radius: ${({ theme }) => theme.border.radius.round};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.font.sizes.xxsmall};
  `}
`;
