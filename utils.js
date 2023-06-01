export function compoundInterest(principal, interestRate, periods, interestFrequency, periodType) {
    const rate = interestRate/100;
    let amount = principal;
    let n = 1
  
    if (interestFrequency === "monthly") {
        n = 12;
    }
    if (periodType === "meses") {
      periods /= 12;
    }
    let rateAndPeriods=1
    for (let i = 1; i <= n*periods; i++) {
      rateAndPeriods *= (1 + rate / n);
    }
    amount *= rateAndPeriods;

    return amount.toFixed(2);
  }
  
  export function annuityPayment(principal, interestRate, periods, interestFrequency, periodType) { // what does this even mean?
    let annuityPayment = 0;
    let interestFrequencyFactor = (interestFrequency === "monthly") ? 12 : 1;
    let periodsInMonths = (periodType === "months") ? periods : periods * 12;
    let term = Math.pow(1 + interestRate / (interestFrequencyFactor * 100), periodsInMonths);
  
    for (let i = 1; i <= periodsInMonths; i++) {
      annuityPayment += principal * (interestRate / (interestFrequencyFactor * 100)) * Math.pow(term, -i);
    }
  
    annuityPayment /= 1 - 1 / term;
    return annuityPayment.toFixed(2);
  }

export function amortizationSchedule(principal, interestRate, periods) { // TODO: make sure it's correct. pay attention to the time unit.
  // Calculate monthly interest rate
  const monthlyInterestRate = interestRate / 12 / 100;
  // Calculate monthly payment
  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -periods));
  const schedule = [];
  // Loop through each period
  for (let period = 1; period <= periods; period++) {
    // Calculate remaining balance
    const remainingBalance = principal * Math.pow(1 + monthlyInterestRate, period) - (monthlyPayment * (Math.pow(1 + monthlyInterestRate, period) - 1)) / monthlyInterestRate;
    // Calculate interest payment
    const interestPayment = remainingBalance * monthlyInterestRate;
    // Calculate principal payment
    const principalPayment = monthlyPayment - interestPayment;
    // Calculate total payment
    const totalPayment = monthlyPayment + interestPayment;
    // Add period, remaining balance, interest payment, principal payment, and total payment to the schedule
    schedule.push({
      period: period,
      remainingBalance: remainingBalance.toFixed(2),
      interestPayment: interestPayment.toFixed(2),
      principalPayment: principalPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  }

  return schedule;
}