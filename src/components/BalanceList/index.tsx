import { useEffect, useState } from "react";
import {
  useGetBalanceByCustomerQuery,
  useGetAllCustomerIdsQuery,
} from "@/utilities/http";
import BalanceListItem from "./BalanceListItem";
import {
  StyledBalanceContainer,
  StyledBalanceListUl,
} from "./BalanceList.style";
import useWindowFocus from "use-window-focus";
import { calculateTotalBalance } from "@/utilities/balance";
import { BalanceItem, BalanceResult } from "@/interfaces";
import { filterBalanceItemsByDateRange } from "@/utilities/filterBalanceItems";
import BalanceDisplay from "./BalanceDisplay";
import BalanceFilters from "./BalanceFilters";
import { useDispatch } from "react-redux";
import { addToast } from "../Toasts/redux/actions";

function BalanceList() {
  const [startDate, setStartDate] = useState<Date>(new Date("January 1 2023"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string>("us.customer-01");
  const windowFocused = useWindowFocus();
  const dispatch = useDispatch();
  const [totalBalanceInfo, setTotalBalanceInfo] = useState<BalanceResult>();
  const [filteredBalanceItems, setFilteredBalanceItems] =
    useState<BalanceItem[]>();

  const { data: customerIds, error: customerIdsError } =
    useGetAllCustomerIdsQuery(undefined, {
      pollingInterval: windowFocused ? 1000 : 0, // Poll every 1000ms (1 second) when the window is focused
    });

  const { data, error, isLoading } = useGetBalanceByCustomerQuery(
    selectedCustomerId,
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: windowFocused ? 1000 : 0,
    }
  );

  useEffect(() => {
    setFilteredBalanceItems(
      filterBalanceItemsByDateRange(data as BalanceItem[], startDate, endDate)
    );
    setTotalBalanceInfo(
      calculateTotalBalance(data as BalanceItem[], startDate, endDate)
    );
  }, [data, endDate, setTotalBalanceInfo, startDate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || customerIdsError) {
    dispatch(
      addToast({
        header: "Failure",
        body: `Invalid Customer`,
        time: Date.now(),
        status: "failure",
        id: crypto.randomUUID(),
      })
    );
    setSelectedCustomerId("us.customer-01");

    return <div>Error</div>;
  }

  return (
    <StyledBalanceContainer>
      <BalanceFilters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedCustomerId={selectedCustomerId}
        setSelectedCustomerId={setSelectedCustomerId}
        customerIds={customerIds}
      />
      {totalBalanceInfo && (
        <BalanceDisplay
          openingBalance={totalBalanceInfo.openingBalance}
          closingBalance={totalBalanceInfo.closingBalance}
          balanceDifference={totalBalanceInfo.balanceDifference}
        />
      )}
      <StyledBalanceListUl>
        {filteredBalanceItems?.map(
          (balanceItem, index) =>
            balanceItem && (
              <BalanceListItem
                balance={balanceItem}
                key={balanceItem.id + index}
              />
            )
        )}
      </StyledBalanceListUl>
    </StyledBalanceContainer>
  );
}

export default BalanceList;
