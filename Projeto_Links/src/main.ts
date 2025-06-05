import './style.css'

// http://localhost:5173?id=123

const params = new URLSearchParams (window.location.search)
const id = params.get ("id")

const app = document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `<h1>Olá, usuário ${id}!`

// fazer um linktree
//usar json e capturar o id fazer um linktrre
//não é bota é link 
//o primeiro e pra mostrar como é p hover
//quando mostrar id=2 vai mostrar aquele, todos os dados precisam vir da  api
