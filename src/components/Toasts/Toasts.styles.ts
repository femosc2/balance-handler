import styled from "styled-components";
import { slideInAndOut } from "@/variables/Animations";
import COLOURS from "@/variables/Colours";

export const StyledToastsContainer = styled.section`
  position: fixed;
  right: 1%;
  color: black;
  top: 2%;
  z-index: 9999;
  pointer-events: auto;
`;

export const Toast = styled.aside<{ status: string }>`
  background-color: ${(props) => {
    switch (props.status) {
      case "success":
        return COLOURS.success;
      case "failure":
        return COLOURS.failure;
      case "info":
        return COLOURS.info;
      default:
        return COLOURS.info; // Default color for unknown status
    }
  }};
  color: black;
  transform: translateX(100%);
  animation: ${slideInAndOut} 5s ease-in-out forwards;
`;

export const StyledToastContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 300px;
  z-index: 9999;
`;

export const StyledToast = styled(Toast)`
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledToastTitle = styled.div`
  font-weight: bold;
`;
