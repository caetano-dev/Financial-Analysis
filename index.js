/*Financial Investment Analysis:
Develop a program that analyzes financial investments using series and sequences.
Implement formulas such as compound interest, annuities, or amortization schedules.
The program can calculate future values, present values, or periodic payments based on user inputs.
This can be useful for individuals or businesses making investment decisions.
*/
import { compoundInterest, annuityPayment, amortizationSchedule } from "./utils.js";

const calculateCompoundInterestBtn = document.getElementById("calculate-compound-interest-btn");
const calculateAnnuityPaymentBtn = document.getElementById("calculate-annuity-payment-btn");

function calculateCompoundInterest() {
  // Retrieve input values
  let principal = parseFloat(document.getElementById("principal").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);
  let interestFrequency = document.getElementById("interestFrequency").value;
  let periods = parseFloat(document.getElementById("periods").value);
  let periodType = document.getElementById("period-type").value;

  // Call calculateCompoundInterest function
  let compoundInterestResult = compoundInterest(principal, interestRate, periods, interestFrequency, periodType);

  // Update result element
  let resultElement = document.querySelector(".interest-result");
  resultElement.textContent = `Após ${periods} ${periodType}, o montante será de R$ ${compoundInterestResult}. Seu lucro será de R$ ${(compoundInterestResult - principal).toFixed(2)}`;
}

function calculateAnnuityPayment() {
  // Retrieve input values
  let annuityPrincipal = parseFloat(document.getElementById("annuityPrincipal").value);
  let annuityInterestRate = parseFloat(document.getElementById("annuityInterestRate").value);
  let annuityInterestFrequency = document.getElementById("annuityInterestFrequency").value;
  let annuityPeriods = parseFloat(document.getElementById("annuityPeriods").value);
  let annuityPeriodType = document.getElementById("annuityPeriodType").value;

  // Call calculateAnnuityPayment function
  let annuityPaymentResult = annuityPayment(annuityPrincipal, annuityInterestRate, annuityPeriods, annuityInterestFrequency, annuityPeriodType);

  // Update result element
  let resultElement = document.querySelector(".annuity-result");
  resultElement.textContent = `O pagamento da anuidade será de R$ ${annuityPaymentResult} por ${annuityPeriods} ${annuityPeriodType}`;
}

calculateCompoundInterestBtn.addEventListener("click", calculateCompoundInterest);
calculateAnnuityPaymentBtn.addEventListener("click", calculateAnnuityPayment);



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
//renderChart(principalData, interestData, periodsData);
