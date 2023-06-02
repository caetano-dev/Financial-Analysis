//import Chart from 'chart.js';

import {
  compoundInterest,
  annuityPayment,
  amortizationSchedule,
} from "./utils.js";

const calculateCompoundInterestBtn = document.getElementById(
  "calculate-compound-interest-btn"
);
const calculateAnnuityPaymentBtn = document.getElementById(
  "calculate-annuity-payment-btn"
);
const calculateAmortizationScheduleBtn = document.getElementById(
  "calculate-amortization-btn"
);

function calculateCompoundInterest() {
  // Retrieve input values
  let principal = parseFloat(document.getElementById("principal").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);
  let interestFrequency = document.getElementById("interestFrequency").value;
  let periods = parseFloat(document.getElementById("periods").value);
  let periodType = document.getElementById("period-type").value;

  // Call calculateCompoundInterest function
  let compoundInterestResult = compoundInterest(
    principal,
    interestRate,
    periods,
    interestFrequency,
    periodType
  );

  // Update result element
  let resultElement = document.querySelector(".interest-result");
  resultElement.textContent = `Após ${periods} ${periodType}, o montante será de R$ ${compoundInterestResult}. Seu lucro será de R$ ${(
    compoundInterestResult - principal
  ).toFixed(2)}.`;
}

function calculateAnnuityPayment() {
  // Retrieve input values
  let annuityPrincipal = parseFloat(
    document.getElementById("annuityPrincipal").value
  );
  let annuityInterestRate = parseFloat(
    document.getElementById("annuityInterestRate").value
  );
  let annuityInterestFrequency = document.getElementById(
    "annuityInterestFrequency"
  ).value;
  let annuityPeriods = parseFloat(
    document.getElementById("annuityPeriods").value
  );
  let annuityPeriodType = document.getElementById("annuityPeriodType").value;

  // Call calculateAnnuityPayment function
  let annuityPaymentResult = annuityPayment(
    annuityPrincipal,
    annuityInterestRate,
    annuityPeriods,
    annuityInterestFrequency,
    annuityPeriodType
  );

  // Update result element
  let resultElement = document.querySelector(".annuity-result");
  resultElement.textContent = `O pagamento da anuidade será de R$ ${annuityPaymentResult} por ${annuityPeriods} ${annuityPeriodType}`;
}

function calculateAmortizationSchedule() {
  // Retrieve input values
  let amortizationPrincipal = parseFloat(
    document.getElementById("amortizationPrincipal").value
  );
  let amortizationInterestRate = parseFloat(
    document.getElementById("amortizationInterestRate").value
  );
  let amortizationPeriods = parseFloat(
    document.getElementById("amortizationPeriods").value
  );

  // Call amortizationSchedule function
  let schedule = amortizationSchedule(
    amortizationPrincipal,
    amortizationInterestRate,
    amortizationPeriods
  );
  var principalData = schedule.map((entry) => entry.principalPayment);
  var interestData = schedule.map((entry) => entry.interestPaid);
  var periodsData = schedule.map((entry) => entry.period);
  var remainingData = schedule.map((entry) => entry.remainingBalance);
    // Scroll the page to the bottom after a delay of 0.5 seconds
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 500);

  renderChart(principalData, interestData, periodsData, remainingData);
}

calculateCompoundInterestBtn.addEventListener(
  "click",
  calculateCompoundInterest
);
calculateAnnuityPaymentBtn.addEventListener("click", calculateAnnuityPayment);
calculateAmortizationScheduleBtn.addEventListener(
  "click",
  calculateAmortizationSchedule
);

function renderChart(principalData, interestData, periodsData, remainingData) {
  var ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: periodsData,
      datasets: [
        {
          label: "Pagamento Principal",
          data: principalData,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Pagamento de Juros",
          data: interestData,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Saldo Restante",
          data: remainingData,
          backgroundColor: "rgba(0, 204, 0, 0.5)",
          borderColor: "rgba(0, 204, 0, 1)",
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
            text: "Meses",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Valores pagos",
          },
        },
      },
    },
  });
}
