export const useCarInsuranceRateComparison = (monthlyRate, annualRate) => {
  const annualAverage = 2200;
  const monthlyAverage = annualAverage / 12;
  return {
    averageAnnual: annualAverage,
    averageMonthly: monthlyAverage,
    comparison: {
      annual: {
        value: annualRate ? annualAverage - annualRate : null,
        isBelowAverage: annualRate ? annualRate < annualAverage : null,
      },
      monthly: {
        value: monthlyRate ? monthlyAverage - monthlyRate : null,
        isBelowAverage: monthlyRate ? monthlyRate < monthlyAverage : null,
      },
    },
  };
};
