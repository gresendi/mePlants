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


document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goPost').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/post.html'
  } else {
    window.location = '/login.html'
  }
})

document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }
})

function isLoggedIn() {
  if (localStorage.getItem('token')) {
    console.log("logged in")

  } else {
    console.log('not logged in')
    let button = document.getElementById('logOut')
    button.innerHTML = `Sign In`
  }
}

isLoggedIn()


function getPosts() {


  axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: posts }) => {

      
      

      posts.forEach(({ id, title, body, photo, u: { username, id: { uid } } }) => {
        const postElem = document.createElement('li')

        let filter = false




        let favs = 'blank'
        let postFav = []
        axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: favorites }) => {

            favs = favorites
            favs.forEach(fav => {

              let num = parseInt(fav.pid)
              postFav.push(num)
            })
            for (i; i < postFav.length; i++) {
              if (postFav[i] == id) {
              
                console.log('You liked this plant already')

                postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
                postElem.innerHTML = `
        <div class="ms-2 me-auto">
        <span class="badge lavender rounded-pill mb-1">${username}</span>
          
          <img src = ${photo} class="card-img-top" alt="plant">
          <div class="fw-bold">${title}</div>
          ${body}
          <button data-id="${id}" class="btn justify-content-end align-items-center material-icons-outlined favorite" >favorite</button>
          <p>${id}: for user</P>
        </div>
        
      `
                document.getElementById('likes').prepend(postElem)

              }
              else {

              }
            }





          })

        let i = 0


      })
    })
    .catch(err => {
      console.log(err)
     
    })
}




document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains('favorite')) {
    console.log("fav")

    let target = event.target


    if (target.innerHTML === 'favorite') {
      console.log('make clear')
      target.innerHTML = 'favorite_border'
      axios.delete(`/api/favorites/${event.target.dataset.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          target.innerHTML = 'favorite_border'
          location.reload()

        }
        )
        .catch(err => console.error(err))

    } else if (target.innerHTML === 'favorite_border') {
      console.log('not solid')

      let pid = event.target.dataset.id
      axios.post('/api/favorites', {
        pid: pid

      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {

          console.log('favorite created')



          target.innerHTML = 'favorite'


        })
        .catch(err => {
          console.error(err)
        }
        )
    }





  }
})



getPosts()