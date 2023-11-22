import { BalanceItem } from "@/interfaces";

export function calculateTotalBalance(
  data: BalanceItem[],
  startDate: Date,
  endDate: Date
) {
  let totalBalance = 0;
  let openingBalance = 0;

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

      // Calculate the opening balance for events before the start date
      if (balanceItemTime < startDate.getTime()) {
        if (balanceItem.type === "INCREASED") {
          openingBalance += balanceItem.adjustment;
        } else if (balanceItem.type === "DECREASED") {
          openingBalance -= balanceItem.adjustment;
        }
      }
    }
  }

  // Calculate closing balance by adding the opening balance to the total balance
  const closingBalance = openingBalance + totalBalance;

  return {
    openingBalance,
    closingBalance,
  };
}
