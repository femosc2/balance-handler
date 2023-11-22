import COLOURS from "@/variables/Colours";
import DatePicker from "react-datepicker";
import styled from "styled-components";

export const StyledInput = styled(DatePicker)`
  background-color: ${COLOURS.lightGray};
  height: 35px;
  width: 250px;
  border: none;
  margin: 20px;
  border-radius: 25px;
  animation: 0.5s;
  padding: 10px;
`;

export const StyledSelect = styled.select`
  background-color: ${COLOURS.lightGray};
  height: 56px;
  width: 250px;
  border: none;
  margin: 20px;
  border-radius: 25px;
  animation: 0.5s;
  padding: 10px;
`;

export const StyledInputContainer = styled.section`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
