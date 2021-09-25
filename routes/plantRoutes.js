const router = require('express').Router()
const { Post, User, Plant } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')

// router post plants (create plants)
router.post('/plants', passport.authenticate('jwt'), (req, res) => Plant.create({
  officialName: req.body.officialName,
  nickName: req.body.nickName,
  photo: req.body.photo,
  care: req.body.care,
  lastWatered: req.body.lastWatered,
  nextWatering: req.body.nextWatering,
  intervals: req.body.intervals,
  uid: req.user.id
})
  // find plant where the plant id matches id and include user
  .then(plant => Plant.findOne({ where: { id: plant.id }, include: 'u' }))
  .then(plant => res.json(plant))
  .catch(err => console.log(err)))

// router get plants
router.get('/plants', passport.authenticate('jwt'), (req, res) =>{
  // assign user to the request user
  let user = req.user
  // console.log(user.dataValues.id)
  
  // find all Plant where the user id matches the request id
  Plant.findAll({
    where: {
      uid: user.dataValues.id
    }
  })
    .then(plants => {
      res.json(plants)
    })
    .catch(err => console.log(err))
})

// router delete plant by id - destroy/delete plant where the id matches the request id
router.delete('/plants/:id', (req, res) => Plant.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// router put (udpate) plants
router.put('/plants',(req,res)=>{
  // console.log(req.body)
  // assign intervals to the request body intervals
  let intervals = req.body.intervals  
  // console.log(intervals)

  // assign id to the parsed integer request body id
  let id = parseInt(req.body.id)

  // assign day to moment to add the interval days
  let day = moment().add(intervals, 'days').format()

  // assign today as the moment of current day
  let today = moment().add(0, 'days').format()
  // console.log(day)

  // update Plant next watering and last watered from variables above where the id matches request id
  Plant.update({ nextWatering:day, lastWatered: today },
  { where: {id:id}})
  .then(()=>{
    // console.log('updated')
    res.sendStatus(200)
  })
  .catch(err => console.log(err)) 
})

// router put (update) plant by id
router.put('/plants/:id',(req,res) =>{

  // assign variables for id, days and next (day)
  let id = parseInt(req.body.id)
  let days= req.body.daysFrom
  let next = moment().add(days,'days').format()

  // update Plant next watering where id matches request id
  Plant.update({nextWatering:next},
    { where: {id:id}})
    .then(()=>{
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
})

// router to get all users plants
router.get('/users/plants', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// export module
module.exports = router