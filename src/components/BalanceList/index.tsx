/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useGetBalanceByCustomerQuery, // Import the new hook
  useGetAllCustomerIdsQuery,
} from "@/utilities/http";
import BalanceListItem from "./BalanceListItem";
import { StyledBalanceListUl } from "./BalanceList.style";
import useWindowFocus from "use-window-focus";
import { calculateTotalBalance } from "@/utilities/balance"; // Import the utility function
import { BalanceItem } from "@/interfaces";

function BalanceList() {
  const [startDate, setStartDate] = useState<Date>(new Date("January 1 2022"));
  const [endDate, setEndDate] = useState<Date>(new Date("July 5 2023"));
  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string>("us.customer-01");
  const windowFocused = useWindowFocus();

  // Fetch all customer IDs
  const { data: customerIds, error: customerIdsError } =
    useGetAllCustomerIdsQuery();

  // Use the new getBalanceByCustomer query
  const { data, error, isLoading } = useGetBalanceByCustomerQuery(
    selectedCustomerId, // Pass the selectedCustomerId as a parameter
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: windowFocused ? 1000 : 0,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || customerIdsError) {
    setSelectedCustomerId("us.customer-01");
    return <div>Error</div>;
  }

  // Calculate the total balance within the specified date range
  const totalBalance = calculateTotalBalance(
    data as BalanceItem[],
    startDate,
    endDate
  );

  return (
    <section>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) =>
            setStartDate(date ? date : new Date("January 1 1970"))
          }
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select Start Date"
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={(date) =>
            setEndDate(date ? date : new Date("January 1 3000"))
          }
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select End Date"
        />
      </div>
      <div>
        <label htmlFor="customerId">Select Customer:</label>
        <select
          id="customerId"
          value={selectedCustomerId || ""}
          onChange={(e) => setSelectedCustomerId(e.target.value || "undefined")}
        >
          {customerIds?.map((customerId) => (
            <option key={customerId} value={customerId}>
              {customerId}
            </option>
          ))}
        </select>
      </div>
      <div>Total Balance within the Date Range: {totalBalance}</div>
      <StyledBalanceListUl>
        {data &&
          Object.keys(data).map((key) => {
            const balanceItem = data[key as any];
            return <BalanceListItem balance={balanceItem} key={key} />;
          })}
      </StyledBalanceListUl>
    </section>
  );
}

export default BalanceList;
