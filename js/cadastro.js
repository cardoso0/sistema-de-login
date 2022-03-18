const nome = document.querySelector('#nome')
const labelNome = document.querySelector('#labelNome')
const usuario = document.querySelector('#usuario')
const labelUsuario = document.querySelector('#labelUsuario')
const senha = document.querySelector('#senha')
const labelSenha = document.querySelector('#labelSenha')
const confirmarSenha = document.querySelector('#confirmarSenha')
const labelConfirmarSenha = document.querySelector('#labelConfirmarSenha')
const verSenha = document.querySelector('#verSenha')
const verConfirmarSenha = document.querySelector('#verConfirmarSenha')
const msgSuccess = document.querySelector('#msgSuccess')
const msgError = document.querySelector('.msgError')
const msgErrorNome = document.querySelector('#msgErrorNome')
const msgErrorUser = document.querySelector('#msgErrorUser')
const msgErrorSenha = document.querySelector('#msgErrorSenha')
const msgErrorConfirmarSenha = document.querySelector('#msgErrorConfirmarSenha')
const btn = document.querySelector('#btn')
const form = document.querySelector('form')

const msgDeError = [msgErrorNome, msgErrorUser, msgErrorSenha, msgErrorConfirmarSenha]

let validNome = false
let validUser = false
let validSenha = false
let validConfSenha = false

/* Depois analizar o codigo e ver o que estava dando conflito com a valid.
Pois ela nao alterava o valor para true. */

function validarCampos (classe1, classe2, qtd, frase, frase2, valid) {
  if (classe1.value.length < qtd) {
    classe2.setAttribute('style', 'color: red')
    classe2.innerHTML = `${frase}`
    valid = false
  } else {
    classe2.setAttribute('style', 'color: green')
    classe2.innerHTML = `${frase2}`
    valid = true
  }
  if (classe1.value.length === 0) {
    classe2.setAttribute('style', 'color: #0d009c')
    classe2.innerHTML = `${frase2}`
  }
}
// nome.addEventListener('input', event => {
//   validarCampos(nome, labelNome, 2, 'Nome * Digite mais de 2 letras', 'Nome', validNome)
// })

nome.addEventListener('input', event => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = `Nome * Insira mais que 3 caracteres`
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = `Nome`
    validNome = true
  }
  if (nome.value.length === 0) {
    labelNome.setAttribute('style', 'color: #0d009c')
    labelNome.innerHTML = `Nome`
  }
})

usuario.addEventListener('input', event => {
  if (usuario.value.length <= 2) {
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = `Usuário * Digite mais de 3 letras`
    validUser = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = `Usuário`
    validUser = true
  }
  if (usuario.value.length === 0) {
    labelUsuario.setAttribute('style', 'color: #0d009c')
    labelUsuario.innerHTML = `Usuário`
  }
  // validarCampos(usuario, labelUsuario, 5, 'Usuário * Digite mais de 5 letras', 'Usuário', validUser)
})
senha.addEventListener('input', () => {
  if (senha.value.length <= 4) {
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = `Senha * Digite mais de 4 caracteres`
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = `Senha`
    validSenha = true
  }
  if (senha.value.length === 0) {
    labelSenha.setAttribute('style', 'color: #0d009c')
    labelSenha.innerHTML = `Senha`
  }
  // validarCampos(senha, labelSenha, 5, 'Senha * Digite mais de 4 caracteres', 'Senha', validSenha)
})

// senha.addEventListener('input', () => {
//   validarCampos(senha, labelSenha, 5, 'Senha * Digite mais de 4 caracteres', 'Senha', validSenha)
// })

confirmarSenha.addEventListener('input', () => {
  if (confirmarSenha.value !== senha.value) {
    labelConfirmarSenha.setAttribute('style', 'color: red')
    labelConfirmarSenha.innerHTML = `Confirmar Senha * A senha tem que ser igual a de cima!`
    validConfSenha = false
  } else {
    labelConfirmarSenha.setAttribute('style', 'color: green')
    labelConfirmarSenha.innerHTML = `Confirmar Senha`
    validConfSenha = true
  }
  if (confirmarSenha.value.length === 0) {
    labelConfirmarSenha.setAttribute('style', 'color: #0d009c')
    labelConfirmarSenha.innerHTML = `Confirmar Senha`
  }
})

const senhaVisivel = classe => {
  if (classe.getAttribute('type') === 'password') {
    classe.setAttribute('type', 'text')
  } else {
    classe.setAttribute('type', 'password')
  }
}

verSenha.addEventListener('click', () => {
  senhaVisivel(senha)
})
verConfirmarSenha.addEventListener('click', () => {
  senhaVisivel(confirmarSenha)
})

const msgDeErro = (valid, classe, x) => {
  if (!valid) {
    classe.setAttribute('style', 'display: block')
    classe.textContent = `Verifique o campo ${x}`
  } else {
    classe.setAttribute('style', 'display: none')
  }
}

const novoUsuario = () => {
  let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

  listaUsuario.push(
  {
    nomeCadastrado: nome.value,
    usuarioCadastrado: usuario.value,
    senhaCadastrada: senha.value
  }
  )
  localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario))
}

form.addEventListener('submit', event => {
  event.preventDefault()
  if (validNome && validUser && validSenha && validConfSenha) {
    novoUsuario()
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.textContent = 'Cadastrando Usuário...'
    msgDeError.forEach(item => item.setAttribute('style', 'display: none'))
    setTimeout(() => {
      window.location.href = './index.html'
    }, 1000);
    return
  }
  msgSuccess.setAttribute('style', 'display: none')
  msgDeErro(validNome, msgErrorNome, 'Nome')
  msgDeErro(validUser, msgErrorUser, 'Usuário')
  msgDeErro(validSenha, msgErrorSenha, 'Senha')
  msgDeErro(validConfSenha, msgErrorConfirmarSenha, 'Confirmar Senha')
})