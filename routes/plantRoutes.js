const router = require('express').Router()
const { Post, User, Plant } = require('../models')
const passport = require('passport')
const moment = require('moment')
const { update } = require('lodash')



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
  .then(plant => Plant.findOne({ where: { id: plant.id }, include: 'u' }))
  .then(plant => res.json(plant))
  .catch(err => console.log(err)))


router.get('/plants', passport.authenticate('jwt'), (req, res) =>{
  
  
  let user = req.user
  console.log(user.dataValues.id)
  
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

router.delete('/plants/:id', (req, res) => Plant.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

router.put('/plants',(req,res)=>{
  console.log(req.body)
  let intervals = req.body.intervals + 3
  console.log(intervals)
  let id = parseInt(req.body.id)
  let day = moment().add(intervals, 'days').format()
  console.log(day)
  Plant.update({ nextWatering:day },
  {where:
    {id:id}})
  .then(()=>{
    console.log('updated')
    res.sendStatus(200)
  })
 
   
})
 
 



router.get('/users/plants', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router