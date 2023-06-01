/*Financial Investment Analysis:
Develop a program that analyzes financial investments using series and sequences.
Implement formulas such as compound interest, annuities, or amortization schedules.
The program can calculate future values, present values, or periodic payments based on user inputs.
This can be useful for individuals or businesses making investment decisions.
*/
import { calculateFutureValue, calculateAnnuityPayment, calculateAmortizationSchedule } from "./utils.js";

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
