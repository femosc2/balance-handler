export interface IBalanceItem {
  id: string;
  type: "INCREASED" | "DECREASED";
  time: number;
  customerId: string;
  adjustment: number;
}
