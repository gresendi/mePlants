const { bootstrap } = window

// event listener when login button is clicked
document.getElementById('login').addEventListener('click', event => {
  event.preventDefault()

  // assign variables (and send the username input to lower case to help prevent duplicates)
  let errorMessage = document.getElementById('errorMsg')
  let usernameInput = document.getElementById('username').value.toLowerCase()
  let passwordInput = document.getElementById('password').value

  // if the username input and/or the password input are blank/empty provide error message on html
  if (usernameInput === '' && passwordInput === '') {
    errorMessage.textContent = '⚠️ Please enter a username and password'
    errorMessage.style.color = 'red'
  } else if (usernameInput === '') {
    errorMessage.textContent = '⚠️ Please enter a username'
    errorMessage.style.color = 'red'
  } else if (passwordInput === '') {
    errorMessage.textContent = '⚠️ Please enter a password'
    errorMessage.style.color = 'red'
  }
  //  else axios post the user login and log the user in and set the token
  else {
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
