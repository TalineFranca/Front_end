import './style.css'

const menu = document.querySelector<HTMLUListElement>('.menu')!
const menuToggle = document.querySelector<HTMLDivElement>('.menu-toggle')!

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active')
  menuToggle.classList.toggle('active')
})