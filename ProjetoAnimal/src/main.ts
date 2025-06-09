import './style.css';

const visualizacao = document.querySelector<HTMLDivElement>('.visualizacao')!;
const imagem = visualizacao.querySelector<HTMLImageElement>('img')!;
const selecao = document.querySelector<HTMLSelectElement>('#opcao')!;
const botao = document.querySelector<HTMLInputElement>('#botao')!;

let imagemApi = '';

const apiCat = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiDog = 'https://dog.ceo/api/breeds/image/random';

async function carregarApi(api: string): Promise<string> {
  try {
    const resultado = await fetch(api);
    if (!resultado.ok) throw new Error('Falha na requisição da API');
    const recebido = await resultado.json();

    if (api === apiCat) {
      imagemApi = recebido[0].url;
    } else {
      imagemApi = recebido.message;
    }

    console.log('URL da imagem:', imagemApi);
    return imagemApi;
  } catch (error) {
    console.error('Erro ao carregar a API:', error);
    throw error;
  }
}

async function obterFoto(api: string) {
  try {
    const url = await carregarApi(api);
    imagem.src = url;
    imagem.alt = `Imagem de ${selecao.value === 'Cat' ? 'Gato' : 'Cachorro'}`;
  } catch (error) {
    console.error('Erro ao obter a foto:', error);
    alert('Não foi possível carregar a imagem. Tente novamente.');
    imagem.src = '';
  }
}

botao.addEventListener('click', () => {
  const animalSelecionado = selecao.value;
  if (!animalSelecionado) {
    alert('Por favor, selecione um animal.');
    return;
  }
  const apiUrl = animalSelecionado === 'Dog' ? apiDog : apiCat;
  obterFoto(apiUrl);
});

selecao.innerHTML = `
  <option value="" disabled selected></option>
  <option value="Cat">Gato</option>
  <option value="Dog">Cachorro</option>
`;