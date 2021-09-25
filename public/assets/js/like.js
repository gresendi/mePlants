const { axios } = window

// // import initalizeApp from firebase app (version 9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

// // import storage from firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFybI9MuCuAGqTQTqKQ7qWu7Ae_tWBdR4",
  authDomain: "meplant-c89e1.firebaseapp.com",
  projectId: "meplant-c89e1",
  storageBucket: "meplant-c89e1.appspot.com",
  messagingSenderId: "198818193570",
  appId: "1:198818193570:web:cabd72dc647c054390b7fb"
};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// set empty variable for image url
let imgUrl = ''

// event listener when goHome button is clicked to go to home page
document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

// event listener when goPost button is clicked to go to post page (if authenticated) or to login page (if  not authenticated)
document.getElementById('goPost').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/post.html'
  } else {
    window.location = '/login.html'
  }
})

// event listener when goProfile button is clicked to go to profile page (if authenticated) or to login page (if not authenticated)
document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }
})

// function to check if user is logged in
function isLoggedIn() {
  if (localStorage.getItem('token')) {
    console.log("logged in")
  } else {
    console.log('not logged in')
    let button = document.getElementById('logOut')
    button.innerHTML = `Sign In`
  }
}

// call the function to check if user is logged in
isLoggedIn()

// function to get posts
function getPosts() {

  // axios get posts
  axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: posts }) => {

      // for each post 
      posts.forEach(({ id, title, body, photo, u: { username, id: { uid } } }) => {

        // create a post element list
        const postElem = document.createElement('li')

        // assign filter as false
        let filter = false

        // assign favs and postFav as blank/empty
        let favs = 'blank'
        let postFav = []

        // axios get favorites
        axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: favorites }) => {

            // for each favorite in favorites push the num (post id) to the postFav array
            favs = favorites
            favs.forEach(fav => {
              let num = parseInt(fav.pid)
              postFav.push(num)
            })

            let i = 0

            // for the post favorites length
            for (i; i < postFav.length; i++) {

              // if the post fav id matches the post id
              if (postFav[i] == id) {
              // console.log('You liked this plant already')

              // add a class name to the post element and add the photo, username, title, body and data id to the html
              postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
              postElem.innerHTML = 
              `
              <div class="col-lg-12 mb-4 border-dark">
                <div class="card  border-dark">
                  <img src="${photo}" alt="" class="card-img-top">
                  <div class="card-body">
                    <span class="badge lavender rounded-pill mb-1">${username}</span>
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                    <button data-id="${id}" class="btn justify-content-end align-items-center material-icons-outlined favorite" >favorite</button>
                  </div>
                </div>
              </div>   
              `
              // prepend the post elements to the likes section (favorites)
              document.getElementById('likes').prepend(postElem)
              }
              else {
              }
            }
          })
      })
    })
    .catch(err => { console.log(err)} )
}


// event listener (global) when click (toggle favorite and not favorite)
document.addEventListener('click', event => {
  event.preventDefault()

  // if the target class list contains 
  if (event.target.classList.contains('favorite')) {
    console.log("fav")

    // assign target to the event target
    let target = event.target

    // if the target inner html is favorite (favorited)
    if (target.innerHTML === 'favorite') {
      // console.log('make clear')

      // target inner html is favorite_border (not favorited)
      target.innerHTML = 'favorite_border'

      // axios delete favorite
      axios.delete(`/api/favorites/${event.target.dataset.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          target.innerHTML = 'favorite_border'
          location.reload()
        })
        .catch(err => console.error(err))
    } 
    // else if the target inner html contains favorite_border (not favorite)
    else if (target.innerHTML === 'favorite_border') {
      // console.log('not solid')

      // assign pid (post id) as the event target dataset id (post id)
      let pid = event.target.dataset.id
      // axios post to favorites
      axios.post('/api/favorites', {
        pid: pid
      }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          // console.log('favorite created')
          target.innerHTML = 'favorite'
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})

// call function to get posts
getPosts()