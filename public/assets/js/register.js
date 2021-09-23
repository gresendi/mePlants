const { bootstrap } = window

document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/users/register', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(() => alert('User registered! Log in.'))
    .catch(err => console.error(err))
})


function errorMsg() {
  let errorMessage = document.getElementById('errorMsg')
  let usernameInput = document.getElementById('username')
  let passwordInput = document.getElementById('password')

  if (usernameInput === '' && passwordInput === '') {
    errorMessage.textContent = 'Please enter a username and password'
  }
}