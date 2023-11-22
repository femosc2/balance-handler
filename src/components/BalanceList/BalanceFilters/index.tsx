import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <DatePicker
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
        <DatePicker
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
        <select
          id="customerId"
          value={selectedCustomerId || ""}
          onChange={(e) => setSelectedCustomerId(e.target.value || "undefined")}
        >
          {customerIds?.map((customerId: string) => (
            <option key={customerId} value={customerId}>
              {customerId}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BalanceFilters;
