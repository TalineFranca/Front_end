import './style.css';

const cep = document.querySelector<HTMLInputElement>("#cep")!;
const logradouro = document.querySelector<HTMLInputElement>("#logradouro")!;
const numero = document.querySelector<HTMLInputElement>("#numero")!;
const bairro = document.querySelector<HTMLInputElement>("#bairro")!;
const cidade = document.querySelector<HTMLSelectElement>("#cidade")!;
const estado = document.querySelector<HTMLSelectElement>("#estado")!;
const form = document.querySelector<HTMLFormElement>("form")!;

function limparEndereco() {
  cep.value = '';
  logradouro.value = '';
  numero.value = '';
  bairro.value = '';
  cidade.innerHTML = '<option value="" disabled selected>Selecione uma Cidade</option>';
  estado.value = '';
}

async function obterEstados() {
  const res = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
  return await res.json();
}

async function preencherEstados() {
  const lista = await obterEstados();
  estado.innerHTML = '<option value="" disabled selected>Selecione um Estado</option>';
  lista.forEach((e: { sigla: string, nome: string }) => {
    const option = document.createElement("option");
    option.value = e.sigla;
    option.textContent = e.nome;
    estado.appendChild(option);
  });
}

async function obterCidades(uf: string) {
  const res = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=gov`);
  return await res.json();
}

async function preencherCidades(uf: string, cidadeSelecionada?: string) {
  const lista = await obterCidades(uf);
  cidade.innerHTML = '<option value="" disabled selected>Selecione uma Cidade</option>';
  lista.forEach((c: { nome: string }) => {
    const option = document.createElement("option");
    option.value = c.nome;
    option.textContent = c.nome;
    cidade.appendChild(option);
  });

  if (cidadeSelecionada) {
    const optionEncontrada = Array.from(cidade.options).find(opt => opt.value === cidadeSelecionada);
    if (optionEncontrada) cidade.value = cidadeSelecionada;
  }
}

estado.addEventListener("change", async () => {
  const uf = estado.value;
  if (uf) await preencherCidades(uf);
});

cep.addEventListener("blur", () => {
  consultarCep();
});

async function consultarCep() {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`);
    if (!res.ok) throw new Error("CEP inválido");
    const data = await res.json();

    logradouro.value = data.street;
    bairro.value = data.neighborhood;

    estado.value = data.state;
    await preencherCidades(data.state, data.city);

    numero.focus();
  } catch {
    limparEndereco();
    cep.focus();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  limparEndereco();
});

window.addEventListener("DOMContentLoaded", () => {
  preencherEstados();
  limparEndereco();
});