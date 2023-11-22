import "react-datepicker/dist/react-datepicker.css";
import {
  StyledInput,
  StyledInputContainer,
  StyledSelect,
} from "./BalanceFilters.styles";

interface BalanceFiltersProps {
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  selectedCustomerId: string;
  setSelectedCustomerId: (customerId: string) => void;
  customerIds: string[] | undefined;
}

function BalanceFilters({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedCustomerId,
  setSelectedCustomerId,
  customerIds,
}: BalanceFiltersProps) {
  return (
    <StyledInputContainer>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <StyledInput
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date || new Date("January 1 1970"))}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select Start Date"
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <StyledInput
          id="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date || new Date("January 1 3000"))}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select End Date"
        />
      </div>
      <div>
        <label htmlFor="customerId">Select Customer:</label>
        <StyledSelect
          id="customerId"
          value={selectedCustomerId || ""}
          onChange={(e) => setSelectedCustomerId(e.target.value || "undefined")}
        >
          {customerIds?.map((customerId: string) => (
            <option key={customerId} value={customerId}>
              {customerId}
            </option>
          ))}
        </StyledSelect>
      </div>
    </StyledInputContainer>
  );
}

export default BalanceFilters;
