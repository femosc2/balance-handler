import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllBalancesQuery } from "@/utilities/http";
import BalanceListItem from "./BalanceListItem";
import { StyledBalanceListUl } from "./BalanceList.style";
import useWindowFocus from "use-window-focus";

function BalanceList() {
  const [startDate, setStartDate] = useState<Date>(new Date("January 1 2022"));
  const [endDate, setEndDate] = useState<Date>(new Date("July 5 2023"));

  const windowFocused = useWindowFocus();

  const { data, error, isLoading } = useGetAllBalancesQuery(
    {
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    },
    { pollingInterval: windowFocused ? 1000 : 0 }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

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
      <StyledBalanceListUl>
        {data?.map((balance) => (
          <BalanceListItem balance={balance} key={balance.id} />
        ))}
      </StyledBalanceListUl>
    </section>
  );
}

export default BalanceList;
