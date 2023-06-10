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
) {
    // Convert interest rate from percentage to decimal
    interestRate = interestRate / 100;
  
    // Calculate the present value of the annuity
    const presentValue =
      principal * ((1 - Math.pow(1 + interestRate, -periods)) / interestRate);
  
    return presentValue.toFixed(2);
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
export const compoundInterestExplaination = `Os juros compostos são um método de cálculo de juros em que os ganhos gerados a cada período são reinvestidos, aumentando o valor principal para os períodos subsequentes. Diferentemente dos juros simples, onde os ganhos são calculados apenas com base no valor principal inicial, os juros compostos levam em consideração tanto o valor principal quanto os juros acumulados anteriormente.

A fórmula geral para o cálculo de juros compostos é:

A = P(1 + r/n)^(nt)

Onde:

    A é o montante total acumulado após o tempo t;
    P é o principal (ou valor inicial) investido;
    r é a taxa de juros anual expressa como decimal (por exemplo, 0,05 para 5%);
    n é o número de vezes que os juros são compostos por ano;
    t é o tempo em anos.

Essa fórmula considera a capitalização dos juros n vezes por ano. Se os juros forem compostos anualmente, n será igual a 1. Se forem compostos semestralmente, n será igual a 2. Se forem compostos trimestralmente, n será igual a 4, e assim por diante.

Para entender melhor, vamos a um exemplo:

Suponha que você investiu R$ 5.000,00 em uma conta de investimento que oferece uma taxa de juros anual de 6%, com capitalização mensal, durante 3 anos.

Usando a fórmula dos juros compostos, temos:

A = 5000(1 + 0,06/12)^(12*3)
A = 5000(1 + 0,005)^(36)
A = 5000(1,005)^(36)
A ≈ 5904,81

Portanto, após 3 anos, o montante total acumulado será de aproximadamente R$ 5.904,81.

Essa fórmula demonstra como os juros compostos podem aumentar significativamente o valor total ao longo do tempo, uma vez que os ganhos são reinvestidos e também geram seus próprios ganhos.`

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

Portanto, o valor presente dessa anuidade, considerando os pagamentos de R$ 1.000 por ano durante 5 anos com uma taxa de juros de 8%, é de R$ 3.992,75.

Essa é uma forma de avaliar o valor atual de uma série de pagamentos futuros, permitindo que você compare diferentes opções de investimento, empréstimos ou outros tipos de fluxos de caixa ao longo do tempo.`

export const amortizationScheduleExplaination = `Uma tabela de amortização é uma ferramenta utilizada para acompanhar o pagamento de um empréstimo ao longo do tempo, fornecendo informações detalhadas sobre cada pagamento periódico. Ela mostra a evolução do saldo devedor, o valor dos juros pagos e a quantia amortizada em cada período.

A tabela de amortização é calculada com base nas informações do empréstimo, incluindo o valor do empréstimo, a taxa de juros, o prazo de pagamento e o método de amortização utilizado. O método mais comum é o sistema de amortização constante (SAC), mas existem outros, como o sistema Price.

Vamos considerar o exemplo de um empréstimo de R$ 10.000, com uma taxa de juros anual de 10% e um prazo de pagamento de 5 anos (60 meses) utilizando o método SAC. Para calcular a tabela de amortização, precisamos seguir os seguintes passos:

    Calcular a amortização mensal: A amortização é a parte do pagamento que reduz o saldo devedor. No caso do SAC, a amortização é constante em cada período. Nesse exemplo, o valor do empréstimo é dividido pelo número de meses, ou seja, R$ 10.000 / 60 = R$ 166,67.

    Calcular os juros mensais: Os juros são calculados com base no saldo devedor remanescente em cada período. No primeiro mês, o saldo devedor é igual ao valor do empréstimo, então os juros seriam 10% de R$ 10.000, o que resulta em R$ 1.000.

    Calcular o pagamento mensal: O pagamento mensal é a soma da amortização e dos juros. No primeiro mês, seria R$ 166,67 (amortização) + R$ 1.000 (juros) = R$ 1.166,67.

    Calcular o novo saldo devedor: O saldo devedor remanescente é reduzido pela amortização a cada período. No primeiro mês, o saldo devedor seria R$ 10.000 - R$ 166,67 = R$ 9.833,33.

Esses cálculos são repetidos para cada período até o final do prazo de pagamento. Cada mês, a amortização continua constante, mas os juros são recalculados com base no saldo devedor remanescente.

Uma vez que todos esses cálculos são realizados para cada período, os valores são organizados em uma tabela. A tabela de amortização mostra o número do período, o pagamento mensal, a parte do pagamento correspondente aos juros, a parte do pagamento correspondente à amortização e o saldo devedor remanescente.

Essa é uma visão geral de como funciona uma tabela de amortização e como ela é calculada. A tabela permite que o mutuário visualize o progresso do pagamento do empréstimo, acompanhe a redução do saldo devedor e entenda a composição dos pagamentos mensais entre juros e amortização."
`;
