const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// router post to register new users
router.post('/users/register', (req, res) => {

  // assign registration status to empty
  let regStatus = {
    username: '',
    password: ''
  }

  // assign the username and password to the request body and send the username to lower case (check for duplicates)
  const { username, password } = req.body
  const usernameLowerCase = username.toLowerCase()

  // check if username or password length is less than 1 (blank) then set the registration status to the below (invalid) if blank. Error check on front end as well
  username.length < 1 && (regStatus.username = 'Enter a username')
  password.length < 1 && (regStatus.password = 'Enter a password')

  // assign existing registered users (already registered) as empty array
  let regUsers = {
    username: [],
  }

  // find all users and for each user push to registered users array (regUsers)
  User.findAll({})
    .then(users => {
      users.forEach(user => {
        regUsers.username.push(user.username)
      })
    })
    .catch(err => console.log(error))

  // if there was invalid username or password (empty) then send message unable to register
  if (regStatus.username) {
    res.json({
      status: regStatus,
      message: 'Unable to register due to empty fields'
    })
  }
  // else, register the new user by passing through the lowercase of the username and providing the request body password
  else {
    User.register(new User({ username: usernameLowerCase }), req.body.password, err => {
      // if there is an error and the username already exists (in the existing registered users) then send unsuccessful registration to avoid duplicate usernames (not case sensitive)
      if (err) {
        regUsers.username.indexOf(username) !== -1 && (regStatus.username = 'User name is already exists')
        console.log('username already exists');
        res.json({
          status: regStatus,
          message: 'Registration Unsuccessful. Username already exists.',
          err
        })
        return
      }
      // else send OK status that user was registered
      else {
        res.sendStatus(200)
      }
    })
  }
})

// router post users login
router.post('/users/login', (req, res) => {
  // authenticate user
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

// router to get all user posts (authenticated)
router.get('/users/posts', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// router to get all usernames
router.get('/usernames', (req, res) => {

  // find all users
  User.findAll({})
    .then(users => {

      // assign usernames to an empty array, and for each user push the username to the array
      let usernames = []
      users.forEach(user => {
        usernames.push(user.username)
      })
      res.json(usernames)
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router
