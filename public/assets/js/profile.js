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





// document.getElementById('createPlant').addEventListener('click', event => {
//   event.preventDefault()
//   console.log('adding plant')


//   let intervals = document.getElementById('sel1').value
//   console.log(intervals)
//   axios.post('/api/plants', {
//     officialName: '',
//     nickName: document.getElementById('plantName').value,
//     photo: imgUrl,
//     care: document.getElementById('care').value,
//     lastWatered: Date.now(),
//     nextWatering: moment().add(intervals, 'days').format(),
//     intervals: intervals
//   }, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }

//   }).then(() => {
//     console.log("plant added")
//     window.location = '/profile.html'
//     imgUrl = ' '
//   })
//     .catch(err => console.error(err))


// })










// document.getElementById('addPlant').addEventListener('click', () => {
//   window.location = '/addPlant.html'
// })

// document.getElementById('goProfile').addEventListener('click', () => {
//   window.location = '/profile.html'
// })

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('deletePost')) {
    axios.delete(`/api/posts/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

document.getElementById('addPlant').addEventListener("click", event => {
  window.location = '/addPlant.html'

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

  }
 
})



axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username, posts } }) => {
    posts.forEach(({ id, title, body, photo }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      postElem.innerHTML = `
         <div class="ms-2 me-auto">
        <span class="badge lavender rounded-pill mb-1">${username}</span>
          
          <img src = ${photo} class="card-img-top" alt="plant">
          <div class="fw-bold">${title}</div>
          ${body}
        <span data-id="${id}" class="deletePost badge bg-danger rounded-pill">x</span>
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
    plants.forEach(({ nickName, care, photo, lastWatered, nextWatering, id }) => {
      let plant = document.createElement('div')
      plant.innerHTML = `
         <div class="row mb-3">
              <div class="col-sm-4">
                <img src="${photo}"
                  class="card-img-top" alt="plant">
              </div>

              <div class="col-sm-4">
                <h5>${nickName}</h5>
                <p>actual name</p>
                <p>Care Tips: ${care}</p>
                <p>Last Watered: ${lastWatered}</p>
                <p>Next Watering: ${nextWatering}</p>
              </div>

              <div class="col-sm-4">
                <div class="row">
                  <button data-id = "${id}"  class="col-sm-5 btn btn-primary water mb-2">Water</button>
                </div>
                <div class="row">
                  <button data-id = "${id}"  class="col-sm-6 btn btn-success scheduleWater mb-2">Schedule Watering</button>
                </div>
                <div class="row">
                  <button data-id = "${id}" class="col-sm-5 btn btn-danger removePlant ">Delete</button>
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


// document.getElementById('photo').addEventListener('change', event => {

//   console.log('log event');

//   // Selected File Image is the event target files
//   let selectedImgFile = event.target.files[0]
//   console.log(selectedImgFile);

//   // Create a unique file name to pass the reference
//   let fileName = 'mePlant' + Date.now() + '.png'

//   // Assign a metadata (which will show as image/jpeg in storage)
//   let metadata = { contentType: 'image/jpeg' }

//   // Create reference to the firebase app storage
//   let storage = getStorage(firebaseApp)
//   // Create reference to storage images/ folder and add the unique file name for the images ref
//   let imagesRef = ref(storage, 'images/' + fileName)
//   // upload to the storage images folder the selected image file and show the metadata
//   let uploadTask = uploadBytesResumable(imagesRef, selectedImgFile, metadata)

//   // Register three observers:
//   // 1. 'state_changed' observer, called any time the state changes
//   // 2. Error observer, called on failure
//   // 3. Completion observer, called on successful completion
//   uploadTask.on('state_changed',
//     (snapshot) => {
//       // Observe state change events such as progress, pause, and resume
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       let uploader = document.getElementById('uploader')
//       uploader.value = progress

//       switch (snapshot.state) {
//         case 'paused':
//           console.log('Upload is paused');
//           break;
//         case 'running':
//           console.log('Upload is running');
//           break;
//       }
//     },
//     (error) => {
//       // Handle unsuccessful uploads
//       console.log(err)
//     },
//     () => {
//       // Handle successful uploads on complete
//       // get the download URL: https://firebasestorage.googleapis.com/...
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//         imgUrl = downloadURL
//       });
//     }
//   );
// })