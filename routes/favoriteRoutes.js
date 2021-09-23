const router = require('express').Router()
const { Post, User, Plant,Favorite } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')

router.post('/favorites', passport.authenticate('jwt'), (req, res) => {
  
  
  Favorite.create({
    pid: req.body.pid,

    uid: req.user.id
  })
  .then(favorite => res.json(favorite))
  .catch(err => console.log(err))
})

router.get('/favorites', passport.authenticate('jwt'), (req, res) => {


  let user = req.user
  console.log(user.dataValues.id)

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

router.delete('/favorites/:pid', (req, res) => Favorite.destroy({ where: { pid: req.params.pid } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))




router.get('/favorites/:pid', passport.authenticate('jwt'), (req, res) => {


  let post = req.params.pid 
  
  console.log((post))

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
// router.delete('/plants/:id', (req, res) => Plant.destroy({ where: { id: req.params.id } })
//   .then(() => res.sendStatus(200))
//   .catch(err => console.log(err)))



// router.put('/plants', (req, res) => {
//   console.log(req.body)
//   let intervals = req.body.intervals
//   console.log(intervals)
//   let id = parseInt(req.body.id)
//   let day = moment().add(intervals, 'days').format()
//   let today = moment().add(0, 'days').format()
//   console.log(day)
//   Plant.update({ nextWatering: day, lastWatered: today },
//     {
//       where:
//         { id: id }
//     })
//     .then(() => {
//       console.log('updated')

//       res.sendStatus(200)
//     })
// })

// router.put('/plants/:id', (req, res) => {
//   let id = parseInt(req.body.id)
//   let days = req.body.daysFrom
//   let next = moment().add(days, 'days').format()
//   Plant.update({ nextWatering: next },
//     {
//       where:
//       {
//         id: id
//       }
//     })
//     .then(() => {
//       res.sendStatus(200)
//     })

// })


module.exports = router