import './style.css'

const quadradoImagem = document.querySelector<HTMLDivElement>('.foto-gerada')!
const imagem = quadradoImagem.querySelector<HTMLImageElement>('img')!
const selecao = document.querySelector<HTMLSelectElement>('#escolha')!
const botao = document.querySelector<HTMLInputElement>('#botao')!

let imagemApi = '';

const apiCat = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiDog = 'https://dog.ceo/api/breeds/image/random';

async function carregarApi(api: string) {
  const resultado = await fetch(api);
  const recebido = await resultado.json();

  if(api === apiCat) {
    imagemApi = recebido[0].url;
  } else {
    imagemApi = recebido.message;
  }

  console.log(imagemApi);
  return imagemApi;
}

async function obterFoto(api: string) {
  try{
    const url = await carregarApi(api);
    imagem.src = url;
  } catch (error) {
    console.log("Erro ao receber a imagem da api");
  }
}

botao.addEventListener('click', () => {
  const animalRecebido =  selecao.value;
  if(!animalRecebido) {
    alert('Selecione algo.')
    return;
  }
  const apiUrl = animalRecebido === 'Dog' ? apiDog : apiCat;
  obterFoto(apiUrl);
})

selecao.innerHTML = `
  <option value="" disabled selected>Selecione um animal:</option>
  <option value="Cat">Gato</option>
  <option value="Dog">Cachorro</option>
`