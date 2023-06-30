import {
  jurosCompostos,
  pagamentoDeAnuidade,
  periodoDeAmortizacao,
  periodoDeAmortizacaoExplaination,
  jurosCompostosExplaination,
  annuityExplaination,
} from "./utils.js";

const calcularJurosCompostosBtn = document.getElementById(
  "calculate-compound-interest-btn"
);
const calcularPagamentoDeAnuidadeBtn = document.getElementById(
  "calculate-annuity-payment-btn"
);
const calcularPeriodoDeAmortizacaoBtn = document.getElementById(
  "calculate-amortization-btn"
);

function calcularJurosCompostos() {
  let principal = document.getElementById("principal").value;
  let interestRate = document.getElementById("interestRate").value;
  let interestFrequency = document.getElementById("interestFrequency").value;
  let periods = document.getElementById("periods").value;
  let periodType = document.getElementById("period-type").value;

  if (
    principal === "" ||
    interestRate === "" ||
    interestFrequency === "" ||
    periods === "" ||
    periodType === ""
  ) {
    alert("Por favor, preencha todos os campos com números!");
    return;
  } else {
    let jurosCompostosResult = jurosCompostos(
      principal,
      interestRate,
      periods,
      interestFrequency,
      periodType
    );

    let resultElement = document.querySelector(".interest-result");
    resultElement.textContent = `Após ${periods} ${periodType}, o montante será de R$ ${jurosCompostosResult}. Seu lucro será de R$ ${(
      jurosCompostosResult - principal
    ).toFixed(2)}.`;
  }
}

function calcularPagamentoDeAnuidade() {
  let annuityPrincipal = document.getElementById("annuityPrincipal").value;
  let annuityInterestRate = document.getElementById(
    "annuityInterestRate"
  ).value;
  let annuityPeriods = document.getElementById("annuityPeriods").value;

  if (
    pagamentoDeAnuidade === "" ||
    annuityInterestRate === "" ||
    annuityPeriods === ""
  ) {
    alert("Por favor, preencha todos os campos com números!");
    return;
  } else {
    let pagamentoDeAnuidadeResult = pagamentoDeAnuidade(
      annuityPrincipal,
      annuityInterestRate,
      annuityPeriods
    );

    let resultElement = document.querySelector(".annuity-result");
    resultElement.textContent = `O pagamento da anuidade será de R$ ${pagamentoDeAnuidadeResult} por ${annuityPeriods} anos`;
  }
}

function calcularPeriodoDeAmortizacao() {
  let amortizationPrincipal = document.getElementById(
    "amortizationPrincipal"
  ).value;
  let amortizationInterestRate = document.getElementById(
    "amortizationInterestRate"
  ).value;
  let amortizationPeriods = document.getElementById(
    "amortizationPeriods"
  ).value;

  if (
    amortizationPrincipal === "" ||
    amortizationInterestRate === "" ||
    amortizationPeriods === ""
  ) {
    alert("Por favor, preencha todos os campos com números!");
    return;
  } else {
    let schedule = periodoDeAmortizacao(
      amortizationPrincipal,
      amortizationInterestRate,
      amortizationPeriods
    );
    console.log(amortizationInterestRate);
    var principalData = schedule.map((entry) => entry.principalPayment);
    var interestData = schedule.map((entry) => entry.interestPaid);
    var periodsData = schedule.map((entry) => entry.period);
    var remainingData = schedule.map((entry) => entry.remainingBalance);
    const table = document.getElementById("schedule-table");
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
    <th>Período</th>
    <th>Saldo Remanescente</th>
    <th>Juros Pagos</th>
    <th>Pagamento do Principal</th>
    `;
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    // Create table body
    const tableBody = document.createElement("tbody");
    schedule.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.period}°</td>
        <td>R$${entry.remainingBalance}</td>
        <td>R$${entry.interestPaid}</td>
        <td>R$${entry.principalPayment}</td>
      `;
      tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    renderChart(principalData, interestData, periodsData, remainingData);
  }
}

calcularJurosCompostosBtn.addEventListener("click", calcularJurosCompostos);
calcularPagamentoDeAnuidadeBtn.addEventListener(
  "click",
  calcularPagamentoDeAnuidade
);
calcularPeriodoDeAmortizacaoBtn.addEventListener(
  "click",
  calcularPeriodoDeAmortizacao
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

// Open and close the "Como funciona?" dialogs
const interestDialog = document.getElementById("how-it-works-interest-dialog");
const interestParagraph = document.getElementById(
  "how-it-works-interest-paragraph"
);
interestParagraph.innerText = jurosCompostosExplaination;
const interestBtn = document.getElementById("how-it-works-interest-btn");

const annuityDialog = document.getElementById("how-it-works-annuity-dialog");
const annuityParagraph = document.getElementById(
  "how-it-works-annuity-paragraph"
);
annuityParagraph.innerText = annuityExplaination;
const annuityBtn = document.getElementById("how-it-works-annuity-btn");

const amortizationDialog = document.getElementById(
  "how-it-works-amortization-dialog"
);
const amortizationParagraph = document.getElementById(
  "how-it-works-amortization-paragraph"
);
amortizationParagraph.innerText = periodoDeAmortizacaoExplaination;
const amortizationBtn = document.getElementById(
  "how-it-works-amortization-btn"
);

interestBtn.addEventListener("click", () => interestDialog.showModal());
annuityBtn.addEventListener("click", () => annuityDialog.showModal());
amortizationBtn.addEventListener("click", () => amortizationDialog.showModal());

interestDialog.addEventListener("close", () =>
  interestDialog.querySelector("form").reset()
);
annuityDialog.addEventListener("close", () =>
  annuityDialog.querySelector("form").reset()
);
amortizationDialog.addEventListener("close", () =>
  amortizationDialog.querySelector("form").reset()
);

const dialogButtons = document.querySelectorAll(".btn-info");
const closeButtons = document.querySelectorAll(".dialog-close");
const overlay = document.createElement("div");
overlay.className = "overlay";

dialogButtons.forEach((button) => {
  const dialogId = button.getAttribute("id").replace("how-it-works-", "");
  const dialog = document.getElementById(dialogId);

  button.addEventListener("click", () => {
    document.body.appendChild(overlay);
    dialog.showModal();
  });
});

closeButtons.forEach((button) => {
  const dialog = button.parentElement;
  button.addEventListener("click", () => {
    dialog.close();
    document.body.removeChild(overlay);
  });
});
