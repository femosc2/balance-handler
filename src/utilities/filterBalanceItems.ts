import { BalanceItem } from "@/interfaces";

export function filterBalanceItemsByDateRange(
  data: BalanceItem[],
  startDate: Date,
  endDate: Date
): BalanceItem[] {
  if (data) {
    const dataArray = Object.values(data);

    return dataArray
      .filter((balanceItem: BalanceItem) => {
        const balanceItemTime = new Date(balanceItem.time);

        return balanceItemTime >= startDate && balanceItemTime <= endDate;
      })
      .map((balanceItem: BalanceItem) => {
        return {
          id: balanceItem.id,
          type: balanceItem.type,
          time: balanceItem.time,
          customerId: balanceItem.customerId,
          adjustment: balanceItem.adjustment,
        };
      })
      .reverse();
  } else {
    return [];
  }
}
