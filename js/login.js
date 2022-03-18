const usuario = document.querySelector('#usuario')
const userLabel = document.querySelector('#userLabel')
const senha = document.querySelector('#senha')
const senhaLabel = document.querySelector('#senhaLabel')
const senhaVisivel = document.querySelector('i')
const msgError = document.querySelector('#msgError')
const btn = document.querySelector('button')
const form = document.querySelector('form')

const verificaCadastro = () => {
  const listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'))
  let usuarioValido = {}

  listaUsuario.forEach(item => {
    if (usuario.value === item.usuarioCadastrado && senha.value === item.senhaCadastrada) {
      usuarioValido = {
        nome: item.nomeCadastrado,
        usuario: item.usuarioCadastrado,
        senha: item.senhaCadastrada
      }
      return
    }
  })

  if (usuario.value === usuarioValido.usuario && senha.value === usuarioValido.senha) {
    window.location.href = './logado.html'

    let token = Math.random().toString(16).substring(2)
    localStorage.setItem('token', token)
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido))
    return
  }

  msgError.setAttribute('style', 'display: block')
  msgError.textContent = 'Usuário ou senha incorretos.'
  usuario.focus()
}

senhaVisivel.addEventListener('click', () => {
  if (senha.getAttribute('type') === 'password') {
    senha.setAttribute('type', 'text')
  } else {
    senha.setAttribute('type', 'password')
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()
  verificaCadastro()
})

usuario.addEventListener('input', () => {
  msgError.setAttribute('style', 'display: none')
})
senha.addEventListener('input', () => {
  msgError.setAttribute('style', 'display: none')
})