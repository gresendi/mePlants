const router = require('express').Router()
const { Post, User, Plant } = require('../models')


let users = [
  {
    username: "johnDoe1",
    password: "1"
  },
  {
    username: "johnDoe2",
    password: "1"
  }
]

let posts = [
  {
    title: "Plant post",
    photo: "url",
    body: "test post",
    uid: 1
  },
  {
    title: "Plant post 2",
    photo: "url",
    body: "test post",
    uid: 2
  }

]
let plants = [
  {
    officialName: "NA",
    nickName: "My Plant",
    photo: "url",
    care: "Love it",
    lastWatered: Date.now(),
    nextWatering: Date.now(),
    intervals: 4,

    uid: 2
  }
]





router.post('/users/register', (req, res) => {


  users.forEach(user => {


    User.register(new User({ username: user.username }), user.password, err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })


  })


})



router.post('/posts', (req, res) => {


  posts.forEach(post => {

    Post.create({
      title: post.title,
      photo: post.photo,
      body: post.body,

      uid: post.uid


    })
      .then(() => res.sendStatus(200))



  })


})


// router.post('/plants', (req, res) => Plant.create({
//   officialName: req.body.officialName,
//   nickName: req.body.nickName,
//   photo: req.body.photo,
//   care: req.body.care,
//   lastWatered: req.body.lastWatered,
//   nextWatering: req.body.nextWatering,
//   intervals: req.body.intervals,

//   uid: req.body.uid
// })
//   .then(plant => Plant.findOne({ where: { id: plant.id }, include: 'u' }))
//   .then(plant => res.json(plant))
//   .catch(err => console.log(err)))

















module.exports = router