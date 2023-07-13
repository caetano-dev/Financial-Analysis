export function jurosCompostos(
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

export function pagamentoDeAnuidade(principal, interestRate, periods) { //valor presenta da anuidade
  interestRate = interestRate / 100; // Convert interest rate to decimal
  let presentValue = 0;

  for (let i = 1; i <= periods; i++) {
    let discountFactor = 1 / Math.pow(1 + interestRate, i);
    presentValue += principal * discountFactor;
  }

  return presentValue.toFixed(2);
}


export function periodoDeAmortizacao(principal, interestRate, numYears) {
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
export const jurosCompostosExplaination = `Os juros compostos são um método de cálculo de juros em que os ganhos gerados a cada período são reinvestidos, aumentando o valor principal para os períodos subsequentes. Diferentemente dos juros simples, onde os ganhos são calculados apenas com base no valor principal inicial, os juros compostos levam em consideração tanto o valor principal quanto os juros acumulados anteriormente.

A fórmula geral para o cálculo de juros compostos é:

M = P x (1 + i)^n

Onde:

  M é o montante acumulado após n períodos de tempo.
  P é o principal, ou seja, o valor inicial do investimento.
  i é a taxa de juros aplicada ao investimento, expressa como uma porcentagem decimal.
  n é o número de períodos em que o investimento será realizado.

  Vamos supor que você deseja investir R$1.000,00 com uma taxa de juros de 5% ao ano, durante 3 anos, utilizando juros compostos. Nesse caso, os valores correspondem da seguinte forma:

    P = R$1.000,00 (principal)
    i = 5% = 0,05 (taxa de juros em formato decimal)
    n = 3 (número de anos)

Agora, vamos aplicar a fórmula para calcular o montante acumulado (M):

M = P x (1 + i)^n
M = R$1.000,00 x (1 + 0,05)^3
M = R$1.000,00 x (1,05)^3
M ≈ R$1.157,63

Portanto, o montante acumulado após 3 anos, considerando juros compostos a uma taxa de 5% ao ano, seria aproximadamente R$1.157,63.`

export const annuityExplaination = `O valor presente de uma anuidade é um conceito financeiro usado para determinar o valor atual de uma série de pagamentos futuros que ocorrerão em intervalos regulares, como uma anuidade. É a quantia que seria necessária hoje para igualar o valor dos pagamentos futuros, levando em consideração o tempo e a taxa de juros aplicada.

A fórmula básica para calcular o valor presente de uma anuidade é a seguinte:

VP = P * [(1 - (1 + r)^(-n)) / r]

Onde:
VP = Valor presente da anuidade
P = Pagamento periódico (valor do pagamento a ser feito em cada período)
r = Taxa de juros por período
n = Número total de períodos

A fórmula leva em conta o fato de que o dinheiro tem valor no tempo, ou seja, um valor futuro não é igual a um valor presente. O denominador da fórmula, [(1 - (1 + r)^(-n)) / r], é chamado de fator de desconto e é usado para trazer os pagamentos futuros para o valor presente.

Vamos dar um exemplo para ilustrar o cálculo do valor presente de uma anuidade. Suponha que você tenha uma anuidade que pagará R$ 1.000 por ano durante 5 anos, com uma taxa de juros de 8% ao ano. Usando a fórmula acima, podemos calcular o valor presente:

VP = 1000 * [(1 - (1 + 0.08)^(-5)) / 0.08]
VP = 1000 * [(1 - (1.08)^(-5)) / 0.08]
VP = 1000 * [(1 - 0.68058) / 0.08]
VP = 1000 * [0.31942 / 0.08]
VP = 1000 * 3.99271
VP = 3992.71

Portanto, o valor presente dessa anuidade, considerando os pagamentos de R$ 1.000 por ano durante 5 anos com uma taxa de juros de 8%, é de R$ 3.992,71.

Essa é uma forma de avaliar o valor atual de uma série de pagamentos futuros, permitindo que você compare diferentes opções de investimento, empréstimos ou outros tipos de fluxos de caixa ao longo do tempo.`

export const periodoDeAmortizacaoExplaination = `Uma tabela de amortização é uma ferramenta utilizada para acompanhar o pagamento de um empréstimo ao longo do tempo, fornecendo informações detalhadas sobre cada pagamento periódico. Ela mostra a evolução do saldo devedor, o valor dos juros pagos e a quantia amortizada em cada período.

A tabela de amortização é calculada com base nas informações do empréstimo, incluindo o valor do empréstimo, a taxa de juros, o prazo de pagamento e o método de amortização utilizado. 

A amortização é, sobretudo, o pagamento de dívidas feito por empresas de forma parcelada, em um prazo pré-estabelecido. Ou seja, é o processo de dividir um empréstimo em uma série de pagamentos fixos por um determinado período. Você pagará os juros e o valor principal do empréstimo em montantes diferentes a cada mês, embora seu pagamento total permaneça igual.

Ela é calculada com base no valor principal da dívida, ou seja, é o montante real que foi emprestado ou financiado. E as parcelas não se referem apenas à amortização, mas também aos encargos e juros embutidos. Por exemplo: se foi feito um financiamento de R$ 100 mil para a compra de uma casa, o valor principal da dívida será igual a esses R$ 100 mil.

Diferentemente da depreciação, quando o fator considerado refere-se à eventual escassez de recursos, a amortização leva em conta o tempo em que a empresa passa em posse do investimento.
`;