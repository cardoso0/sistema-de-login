const btn = document.querySelector('button')
const h1 = document.querySelector('h1')
const body = document.querySelector('body')

if (localStorage.getItem('token') === null){
  alert('Você precisa estar logado para acessar esta página!')
  window.location.href = './index.html'
}

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))
h1.textContent = `Olá ${usuarioLogado.nome}, você logou com sucesso!`

btn.addEventListener('click', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuarioLogado')
  window.location.href = './index.html'
})