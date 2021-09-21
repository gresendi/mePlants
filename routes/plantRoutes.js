const router = require('express').Router()
const { Post, User, Plant } = require('../models')
const passport = require('passport')
const { update } = require('lodash')



router.post('/plants', passport.authenticate('jwt'), (req, res) => Plant.create({
 

  officialName: req.body.officialName,
  nickName: req.body.nickName,
  photo: req.body.photo,
  care: req.body.care,
  lastWatered: req.body.lastWatered,
  nextWatering: req.body.nextWatering,

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
  

router.get('/users/plants', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router