import COLOURS from "@/variables/Colours";
import styled from "styled-components";

export const StyledBalanceItem = styled.li<{ isPositive: boolean }>`
  background-color: ${COLOURS.lightGray};
  border-radius: 25px;
  border: 1px solid
    ${(props) => (props.isPositive ? COLOURS.success : COLOURS.failure)};
  margin: 20px;
  width: 33vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  @media (max-width: 1024px) {
    width: 85vw;
    margin-top: 20px;
    flex-direction: column;
  }
`;
