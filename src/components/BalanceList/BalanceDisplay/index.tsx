interface BalanceDisplayProps {
  openingBalance: number;
  closingBalance: number;
  balanceDifference: number;
}

function BalanceDisplay({
  openingBalance,
  closingBalance,
  balanceDifference,
}: BalanceDisplayProps) {
  return (
    <div>
      Opening Balance: {openingBalance}
      <br />
      Closing Balance: {closingBalance}
      <br />
      Balance Difference: {balanceDifference}
    </div>
  );
}

export default BalanceDisplay;
