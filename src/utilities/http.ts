import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BalanceItem } from "@/interfaces";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://balance-handler-default-rtdb.europe-west1.firebasedatabase.app/", // should be located in an env file, but for simplicity i keep it here while demoing
  }),
  endpoints: (builder) => ({
    getBalanceByCustomer: builder.query<BalanceItem[], string>({
      query: (customerId) => {
        return `events.json?orderBy="customerId"&equalTo="${customerId}"&limitToLast=100`;
      },
    }),
    getAllCustomerIds: builder.query<string[], void>({
      query: () => {
        return `events.json?orderBy="customerId"&limitToFirst=100`;
      },
      transformResponse: (response: Record<string, BalanceItem>) => {
        const customerIds: string[] = [];

        for (const key in response) {
          const balanceItem = response[key];
          if (
            balanceItem.customerId &&
            !customerIds.includes(balanceItem.customerId)
          ) {
            customerIds.push(balanceItem.customerId);
          }
        }
        return customerIds;
      },
    }),
  }),
});

export const { useGetBalanceByCustomerQuery, useGetAllCustomerIdsQuery } = api;
