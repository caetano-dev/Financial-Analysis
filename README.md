# Calculadora financeira

Arquivo index.js:

O arquivo `index.js` contém o código JavaScript responsável pela interação com a página web e pela utilização das funções financeiras fornecidas pelo módulo `utils.js`. 

1. Importação das funções do módulo `utils.js`:
   - `compoundInterest`, `annuityPayment`, `amortizationSchedule`, `amortizationScheduleExplaination`, `compoundInterestExplaination` e `annuityExplaination` são importadas do arquivo `utils.js`.

2. Seleção dos elementos HTML:
   - Os elementos HTML necessários para a interação com o usuário são selecionados utilizando o método `getElementById`.

3. Definição das funções de cálculo:
   - `calculateCompoundInterest()`: Essa função é chamada quando o botão "calculate-compound-interest-btn" é clicado. Ela recupera os valores dos campos de entrada, verifica se estão preenchidos corretamente e chama a função `compoundInterest` do módulo `utils.js` para calcular o montante acumulado de um investimento com juros compostos. O resultado é exibido na página.
   
   - `calculateAnnuityPayment()`: Essa função é chamada quando o botão "calculate-annuity-payment-btn" é clicado. Ela recupera os valores dos campos de entrada, verifica se estão preenchidos corretamente e chama a função `annuityPayment` do módulo `utils.js` para calcular o valor do pagamento da anuidade. O resultado é exibido na página.
   
   - `calculateAmortizationSchedule()`: Essa função é chamada quando o botão "calculate-amortization-btn" é clicado. Ela recupera os valores dos campos de entrada, verifica se estão preenchidos corretamente e chama a função `amortizationSchedule` do módulo `utils.js` para calcular a tabela de amortização de um empréstimo. Os dados da tabela são usados para gerar um gráfico que é exibido na página.

4. Função `renderChart(principalData, interestData, periodsData, remainingData)`:
   - Essa função recebe os dados da tabela de amortização (pagamento principal, pagamento de juros, períodos e saldo restante) e renderiza um gráfico de linha utilizando a biblioteca Chart.js. O gráfico exibe as informações de pagamento principal, pagamento de juros e saldo restante ao longo dos períodos.

5. Event listeners:
   - Os botões de cálculo têm event listeners que chamam as funções de cálculo correspondentes quando são clicados.

6. Funções para exibição das explicações:
   - As explicações sobre o funcionamento das funções `compoundInterest`, `annuityPayment` e `amortizationSchedule` são exibidas em diálogos modais quando os botões "Como funciona?" são clicados. Essas funções definem event listeners para os botões e os diálogos modais, garantindo que os diálogos sejam abertos e fechados corretamente.

7. Funções para abertura e fechamento dos diálogos modais:
   - Essas funções são responsáveis por abrir e fechar os diálogos modais quando os botões correspondentes são clicados. Além disso, é adicionado um overlay à página para escurecer o fundo da tela.

Arquivo utils.js:

O código fornecido é um módulo JavaScript que exporta três funções relacionadas a cálculos financeiros: `compoundInterest`, `annuityPayment` e `amortizationSchedule`.

1. `compoundInterest(principal, interestRate, periods, interestFrequency, periodType)`: Esta função calcula o montante acumulado de um investimento com juros compostos. Ela recebe os seguintes parâmetros:
   - `principal`: O valor inicial do investimento.
   - `interestRate`: A taxa de juros anual.
   - `periods`: O número de períodos do investimento.
   - `interestFrequency`: A frequência de juros (mensal, anual, etc.).
   - `periodType`: O tipo de período (meses, anos, etc.).
   
   A função converte a taxa de juros para uma taxa decimal, inicializa a variável `amount` com o valor principal e define `n` como 1. Em seguida, verifica se a frequência de juros é mensal e, se for, atualiza `n` para 12. Também verifica se o tipo de período é meses e, se for, divide o número de períodos por 12 para obter o número de anos. 

   A variável `rateAndPeriods` é inicializada como 1 e, em seguida, é iterada `n * periods` vezes em um loop. A cada iteração, `rateAndPeriods` é multiplicado por `1 + rate / n`, onde `rate` é a taxa de juros decimal. Por fim, `amount` é multiplicado por `rateAndPeriods` para obter o montante acumulado e retornado como um valor com duas casas decimais.

2. `annuityPayment(principal, interestRate, periods)`: Esta função calcula o valor do pagamento da anuidade com base no principal, taxa de juros e número de períodos. Ela recebe os seguintes parâmetros:
   - `principal`: O valor principal da anuidade.
   - `interestRate`: A taxa de juros anual.
   - `periods`: O número de períodos da anuidade.
   
   A função converte a taxa de juros para uma taxa decimal e, em seguida, calcula o valor presente da anuidade usando a fórmula financeira apropriada. O valor presente é retornado como um valor com duas casas decimais.

3. `amortizationSchedule(principal, interestRate, numYears)`: Esta função calcula uma tabela de amortização para um empréstimo com base no principal, taxa de juros e número de anos. Ela recebe os seguintes parâmetros:
   - `principal`: O valor principal do empréstimo.
   - `interestRate`: A taxa de juros anual.
   - `numYears`: O número de anos do empréstimo.
   
   A função inicializa um array vazio chamado `schedule` para armazenar os dados da tabela de amortização. Ela calcula a taxa de juros mensal, o número total de pagamentos e o valor mensal do pagamento usando as fórmulas financeiras apropriadas. Em seguida, inicializa variáveis para acompanhar o saldo restante, os pagamentos principais e os juros pagos.

   A função itera por cada período de pagamento e calcula o pagamento de juros, o pagamento principal e atualiza as variáveis apropriadas. Os

 valores são arredondados para duas casas decimais e adicionados ao `schedule` como um objeto com as propriedades `period`, `remainingBalance`, `interestPaid` e `principalPayment`. O `remainingBalance` é atualizado subtraindo o pagamento principal do saldo restante.

   Por fim, a função retorna o array `schedule` contendo a tabela de amortização com os valores para cada período de pagamento.

Essas funções podem ser utilizadas para realizar cálculos financeiros relacionados a juros compostos, pagamentos de anuidade e amortização de empréstimos.