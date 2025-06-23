import './style.css';
import { UsuarioSchema } from './validators/usuarioSchema';

const formulario = document.querySelector<HTMLFormElement>("#form-cadastro")!;
const nome = document.querySelector<HTMLInputElement>("#nome")!;
const email = document.querySelector<HTMLInputElement>("#email")!;
const cursos = document.querySelector<HTMLSelectElement>("#cursos")!;
const buscarUsuariosBtn = document.querySelector<HTMLButtonElement>("#buscar-usuarios")!;
const listagemDiv = document.querySelector<HTMLDivElement>("#listagem-usuarios")!;

const api = 'http://localhost:3000/usuarios';

function toggleMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");
}

(window as any).toggleMode = toggleMode;

formulario.addEventListener("submit", async (form) => {
  form.preventDefault();

  const sexoSelecionado = document.querySelector<HTMLInputElement>('input[name=sexo]:checked')?.value;

  const dadosEnviados = {
    nome: nome.value,
    email: email.value,
    sexo: sexoSelecionado,
    curso: cursos.options[cursos.selectedIndex].text,
    observacoes: (document.querySelector<HTMLTextAreaElement>("#observacoes")?.value) || "",
  };

  const resultado = UsuarioSchema.safeParse(dadosEnviados);

  if (!resultado.success) {
    alert(resultado.error.errors.map(e => e.message).join('\n'));
    return;
  }

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosEnviados),
    });

    if (!res.ok) {
      throw new Error("Erro ao salvar usuário");
    }

    alert("Cadastrado efetuado com sucesso!");
    formulario.reset();
  } catch (err) {
    alert("Erro ao efetuar o cadastro! Tente novamente...");
    console.error(err);
  }
});

async function obterUsuarios() {
  try {
    const resposta = await fetch(api);
    if (!resposta.ok) {
      throw new Error('Erro ao listar usuários.');
    }
    return await resposta.json();
  } catch (err) {
    throw err;
  }
}

function listarDados(dados: any) {
  if (!dados || !Array.isArray(dados)) {
    listagemDiv.textContent = 'Nenhum usuário encontrado ou erro na requisição.';
    return;
  }
  listagemDiv.innerHTML = `
    <ul class="usuarios-lista">
      ${dados.map((usuario: any) => `
        <li class="usuario-item">
          <p><strong>Nome:</strong> ${usuario.nome}</p>
          <p><strong>Email:</strong> ${usuario.email}</p>
          <p><strong>Sexo:</strong> ${usuario.sexo}</p>
          <p><strong>Curso:</strong> ${usuario.curso}</p>
          ${usuario.observacoes ? `<p><strong>Observações:</strong> ${usuario.observacoes}</p>` : ''}
        </li>
      `).join('')}
    </ul>
  `;
}

buscarUsuariosBtn.addEventListener("click", () => {
  obterUsuarios()
    .then(listarDados)
    .catch(erro => {
      listagemDiv.textContent = `Erro: ${erro.message}`;
    });
});