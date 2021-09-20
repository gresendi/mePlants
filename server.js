require('dotenv').config()

const express = require('express')
const {join} = require('path')
const passport = require('passport')
const {User,Post,Plant} = require('passport-jwt')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findOne({ where: { id }, include: [Post,Plant]})
  .then(user => cb(null, user))
  .catch(err => cb(err, null))))

app.use(require('./routes'))

require('./db')
  .sync() //delete this in order to restard the db, will delete content  { force: true }
  .then(() => app.listen(process.env.PORT || 3000))

