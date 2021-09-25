const router = require('express').Router()
const { Post, User, Plant, Favorite, Comment } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')

router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  console.log(res.body)

  Comment.create({
    pid: req.body.pid, 
    username: req.body.username,
    comment: req.body.comment
  })
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})

// router.get('/comments', passport.authenticate('jwt'), (req, res) => {


//   let user = req.user
//   console.log(user.dataValues.id)

//   Comment.findAll({
//     where: {
//       pid: user.dataValues.id
//     }
//   })
//     .then(favorite => {
//       res.json(favorite)
//     })
//     .catch(err => console.log(err))

// })

// router.delete('/favorites/:pid', (req, res) => Favorite.destroy({ where: { pid: req.params.pid } })
//   .then(() => res.sendStatus(200))
//   .catch(err => console.log(err)))




router.get('/comments/:pid', (req, res) => {

 
  post = req.params.pid
 console.log(req.params)
  Comment.findAll({
    where: {
      pid: post
    }
  })
    .then(comments => {
     
      
      res.json(comments)
    })
    .catch(err => console.log(err))

})



module.exports = router