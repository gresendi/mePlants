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

let addPost = 0

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
})

document.getElementById('favorites').addEventListener('click', () => {
  window.location = '/like.html'
})

document.getElementById('goPost').addEventListener('click', () => {
  window.location = '/post.html'
})

document.getElementById('addPlant').addEventListener("click", event => {
  window.location = '/addPlant.html'
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('deletePost')) {
    axios.delete(`/api/posts/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => event.target.parentNode.parentNode.remove())
      .catch(err => console.error(err))
  }
})



document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains('removePlant')) {
    console.log('deleting plant')
    axios.delete(`/api/plants/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => location.reload())
      .catch(err => console.error(err))
  }
  else if (event.target.classList.contains('water')) {

    axios.get('api/plants', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: plants }) => {
        plants.forEach(plant => {

          if (plant.id == event.target.dataset.id) {
            let interval = plant.intervals
            console.log(plant.intervals)
            axios.put('/api/plants', { intervals: interval, id: plant.id })
              .then(() => {
                console.log("updated")
                location.reload()
              })
          }
        })
      })

    axios.get('api/plants', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: plants }) => {
        plants.forEach(plant => {

          if (plant.id == event.target.dataset.id) {
            let interval = plant.intervals
            console.log(plant.intervals)
            axios.put('/api/plants', { intervals: interval, id: plant.id })
              .then(() => {
                console.log("updated")
                location.reload()
              })
          }
        })
      })
  }
})


axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username } }) => {
    const userElem = document.createElement('div')
    userElem.innerHTML = `
    <p>${username}</p>
    `
    document.getElementById('username').append(userElem)
  })
  .catch(err => console.error(err))

axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username, posts } }) => {
    document.getElementById('username').innerText = username
    posts.forEach(({ id, title, body, photo }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex mb-2 listItem'
      postElem.innerHTML = `
    <div class="mb-4 card border-dark">
      <img src="${photo}" alt="a plant" class="card-img-top">
      <div class="card-body">
      
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${body}</p>
      <button data-id="${id}" class="btn justify-content-end align-items-center material-icons-outlined btn-danger deletePost">delete</button>
      </div>
     </div>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => console.error(err))


axios.get('api/plants', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: plants }) => {
    console.log(plants)
    plants.forEach(({ nickName, officialName, care, photo, lastWatered, nextWatering, id }) => {
      console.log(officialName)
      let plant = document.createElement('div')
      plant.innerHTML = `

   <div class="row mb-2 justify-content-center  ">
             

     
         
             
         <div class="row mb-2 justify-content-center ">
              <div class="col-sm-4 ">
                <img src="${photo}"
                  class="card-img-top" alt="plant">
              </div>

              <div class="  col-sm-4 card-text text-center plantCard ">
                <h5 class = 'mt-5'>${nickName}</h5>
                <p>${officialName}</p>
                <p>Care Tips: ${care}</p>
                <p>Last Watered: ${lastWatered}</p>
                <p>Next Watering: ${nextWatering}</p>
                <div class="row justify-content-center">
                  <button data-id = "${id}"  class=" col-sm-5 btn btn-primary water mb-2">Water</button>
                </div>
                <div class="row justify-content-center">
                  <button data-id = "${id}"  class="col-sm-6 btn btn-success scheduleWater mb-2 ">Schedule Watering</button>
                </div>
                <div class="row justify-content-center align-items-end">
                  <button data-id = "${id}" class="col-sm-5 btn btn-danger mb-3 removePlant ">Delete</button>
                </div>
              </div>

              
            </div>

      `
      document.getElementById('plants').append(plant)

    })
  })



document.getElementById('waterAll').addEventListener('click', event => {

  axios.get('api/plants', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: plants }) => {
      console.log(plants)
      plants.forEach(({ intervals, id }) => {

        axios.get('api/plants', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: plants }) => {
            plants.forEach(plant => {

              if (plant.id == id) {
                let interval = plant.intervals

                axios.put('/api/plants', { intervals: interval, id: plant.id })
                  .then(() => {
                    location.reload()

                  })
              }
            })

          })



      })
    })

})


document.addEventListener('click', event => {

  if (event.target.classList.contains('scheduleWater')) {
    console.log(event.target.dataset.id)

    let button = event.target
    let id = button.dataset.id
    let parent = button.parentNode
    button.remove()
    let container = document.createElement('form')
    container.innerHTML = `
    <label for="sel1">Days (select one):</label>
        <select id='sel1' class="form-select mb-3" aria-label="Default select example">
          <option selected>Water In </option>
          <option value="1">1 day</option>
          <option value="2">2 days</option>
          <option value="3">3 days</option>
          <option value="4">4 days</option>
          <option value="5">5 days</option>
          <option value="6">6 days</option>
          <option value="7">7 days</option>
          <option value="8">8 days</option>
          <option value="9">9 days</option>
        </select>
        <button id="createPlant" class="btn btn-success mb-3 schedule">Schedule</button>
    
    `
    parent.append(container)
    document.addEventListener('click', event => {

      if (event.target.classList.contains('schedule')) {
        let days = document.getElementById('sel1').value
        console.log(days)
        axios.put(`/api/plants/:${id}`, { daysFrom: days, id: id })
          .then(() => location.reload())
      }
    })


    //button.remove()
  }
})


