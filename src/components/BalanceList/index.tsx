import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllBalancesQuery } from "@/utilities/http";
import BalanceListItem from "./BalanceListItem";
import { StyledBalanceListUl } from "./BalanceList.style";

function BalanceList() {
  const [startDate, setStartDate] = useState<Date>(new Date("January 1 2022"));
  const [endDate, setEndDate] = useState<Date>(new Date("July 5 2023"));
  const [page, setPage] = useState<number>(1); // Current page
  const [hasMorePages, setHasMorePages] = useState(true);

  const { data, error, isLoading } = useGetAllBalancesQuery(
    {
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      page: page,
    },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setHasMorePages(data ? data.length < 10 : false);
  };

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
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMorePages}
        >
          Next Page
        </button>
      </div>
    </section>
  );
}

export default BalanceList;
