let vacinas = [];

function abrirFormulario() {
  const form = document.getElementById('formulario');
  form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
}

async function adicionarVacina() {
  const nome = document.getElementById('nomeVacina').value;
  const data = document.getElementById('dataVacina').value;
  const userId = localStorage.getItem('userId');

  if (nome && data && userId) {
    const novaVacina = {
      userId: userId,
      type: "vacina",
      name: nome,
      date: data
    };

    try {
      const response = await fetch('https://6874093fdd06792b9c930670.mockapi.io/vacinapp/registros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaVacina)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar a vacina no MockAPI');
      }

      const resultado = await response.json();

      // Adiciona localmente com ID
      vacinas.push({ id: resultado.id, nome, data });
      atualizarLista();
      limparFormulario();
      renderizarCalendario();
    } catch (error) {
      alert("Erro ao salvar vacina: " + error.message);
    }
  } else {
    alert("Preencha todos os campos e verifique se o usuário está logado.");
  }
}

async function editarVacina(index) {
  const vacina = vacinas[index];
  const novoNome = prompt("Editar nome:", vacina.nome);
  const novaData = prompt("Editar data:", vacina.data);

  if (novoNome && novaData) {
    try {
      const response = await fetch(`https://6874093fdd06792b9c930670.mockapi.io/vacinapp/registros/${vacina.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: novoNome,
          date: novaData
        })
      });

      if (!response.ok) throw new Error('Erro ao atualizar a vacina');

      vacinas[index].nome = novoNome;
      vacinas[index].data = novaData;
      atualizarLista();
      renderizarCalendario();
    } catch (erro) {
      alert("Erro ao editar vacina: " + erro.message);
    }
  }
}

async function excluirVacina(index) {
  const vacina = vacinas[index];

  if (confirm("Tem certeza que deseja excluir esta vacina?")) {
    try {
      const response = await fetch(`https://6874093fdd06792b9c930670.mockapi.io/vacinapp/registros/${vacina.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao excluir vacina');

      vacinas.splice(index, 1);
      atualizarLista();
      renderizarCalendario();
    } catch (erro) {
      alert("Erro ao excluir vacina: " + erro.message);
    }
  }
}

function atualizarLista() {
  const lista = document.getElementById('listaVacinas');
  lista.innerHTML = "";

  vacinas.forEach((vacina, index) => {
    const item = document.createElement('li');

    item.innerHTML = `
      <span>${vacina.nome}</span>
      <span>${formatarData(vacina.data)}</span>
      <span class="acoes">
        <img src="/img/lapis.png" alt="Editar" onclick="editarVacina(${index})">
        <img src="/img/lixeira.png" alt="Excluir" onclick="excluirVacina(${index})">
      </span>
    `;

    lista.appendChild(item);
  });
}

function limparFormulario() {
  document.getElementById('nomeVacina').value = '';
  document.getElementById('dataVacina').value = '';
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

let dataAtual = new Date();

function renderizarCalendario() {
  const diasCalendario = document.getElementById('diasCalendario');
  const mesAno = document.getElementById('mesAnoAtual');

  diasCalendario.innerHTML = "";

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  mesAno.innerText = `${nomeMeses[mes]} ${ano}`;

  for (let i = 0; i < primeiroDia; i++) {
    diasCalendario.innerHTML += `<div></div>`;
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const temVacina = vacinas.some(v => v.data === dataFormatada);

    diasCalendario.innerHTML += `<div class="${temVacina ? 'com-vacina' : ''}">${dia}</div>`;
  }
}

function mudarMes(delta) {
  dataAtual.setMonth(dataAtual.getMonth() + delta);
  renderizarCalendario();
}

async function carregarVacinas() {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  try {
    const resposta = await fetch(`https://6874093fdd06792b9c930670.mockapi.io/vacinapp/registros?userId=${userId}&type=vacina`);
    const dados = await resposta.json();

    vacinas = dados.map(v => ({
      id: v.id,
      nome: v.name,
      data: v.date
    }));

    atualizarLista();
    renderizarCalendario();
  } catch (erro) {
    console.error("Erro ao carregar vacinas:", erro);
  }
}

window.onload = () => {
  carregarVacinas();
};
