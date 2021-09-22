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
    title: "Cacti",
    photo: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-potted-cactus-royalty-free-image-771499429-1553270484.jpg?crop=1xw:1xh;center,top&resize=980:*",
    body: "These plants thrive in natural light. They only have to be watered once a week during the spring and summer and every three weeks during the fall and winter. ",
    uid: 1
  },
  {
    title: "English Ivy",
    photo: "https://hips.hearstapps.com/hbu.h-cdn.co/assets/17/27/1499281854-english-ivy.jpg?crop=1.0xw:1xh;center,top&resize=980:*",
    body: "Four hours of direct light (and indirect sun during the rest of the day) and steady moisture are key to keeping your ivy happy.",
    uid: 2
  }

]


// let plants = [
//   {
//     officialName: "NA",
//     nickName: "My Plant",
//     photo: "url",
//     care: "Love it",
//     lastWatered: Date.now(),
//     nextWatering: Date.now(),
//     intervals: 4,

//     uid: 2
//   }
// ]





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