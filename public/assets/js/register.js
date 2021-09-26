const { bootstrap } = window

// event listener when register button is clicked
document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()

  // assign variables (and send the username input to lower case to help prevent duplciates)
  let errorMessage = document.getElementById('errorMsg')
  let usernameInput = document.getElementById('username').value.toLowerCase()
  let passwordInput = document.getElementById('password').value

  // console.log(usernameInput);

  // axios get usernames
  axios.get('/api/usernames')
    .then(({ data: usernames }) => {
      // map the database usernames to lower case to help prevent duplicates
      const usernamesLowerCase = usernames.map(username => username.toLowerCase())
      // if the (lowercase) desired user name exists in the database (lowercase) usernames then set error message to username already exists
      if (usernamesLowerCase.indexOf(usernameInput) !== -1) {
        // console.log('value exists');
        errorMessage.textContent = '⚠️ Username already exists, please choose another'
        errorMessage.style.color = 'red'
      } 
      // else if the username input and/or the password input is blank/empty set error message to notify user
      else {
        console.log('value does not exist');
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
        // else, the user name is valid post and register the user
        else {
          axios.post('/api/users/register', {
            username: usernameInput,
            password: passwordInput
          })
            // then notify user of success and redirect to login page
            .then(() => {
              errorMessage.textContent = '✅  Success! Redirecting to login...'
              errorMessage.style.color = 'green'
              errorMessage.style.fontWeight = 'bold'
              window.setTimeout(goToLogin, 1500)
            })
            .catch(err => console.error(err))
        }
      }
    })
    .catch(err => console.log(err))//
})

// function to go to login page
function goToLogin() {
  window.location = '/login.html'
}