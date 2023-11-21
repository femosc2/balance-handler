import { BalanceAction, ToastStatus } from "@/types";

export interface BalanceItem {
  id: string;
  type: BalanceAction;
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
