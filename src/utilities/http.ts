import { dummyBalances } from "../data";
import { IBalanceItem } from "../interfaces";

export function getAllBalances(): Promise<IBalanceItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyBalances);
    }, 1000); // Simulating an async operation with a delay
  });
}
