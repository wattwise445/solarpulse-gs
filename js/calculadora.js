document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#calculadora form');
  const modal = document.getElementById('resultModal');
  const closeBtn = document.querySelector('.close');
  const contatoBtn = document.getElementById('contatoBtn');
  
  // Objeto com as tarifas médias por distribuidora
  const tarifas = {
    'state1': { // São Paulo
      'distribuidora1': 0.95, // Enel
      'distribuidora2': 0.98, // Light
      'distribuidora3': 0.93  // Cemig
    },
    'state2': { // Minas Gerais
      'distribuidora1': 0.95, // Enel
      'distribuidora2': 0.98, // Light
      'distribuidora3': 0.93  // Cemig
    },
    'state3': { // Rio de Janeiro
      'distribuidora1': 0.95, // Enel
      'distribuidora2': 0.98, // Light
      'distribuidora3': 0.93  // Cemig
    }
  };

  // Atualiza as distribuidoras com base no estado selecionado
  document.getElementById('state').addEventListener('change', function(e) {
    const estado = e.target.value;
    const distribuidoraSelect = document.getElementById('distribuidora');
    
    // Reset do select de distribuidora
    distribuidoraSelect.innerHTML = `
      <option class="first-opt" value="" disabled>Selecione a distribuidora</option>
      <option value="distribuidora1">Enel</option>
      <option value="distribuidora2">Light</option>
      <option value="distribuidora3">Cemig</option>
    `;
  });

  // Função para calcular a economia
  function calcularEconomia(valorConta) {
    // Uma conta de energia solar típica mantém apenas cerca de 5-10% do valor original
    const novaConta = valorConta * 0.05; // 5% do valor original (95% de redução)
    const economiaMensal = valorConta - novaConta;
    const economiaAnual = economiaMensal * 12;
    
    return {
        novaConta: novaConta.toFixed(2),
        economiaMensal: economiaMensal.toFixed(2),
        economiaAnual: economiaAnual.toFixed(2),
        reducao: 95
    };
  }

  // Handler do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const estado = document.getElementById('state').value;
    const distribuidora = document.getElementById('distribuidora').value;
    const mediaMensal = parseFloat(document.getElementById('media-mensal').value);
    
    if (!estado || !distribuidora || !mediaMensal) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const resultado = calcularEconomia(mediaMensal);

    // Atualiza o modal com os resultados
    document.getElementById('valorAtual').textContent = `R$ ${mediaMensal.toFixed(2)}`;
    document.getElementById('gastoAnual').textContent = `R$ ${(mediaMensal * 12).toFixed(2)}`;
    document.getElementById('economiaMensal').textContent = `R$ ${resultado.novaConta}`;
    document.getElementById('economiaAnualValor').textContent = `R$ ${resultado.economiaAnual}`;
    document.getElementById('economiaAnualTotal').textContent = `R$ ${resultado.economiaAnual}`;
    document.getElementById('reducaoEstimada').textContent = `${resultado.reducao}%`;

    modal.style.display = 'block';
  });

  // Fecha o modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // Botão de contato
  contatoBtn.onclick = function() {
    alert('Entre em contato conosco pelo telefone 0800 XXX XXXX');
  }
}); 