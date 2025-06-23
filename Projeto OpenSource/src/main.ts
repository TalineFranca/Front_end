import './style.css'

interface Card {
  id: number;
  icone: string;
  cor: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  link: string;
}

const app = document.querySelector<HTMLDivElement>('#app')!;

async function carregarCards() {
    const response = await fetch('./cards.json');
    const cards: Card[] = await response.json();

    app.innerHTML = `
      <header class="header">
        <h1>Projetos de Código Aberto</h1>
      </header>
      <div class="pesquisa-container">
        <input type="text" class="pesquisa" placeholder="Buscar projetos">
      </div>
      <div id="cards-container" class="cards-container"></div>
    `;

    const cardsContainer = document.querySelector<HTMLDivElement>("#cards-container")!;

    cards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      cardDiv.innerHTML = `
        <div class="card-imagem-container" style="background-color: ${card.cor};">
          <img src="${card.icone}" alt="${card.titulo}" class="card-imagem">
        </div>
        <div class="card-conteudo">
          <h3 class="card-titulo">${card.titulo}</h3>
          <p class="card-texto">${card.descricao}</p>
          <div class="categorias-container">
            ${card.tecnologias.map(tecnologia => `<span class="categoria">${tecnologia}</span>`).join('')}
          </div>
          <a href="${card.link}" class="card-botao" target="_blank">Ver projeto</a>
        </div>
      `;

      cardsContainer.appendChild(cardDiv);
    });

        const footer = document.getElementById('footer')!;
    footer.innerHTML = `
      <div class="footer">
        <p>
          Código aberto (do inglês Open Source) é <a href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto" target="_blank">código-fonte</a>
          que é disponibilizado gratuitamente para consulta, examinação, modificação e redistribuição. Os produtos incluem permissão para usar o <a href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto" target="_blank">código-fonte</a>,
          documentos de design ou conteúdo do produto.
        </p>
        <p>
          Fonte: <a href="https://pt.wikipedia.org/wiki/C%C3%B3digo_aberto" class="fonte-link" target="_blank">https://pt.wikipedia.org/wiki/Código_aberto</a>
        </p>
        <p>
          Software livre é o <a href="https://pt.wikipedia.org/wiki/Software" target="_blank">software</a> que concede <a href="https://pt.wikipedia.org/wiki/Liberdade" target="_blank">liberdade</a> ao usuário para executar, acessar e modificar o <a href="https://pt.wikipedia.org/wiki/C%C3%B3digo_fonte" target="_blank">código fonte</a>.
          Sua definição é estabelecida pela <a href="https://pt.wikipedia.org/wiki/Free_Software_Foundation" target="_blank">Free Software Foundation</a> em conjunto com o projeto <a href="https://pt.wikipedia.org/wiki/GNU" target="_blank">GNU</a>.
        </p>
        <p>
          Fonte: <a href="https://pt.wikipedia.org/wiki/Software_livre" class="fonte-link" target="_blank">https://pt.wikipedia.org/wiki/Software_livre</a>
        </p>
        <div class="footer-logos">
          <a href="https://www.instagram.com/ifro.vilhena/" target="_blank">
            <img src="../public/images/ifro.png" alt="Instituto Federal">
          </a>
          <a href="https://www.instagram.com/fslab.vilhena/" target="_blank">
            <img src="../public/images/fslab.png" alt="FS Lab">
          </a>
        </div>
      </div>
    `;
}

carregarCards();