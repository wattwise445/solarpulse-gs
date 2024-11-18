// Elementos do DOM
const newMonthBtn = document.querySelector('.new-month button');
const modal = document.getElementById('newMonthModal');
const closeModal = document.querySelector('.close-modal');
const form = document.getElementById('newMonthForm');
const tableBody = document.querySelector('.table tbody');

// Constantes para o cálculo
const TARIFA_ENERGIA = 0.75; // Tarifa média por kWh
const CUSTO_DISPONIBILIDADE = 30; // Custo mínimo da conexão com a rede
const ILUMINACAO_PUBLICA = 8; // Taxa média de iluminação pública

// Função para criar objeto de dados do mês
function createMonthData(month, produced, used) {
  const economy = calculateEconomy(produced, used);
  const custoSemSolar = (used * TARIFA_ENERGIA) + CUSTO_DISPONIBILIDADE + ILUMINACAO_PUBLICA;
  const percentualEconomia = ((economy / custoSemSolar) * 100).toFixed(1);

  return {
    month,
    produced,
    used,
    economy,
    percentualEconomia,
    model: 'AH-3zx'
  };
}

// Dados iniciais
let monthsData = [

];

// Funções
function openModal() {
  modal.classList.add('active');
}

function closeModalHandler() {
  modal.classList.remove('active');
}

function calculateEconomy(produced, used) {
  // Energia injetada na rede (excedente)
  const energiaExcedente = Math.max(produced - used, 0);
  
  // Energia consumida da rede
  const energiaConsumida = Math.max(used - produced, 0);
  
  // Cálculo do crédito de energia
  const creditoEnergia = energiaExcedente * TARIFA_ENERGIA;
  
  // Cálculo do custo que seria pago sem energia solar
  const custoSemSolar = (used * TARIFA_ENERGIA) + CUSTO_DISPONIBILIDADE + ILUMINACAO_PUBLICA;
  
  // Cálculo do custo atual com energia solar
  const custoComSolar = Math.max(CUSTO_DISPONIBILIDADE, (energiaConsumida * TARIFA_ENERGIA)) + ILUMINACAO_PUBLICA;
  
  // Economia total
  const economiaTotal = custoSemSolar - custoComSolar;
  
  return economiaTotal.toFixed(2);
}

function updateTable() {
  tableBody.innerHTML = '';
  monthsData.forEach(data => {
    tableBody.innerHTML += `
      <tr>
        <td>${data.month}</td>
        <td>${data.produced} kWh</td>
        <td>${data.used} kWh</td>
        <td>R$ ${data.economy} (${data.percentualEconomia}%)</td>
        <td>${data.model}</td>
      </tr>
    `;
  });
}

function updateChart() {
  economyChart.data.labels = monthsData.map(data => data.month);
  economyChart.data.datasets[0].data = monthsData.map(data => data.economy);
  economyChart.update();
}

// Função para calcular dados do overview
function calculateOverviewData() {
  // Verifica se há dados
  if (monthsData.length === 0) {
    return {
      totalGerado: 0,
      capacidade: 0,
      produzidoMWh: 0,
      co2Salvo: 0,
      economiaHoje: 0,
      economiaMensal: 0
    };
  }

  // Total gerado (soma de toda produção)
  const totalGerado = monthsData.reduce((total, month) => total + month.produced, 0);
  
  // Capacidade (maior valor de produção)
  const capacidade = Math.max(...monthsData.map(month => month.produced)) || 0;
  
  // Produzido (convertendo kWh para mWh do último mês)
  const ultimoMes = monthsData[monthsData.length - 1];
  const produzidoMWh = ultimoMes ? (ultimoMes.produced / 1000).toFixed(1) : 0;
  
  // CO2 salvo (estimativa: 0.084 kg de CO2 por kWh)
  const co2Salvo = (totalGerado * 0.084 / 1000).toFixed(1);
  
  // Economia hoje (baseado na média diária do último mês)
  const economiaHoje = ultimoMes ? (ultimoMes.economy / 30).toFixed(2) : 0;
  
  // Economia mensal (último mês)
  const economiaMensal = ultimoMes ? ultimoMes.economy : 0;
  
  return {
    totalGerado,
    capacidade,
    produzidoMWh,
    co2Salvo,
    economiaHoje,
    economiaMensal
  };
}

// Função para atualizar o overview
function updateOverview() {
  const data = calculateOverviewData();
  
  // Atualizar Total Gerado
  document.querySelector('.total-gerado strong:first-of-type').textContent = `${data.totalGerado} kWh`;
  
  // Atualizar Capacidade
  document.querySelector('.data:nth-child(1) p strong').textContent = `${data.capacidade}`;
  
  // Atualizar Produzido
  document.querySelector('.data:nth-child(2) p strong').textContent = `${data.produzidoMWh}`;
  
  // Atualizar CO2 Salvo
  document.querySelector('.data:nth-child(3) p strong').textContent = `${data.co2Salvo}`;
  
  // Atualizar Economia Hoje
  document.querySelector('.economy-container .column:first-child strong').textContent = `R$ ${data.economiaHoje}`;
  
  // Atualizar Economia Mensal
  document.querySelector('.economy-container .column:last-child strong').textContent = `R$ ${data.economiaMensal}`;
}

function handleSubmit(e) {
  e.preventDefault();
  
  const month = document.getElementById('month').value;
  const produced = Number(document.getElementById('produced').value);
  const used = Number(document.getElementById('used').value);
  
  const newData = createMonthData(month, produced, used);
  
  monthsData.push(newData);
  updateTable();
  updateChart();
  updateOverview();
  closeModalHandler();
  form.reset();
}

// Event Listeners
newMonthBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
form.addEventListener('submit', handleSubmit);

// Fechar modal quando clicar fora
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModalHandler();
});

// Inicialização
updateTable();
updateChart();
updateOverview(); 