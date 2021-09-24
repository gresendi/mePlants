const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {

  let regStatus = {
    username: '',
    password: ''
  }

  const { username, password } = req.body
  const usernameLowerCase = username.toLowerCase()

  username.length < 1 && (regStatus.username = 'Enter a username')
  password.length < 1 && (regStatus.password = 'Enter a password')

  let regUsers = {
    username: [],
  }

  User.findAll({})
    .then(users => {
      users.forEach(user => {
        regUsers.username.push(user.username)
      })
    })
    .catch(err => console.log(error))


  if (regStatus.username) {
    res.json({
      status: regStatus,
      message: 'Unable to register due to empty fields'
    })
  } else {
    User.register(new User({ username: usernameLowerCase }), req.body.password, err => {
      if (err) {
        regUsers.username.indexOf(username) !== -1 && (regStatus.username = 'User name is already exists')
        console.log('username in use already');
        res.json({
          status: regStatus,
          message: 'Registration Unsuccessful. Username already exists.',
          err
        })
        return
      } else {
        res.sendStatus(200)
      }
    })
  }
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => res.json(req.user))

router.get('/usernames', (req, res) => {
  User.findAll({})
    .then(users => {
      let usernames = []
      users.forEach(user => {
        usernames.push(user.username)
      })
      res.json(usernames)
    })
    .catch(err => console.log(err))
})

module.exports = router
