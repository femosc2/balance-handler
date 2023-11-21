import { keyframes } from "styled-components";

export const slideInAndOut = keyframes`
  0% {
    transform: translateX(100%);
  }
  5% {
    transform: translateX(0%);
  }
  90% {
    transform: translateX(0%)
  }
  100% {
    transform: translateX(120%);
  }
`;