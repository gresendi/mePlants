const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

// passport.authenticate('jwt'), used to verify user logged in
router.get('/posts', (req, res) => {
  Post.findAll({ include: 'u' })
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => Post.create({
  title: req.body.title,
  photo: req.body.photo,
  body: req.body.body,

  uid: req.user.id
})
  .then(post => Post.findOne({ where: { id: post.id }, include: 'u' }))
  .then(post => res.json(post))
  .catch(err => console.log(err)))

router.delete('/posts/:id', (req, res) => Post.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
