const router = require('express').Router()
const { Post, User, Plant,Favorite } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')

// router post (create) favorites
router.post('/favorites', passport.authenticate('jwt'), (req, res) => {
  
  // create Favorite from request body
  Favorite.create({
    pid: req.body.pid,
    uid: req.user.id
  })
  // then send the response and catch error
  .then(favorite => res.json(favorite))
  .catch(err => console.log(err))
})

// router get all favorites
router.get('/favorites', passport.authenticate('jwt'), (req, res) => {

  // assign user to the request user
  let user = req.user
  // console.log(user.dataValues.id)

  // find all favorite where the user id matches the request id
  Favorite.findAll({
    where: {
      uid: user.dataValues.id
    }
  })
    .then(favorite => {
      res.json(favorite)
    })
    .catch(err => console.log(err))

})

// router delete favorite based on post id (delete/destory where the post id matches the request post id)
router.delete('/favorites/:pid', (req, res) => Favorite.destroy({ where: { pid: req.params.pid } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// router get favorite based on post id
router.get('/favorites/:pid', passport.authenticate('jwt'), (req, res) => {

  // assign post to the request post id
  let post = req.params.pid 
  // console.log((post))

  // Find all favorite where the post id matches the request post id
  Favorite.findAll({
    where: {
      pid: req.params.pid
    }
  })
    .then(likes => {
      res.json(likes)
    })
    .catch(err => console.log(err))
})

// export router
module.exports = router