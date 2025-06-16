import './style.css';
import { UsuarioSchema } from './validators/usuarioSchema';

const formulario = document.querySelector<HTMLFormElement>("#form-cadastro")!;
const nome = document.querySelector<HTMLInputElement>("#nome")!;
const email = document.querySelector<HTMLInputElement>("#email")!;
const cursos = document.querySelector<HTMLSelectElement>("#cursos")!;

// Script para dark mode da página
function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("dark");
}

(window as any).toggleMode = toggleMode;

// Evento para post do cadastro no json server
formulario.addEventListener("submit", async(form) => {
  form.preventDefault();

  // Obter dados
  const sexoSelecionado = (document.querySelector<HTMLInputElement>('input[name=sexo]:checked')?.value);

  const dadosEnviados = {
    nome: nome.value,
    email: email.value,
    sexo: sexoSelecionado,
    curso: cursos.options[cursos.selectedIndex].text,
    observacoes: (document.querySelector<HTMLTextAreaElement>("#observacoes")?.value) || "",
  };

  const resultado = UsuarioSchema.safeParse(dadosEnviados);

  if(!resultado.success) {
    alert(resultado.error.errors.map(e => e.message).join('\n'));
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/usuarios" , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosEnviados),
    });

    if(!res.ok) {
      throw new Error("Erro ao salvar usuário");
    }

    alert("Cadastrado efetuado com sucesso!");
    formulario.reset();
  } catch (err) {
    alert("Erro ao efetuar o cadastro! Tente novamente...");
    console.error(err);
  }
})



