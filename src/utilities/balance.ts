import { BalanceItem } from "@/interfaces";

export function calculateTotalBalance(
  data: BalanceItem[],
  startDate: Date,
  endDate: Date
) {
  let totalBalance = 0;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const balanceItem = data[key];
      const balanceItemTime = balanceItem.time;

      // Check if the balance item's time is within the specified date range
      if (
        balanceItemTime >= startDate.getTime() &&
        balanceItemTime <= endDate.getTime()
      ) {
        if (balanceItem.type === "INCREASED") {
          totalBalance += balanceItem.adjustment;
        } else if (balanceItem.type === "DECREASED") {
          totalBalance -= balanceItem.adjustment;
        }
      }
    }
  }

  return totalBalance;
}
