import { dummyBalances } from "../data";
import { BalanceItem } from "@/interfaces";

export function getAllBalances(): Promise<BalanceItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyBalances);
    }, 1000); // Simulating an async operation with a delay
  });
}
