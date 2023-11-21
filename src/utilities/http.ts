import { createApi } from "@reduxjs/toolkit/query/react";
import { BalanceItem } from "@/interfaces";
import dummyData from "@/data/data.json";

let dummyFilteredData: BalanceItem[] = [];

export const api = createApi({
  baseQuery: () => {
    return { data: dummyFilteredData }; // Return the dummy data directly
  },
  endpoints: (builder) => ({
    getAllBalances: builder.query<
      BalanceItem[],
      {
        startDate: number;
        endDate: number;
        page: number; // Page number
      }
    >({
      query: ({ startDate, endDate, page }) => {
        const filteredData: BalanceItem[] = dummyData
          .filter((item) => item.time >= startDate && item.time <= endDate)
          .sort((a, b) => b.time - a.time); // Sort by date in desc order

        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        dummyFilteredData = paginatedData;
        return paginatedData;
      },
    }),
  }),
});

export const { useGetAllBalancesQuery } = api;
