export function calculateFutureValue(principal, interestRate, periods) {
  var futureValue = principal;
  for (var i = 1; i <= periods; i++) { // series here
    futureValue = futureValue + futureValue * interestRate;
  }
  return futureValue.toFixed(2); // Limiting the decimal places to two
}

export function calculateAnnuityPayment(principal, interestRate, periods) {
  var annuityPayment = 0;
  var term = Math.pow(1 + interestRate, periods);
  for (var i = 1; i <= periods; i++) {
    annuityPayment += principal * interestRate * Math.pow(term, -i);
  }
  annuityPayment /= 1 - 1 / term;
  return annuityPayment.toFixed(2); // Limiting the decimal places to two
}

export function calculateAmortizationSchedule(principal, interestRate, periods) { // TODO: make sure it's correct. pay attention to the time unit.
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