import React from "react";
import { BalanceItem } from "@/interfaces";
import { StyledBalanceItem } from "./BalanceListItem.styles";

interface Props {
  balance: BalanceItem;
}

const BalanceListItem: React.FC<Props> = ({ balance }) => {
  const { id, type, time, customerId, adjustment } = balance;

  return (
    <StyledBalanceItem
      isPositive={type === "INCREASED"}
      role="listitem"
      aria-label={`Balance Item for Event ID ${id}`}
    >
      <div>
        <h4>Event ID:</h4>
        <p>{id}</p>
      </div>
      <div>
        <h4>Date:</h4>
        <p>
          <time dateTime={new Date(time).toISOString()}>
            {new Date(time).toDateString()}
          </time>
        </p>
      </div>
      <div>
        <h4>Customer ID:</h4>
        <p>{customerId}</p>
      </div>
      <div>
        <h4>Adjustment:</h4>
        <p>
          <span
            aria-label={`Adjustment Amount: ${
              adjustment >= 0 ? "+" : ""
            }${adjustment}`}
          >
            {adjustment >= 0 && "+"}
            {adjustment}
          </span>
        </p>
      </div>
    </StyledBalanceItem>
  );
};

export default BalanceListItem;
