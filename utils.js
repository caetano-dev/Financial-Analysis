export function compoundInterest(
  principal,
  interestRate,
  periods,
  interestFrequency,
  periodType
) {
  const rate = interestRate / 100;
  let amount = principal;
  let n = 1;

  if (interestFrequency === "monthly") {
    n = 12;
  }
  if (periodType === "meses") {
    periods /= 12;
  }
  let rateAndPeriods = 1;
  for (let i = 1; i <= n * periods; i++) {
    rateAndPeriods *= 1 + rate / n;
  }
  amount *= rateAndPeriods;

  return amount.toFixed(2);
}

export function annuityPayment(
  principal,
  interestRate,
  periods,
  interestFrequency,
  periodType
) {
  // what does this even mean?
  let annuityPayment = 0;
  let interestFrequencyFactor = interestFrequency === "monthly" ? 12 : 1;
  let periodsInMonths = periodType === "months" ? periods : periods * 12;
  let term = Math.pow(
    1 + interestRate / (interestFrequencyFactor * 100),
    periodsInMonths
  );

  for (let i = 1; i <= periodsInMonths; i++) {
    annuityPayment +=
      principal *
      (interestRate / (interestFrequencyFactor * 100)) *
      Math.pow(term, -i);
  }

  annuityPayment /= 1 - 1 / term;
  return annuityPayment.toFixed(2);
}

export function amortizationSchedule(principal, interestRate, numYears) {
  const schedule = [];
  const monthlyInterestRate = interestRate / 12 / 100;
  const numPayments = numYears * 12;
  const monthlyPayment =
    principal *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments)));

  let remainingBalance = principal;
  let principalPayment = 0;
  let interestPaid = 0;

  for (let period = 1; period <= numPayments; period++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPaymentForRemainingBalance =
      monthlyPayment - interestPayment;

    principalPayment += principalPaymentForRemainingBalance;
    interestPaid += interestPayment;
    remainingBalance -= principalPaymentForRemainingBalance;

    console.log(monthlyInterestRate * remainingBalance);
    schedule.push({
      period: period,
      remainingBalance: parseFloat(remainingBalance.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      principalPayment: parseFloat(principalPayment.toFixed(2)),
    });
  }

  return schedule;
}
