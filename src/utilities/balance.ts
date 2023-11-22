import { BalanceItem } from "@/interfaces";

function calculateOpeningBalance(data: BalanceItem[], startDate: Date): number {
  let openingBalance = 0;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const balanceItem = data[key];
      const balanceItemTime = balanceItem.time;

      if (balanceItemTime < startDate.getTime()) {
        if (balanceItem.type === "INCREASED") {
          openingBalance += balanceItem.adjustment;
        } else if (balanceItem.type === "DECREASED") {
          openingBalance -= balanceItem.adjustment;
        }
      }
    }
  }

  return openingBalance;
}

function calculateBalanceInTimeframe(
  data: BalanceItem[],
  startDate: Date,
  endDate: Date
): number {
  let totalBalance = 0;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const balanceItem = data[key];
      const balanceItemTime = balanceItem.time;

      if (
        balanceItemTime >= startDate.getTime() &&
        balanceItemTime <= endDate.getTime()
      ) {
        if (balanceItem.type === "INCREASED") {
          totalBalance += balanceItem.adjustment;
        } else if (balanceItem.type === "DECREASED") {
          totalBalance += balanceItem.adjustment;
        }
      }
    }
  }

  return totalBalance;
}

export function calculateTotalBalance(
  data: BalanceItem[],
  startDate: Date,
  endDate: Date
) {
  const openingBalance = calculateOpeningBalance(data, startDate);
  const balanceInTimeframe = calculateBalanceInTimeframe(
    data,
    startDate,
    endDate
  );
  const closingBalance = openingBalance + balanceInTimeframe;
  const balanceDifference = closingBalance - openingBalance;

  return {
    openingBalance,
    closingBalance,
    balanceDifference,
  };
}
