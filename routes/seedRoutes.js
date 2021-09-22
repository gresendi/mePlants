const router = require('express').Router()
const { Post, User, Plant } = require('../models')

// users seed data to create 'dummy' users
let users = [
  {
    username: "johnDoe",
    password: "123"
  },
  {
    username: "janeDoe",
    password: "123"
  },
  {
    username: "jackDoe",
    password: "123"
  },
  {
    username: "jackieDoe",
    password: "123"
  }
]

// posts seed data to create 'dummy' posts from users above (all imgs are original)
let posts = [
  {
    title: "Chinese Money Plant",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Fchinese-money-plant.jpg?alt=media&token=05c8b504-30fc-4879-880b-843fcd03fd56",
    body: "This is also known as the UFO plant! Popular lore says that a Norwegian missionary took cuttings from a plant in China and brought it home - so now the plants are spread throughout Scandinavia.",
    uid: 1
  },
  {
    title: "Fiddle Leaf Fig Plant",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Ffig-leaf-plant.jpg?alt=media&token=d0a3480f-f366-4474-b97e-915b6dc7c8c6",
    body: "Apparently this plant got it's name from the shape of their leaves! So cool!",
    uid: 1
  },
  {
    title: "Mini Tree?",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Fmini-tree-plant.jpg?alt=media&token=6fc6b743-e653-42d2-aebf-2c83409a3514",
    body: "I don't know what this is but it looks like a baby tree!",
    uid: 2
  },
  {
    title: "Pothos",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Fpothos-plant.jpg?alt=media&token=91520762-189f-4437-beb8-634fcdae6d13",
    body: "I love pothos plants - easy to take care of and very versatile. I also hear it's easy to propogate so can't wait to try!",
    uid: 3
  },
  {
    title: "Snake Plant",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Fsnake-plant-one.jpg?alt=media&token=0488cba2-f8fd-487e-baf8-b23ae0c86dd6",
    body: "I've heard the snake plant is one of few plants to release oxygen at night rather than in the day, and that the plant is drought tolerant. Only needs water every 2-3 weeks",
    uid: 4
  },
  {
    title: "ZZ Plant",
    photo: "https://firebasestorage.googleapis.com/v0/b/meplant-c89e1.appspot.com/o/seedImages%2Fzz-plant.jpg?alt=media&token=d9f56a3e-f877-4f75-b0c1-29fbc47c637d",
    body: "Makes for a great desk plant or floor plant. Putting one on",
    uid: 4
  }
]

// post route to seed users (for each user in users above register a new user)
router.post('/users/register', (req, res) => {
  users.forEach(user => {
    User.register(new User({ username: user.username }), user.password, err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})


// post route to seed posts (for each post in posts above create a post)
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

// export the module
module.exports = router