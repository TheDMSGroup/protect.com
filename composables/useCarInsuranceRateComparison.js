export const useCarInsuranceRateComparison = (monthlyRate, annualRate) => {
  const annualAverage = 2200;
  const monthlyAverage = Math.floor(annualAverage / 12);

  const comparisonStatus = {
    BELOW_AVERAGE: "below",
    AT_AVERAGE: "at",
    ABOVE_AVERAGE: "above",
  };

  const isBelowAverage = (rate, average) => {
    const rateNumber = Number(rate);
    if (rateNumber == null) return comparisonStatus.AT_AVERAGE;
    if (rateNumber < average) return comparisonStatus.BELOW_AVERAGE;
    if (rateNumber === average) return comparisonStatus.AT_AVERAGE;
    return comparisonStatus.ABOVE_AVERAGE;
  };

  return {
    averageAnnual: annualAverage,
    averageMonthly: monthlyAverage,
    comparison: {
      annual: {
        value: annualRate ? annualAverage - annualRate : null,
        comparisonStatus: isBelowAverage(annualRate, annualAverage),
        text: `${isBelowAverage(annualRate, annualAverage)} Average`.replace(
          "at",
          ""
        ),
      },
      monthly: {
        value: monthlyRate ? monthlyAverage - monthlyRate : null,
        comparisonStatus: isBelowAverage(monthlyRate, monthlyAverage),
        text: `${isBelowAverage(monthlyRate, monthlyAverage)} Average`.replace(
          "at",
          ""
        ),
      },
    },
  };
};
