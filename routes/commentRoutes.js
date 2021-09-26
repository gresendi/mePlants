const router = require('express').Router()
const { Post, User, Plant, Favorite, Comment } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')

// router to post comments
router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  // console.log(res.body)

  // create comment
  Comment.create({
    pid: req.body.pid, 
    username: req.body.username,
    comment: req.body.comment
  })
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})

// router get comments (based on post id)
router.get('/comments/:pid', (req, res) => {

  post = req.params.pid
  // console.log(req.params)
  // find all comment where the post id matches the request id (post id)
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

// export router
module.exports = router