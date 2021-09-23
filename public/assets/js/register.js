const { bootstrap } = window

document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()

  let errorMessage = document.getElementById('errorMsg')
  let usernameInput = document.getElementById('username').value
  let passwordInput = document.getElementById('password').value

  if (usernameInput === '' && passwordInput === '') {
    errorMessage.textContent = '⚠️ Please enter a username and password'
    errorMessage.style.color = 'red'
  } else if (usernameInput === '') {
    errorMessage.textContent = '⚠️ Please enter a username'
    errorMessage.style.color = 'red'
  } else if (passwordInput === '') {
    errorMessage.textContent = '⚠️ Please enter a password'
    errorMessage.style.color = 'red'
  } else {
    axios.post('/api/users/register', {
      username: usernameInput,
      password: passwordInput
    })
      // .then(() => alert('User registered! Log in.'))
      .then(() => {
        errorMessage.textContent = '✅  Success! Redirecting to login...'
        errorMessage.style.color = 'green'
        errorMessage.style.fontWeight = 'bold'
        window.setTimeout(goToLogin, 1500)
      })
      .catch(err => console.error(err))
  }
})

function goToLogin() {
  window.location = '/login.html'
}