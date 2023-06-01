/*Financial Investment Analysis:
Develop a program that analyzes financial investments using series and sequences.
Implement formulas such as compound interest, annuities, or amortization schedules.
The program can calculate future values, present values, or periodic payments based on user inputs.
This can be useful for individuals or businesses making investment decisions.
*/

function calculateFutureValue(principal, interestRate, periods) {
  var futureValue = principal;

  for (var i = 1; i <= periods; i++) { // series here
    futureValue = futureValue + futureValue * interestRate;
  }

  return futureValue.toFixed(2); // Limiting the decimal places to two
}

function calculateAnnuityPayment(principal, interestRate, periods) {
  var annuityPayment = 0;
  var term = Math.pow(1 + interestRate, periods);

  for (var i = 1; i <= periods; i++) {
    annuityPayment += principal * interestRate * Math.pow(term, -i);
  }
  annuityPayment /= 1 - 1 / term;
  return annuityPayment.toFixed(2); // Limiting the decimal places to two
}

function calculateAmortizationSchedule(principal, interestRate, periods) { // TODO: make sure it's correct.
  // Calculate monthly interest rate
  const monthlyInterestRate = interestRate / 12 / 100;

  // Calculate monthly payment
  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -periods));

  // Initialize an empty array to store the schedule
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


// Example usage
var principal = 1000; // Principal amount, initial value of the investment
var interestRate = 5; // Interest rate (5%)
var periods = 120; // Number of compounding periods (months)

var futureValue = calculateFutureValue(principal, interestRate, periods);
var annuityPayment = calculateAnnuityPayment(principal, interestRate, periods);

var amortizationSchedule = calculateAmortizationSchedule(
  principal,
  interestRate,
  periods
);

var principalData = amortizationSchedule.map((entry) => entry.principalPayment);
var interestData = amortizationSchedule.map((entry) => entry.interestPayment);
var periodsData = amortizationSchedule.map((entry) => entry.period);

function renderChart(principalData, interestData, periodsData) {
  var ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: periodsData,
      datasets: [
        {
          label: "Principal Payment",
          data: principalData,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Interest Payment",
          data: interestData,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Period",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Payment Amount",
          },
        },
      },
    },
  });
}

// Call the renderChart function
renderChart(principalData, interestData, periodsData);

console.log("Future Value:", futureValue);
console.log("Annuity Payment:", annuityPayment);
console.log("Amortization Schedule:", amortizationSchedule);
