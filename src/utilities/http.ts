import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BalanceItem } from "@/interfaces";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://balance-handler-default-rtdb.europe-west1.firebasedatabase.app/",
  }),
  endpoints: (builder) => ({
    getAllBalances: builder.query<
      BalanceItem[],
      { startDate: number; endDate: number }
    >({
      query: ({ startDate, endDate }) => {
        return `events.json?orderBy="time"&startAt=${startDate}&endAt=${endDate}&limitToLast=100`;
      },
    }),
  }),
});

export const { useGetAllBalancesQuery } = api;
