const router = require('express').Router()
const { Post, User, Plant, Comment } = require('../models')

// users seed data to create 'dummy' users






let users = [
  {
    username: "Emerald",
    password: "123"
  },
  {
    username: "Penny",
    password: "123"
  },
  {
    username: "Mr. Prickles",
    password: "123"
  },
  {
    username: "Morgan Treeman",
    password: "123"
  },
  {
    username: "Orlando Bloom",
    password: "123"
  },
  {
    username: "Vincent Van Grow",
    password: "123"
  },
  {
    username: "Tree Diddy",
    password: "123"
  },
  {
    username: "Lil Plant",
    password: "123"
  }

]

let userComments = [
  {
    comment: "I love this plant!" 
  },
  {
    comment: "Amazing!!"
  },
  {
    comment: "I want one of those"
  },
  {
    comment: "Where did you get it?"
  },
  {
    comment: "That color is to die for."
  },
  {
    comment: "So vibrant"
  },
  {
    comment: "Inspired!!"
  },
  {
    comment: "Need some little ones like this these"
  },
  {
    comment: "Wow!😍 so beautiful!!"
  },
  {
    comment: "❤️❤️"
  },
  {
    comment: "They’re so beautiful😍"
  },
  {
    comment: "Goals 🙌💚"
  },
  {
    comment: "Please share how to propagate these plants too!"
  },
  {
    comment: "Please share how to propagate these plants too!"
  },
  {
    comment: "Please share how to propagate these plants too!"
  },
  {
    comment: "❤️❤️"
  },
  {
    comment: "It’s lovely! "
  },
 
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
  },
  {
    title: "Philodendron scandens",
    photo: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1064&q=80",
    body: "Philodendron scandens brazil in a white hanging pot",
    uid: 5
  },
  {
    title: "Alocasia Black Velvet",
    photo: "https://images.unsplash.com/photo-1632320212567-5b1cbd478154?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1064&q=80",
    body: "",
    uid: 5
  },
  {
    title: "Aglaonema Cocomelon",
    photo: "https://images.unsplash.com/photo-1631694109908-79d700217271?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1064&q=80",
    body: "Check out my Agaonema Cocomelon",
    uid: 6
  },
  {
    title: "Succulent",
    photo: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
    body: "This is my pride and joy",
    uid: 6
  },
  {
    title: "Yucca tree ",
    photo: "https://images.unsplash.com/photo-1585738876562-7d008f53022a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=780&q=80",
    body: "Full of life",
    uid: 7
  },
  {
    title: "Penelope and Glenn",
    photo: "https://images.unsplash.com/photo-1591340120182-1dc91d56ea9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
    body: "In the suns glory",
    uid: 8
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
  let index = 0
  posts.forEach(post => {
    index++
    Post.create({
     
      title: post.title,
      photo: post.photo,
      body: post.body,
      uid: post.uid
    })
      .then(() => res.sendStatus(200))
  })
})

router.post('/comments', (req, res) => {
  

  // userComments
  userComments.forEach(comment=>{
    let randomUser= Math.floor(Math.random()*8 +1)
    let randomPost= Math.floor(Math.random()*12 +1)
    console.log(randomUser)
    console.log(comment.comment)
    Comment.create({
      comment: comment.comment,
      pid: randomPost,
      username: users[randomUser].username
    })
      .then(() => res.sendStatus(200))
      


  })
  

  
  
})





// export the module
module.exports = router