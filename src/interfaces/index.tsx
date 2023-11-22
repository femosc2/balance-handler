import { ToastStatus } from "@/types";

export interface BalanceItem {
  id: string;
  type: string; // This should be a balance action but no API
  time: number;
  customerId: string;
  adjustment: number;
}

export interface Toast {
  status: ToastStatus;
  id: string;
  time: number;
  header: string;
  body: string;
}

export interface BalanceResult {
  openingBalance: number;
  closingBalance: number;
  balanceDifference: number;
}
