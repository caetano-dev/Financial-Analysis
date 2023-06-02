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

  export function amortizationSchedule(principal, interestRate, periods) {
    periods*=12
    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // Calculate monthly payment
    const monthlyPayment = principal * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -periods)));
    
    const schedule = [];
  
    // Loop through each period
    for (let period = 1; period <= periods; period++) {
      // Calculate remaining balance
      const remainingBalance = principal - (monthlyPayment * (Math.pow(1 + monthlyInterestRate, period) - 1)) / monthlyInterestRate;
  
      // Calculate interest payment
      const interestPayment = principal * monthlyInterestRate;
  
      // Calculate principal payment
      const principalPayment = monthlyPayment - interestPayment;
      principal -= monthlyPayment;
  
      // Add period, remaining balance, interest payment, principal payment to the schedule
      schedule.push({
        period: period,
        remainingBalance: remainingBalance.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2)
      });
    }
    /*
var principal = 200000; // for example
var periods = 360; // 30 years
var monthlyRate = (0.065)/12;  // 0.065= APR of 6.5% as decimal
var monthyPayment = (monthlyRate /(1-(Math.pow((1+monthlyRate),-(periods)))))*principal;

for (var i=0; i<360; i++) {
  var interestForMonth = balance * monthlyRate;
  var principalForMonth = monthlyPayment - interestForMonth;
  principal -= monthlyPayment; // probably should be -= principalForMonth see comments below
  // output as necessary.
}
*/

  
    return schedule;
  }
  