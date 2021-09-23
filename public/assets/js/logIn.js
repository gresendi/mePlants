const { bootstrap } = window

document.getElementById('login').addEventListener('click', event => {
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
    axios.post('/api/users/login', {
      username: usernameInput,
      password: passwordInput
    })
      .then(({ data: token }) => {
        if (token) {
          localStorage.setItem('token', token)
          window.location = '/'
        } else {
          errorMessage.textContent = '⚠️ Invalid username or password'
          errorMessage.style.color = 'red'
        }
      })
      .catch(err => console.error(err))
  }
})
