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

let addPlant = 0

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  window.location = '/profile.html'
})

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

document.getElementById('addPlant').addEventListener("click", event=>{
   window.location ='/addPlant.html'
  
})


document.addEventListener('click', event => {
  event.preventDefault()
 if (event.target.classList.contains('closePlant')) {
    console.log('closing plant')
    let closeForm = document.getElementById('plants')
    closeForm.removeChild(closeForm.childNodes[0])
    addPlant=0
  }
  else if (event.target.classList.contains('removePlant')) {
    console.log('deleting plant')
    axios.delete(`/api/plants/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => location.reload())
      .catch(err => console.error(err))
  }
  else if(event.target.classList.contains('water')) {
    
    axios.get('api/plants', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: plants })=>{
        plants.forEach(plant=>{
          
          if(plant.id==event.target.dataset.id)
          {
            let interval = plant.intervals
            console.log(plant.intervals)
            axios.put('/api/plants', {intervals: interval, id:plant.id })
            .then(()=>{
              console.log("updated")
              location.reload()
            })
          }
        })

    })
    
  }
  else if(event.target.classList.contains('createPlant')){
    createPlant()
  }



})



axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username, posts } }) => {
    posts.forEach(({ id, title, body }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
      postElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${title}</div>
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill infoPill">${username}</span>
        <span data-id="${id}" class="deletePost badge bg-danger rounded-pill">x</span>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => console.error(err))


  axios.get('api/plants',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(({data:plants})=>{
    console.log(plants)
    plants.forEach(({nickName,care,photo,lastWatered,nextWatering,id})=>
    {
      let plant = document.createElement('div')
      plant.innerHTML=`
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


function uploadPhoto() {

  console.log('clicked')
  // event listener when the html file input is changed (to upload image/photo)
  document.getElementById('photo').addEventListener('change', event => {
    console.log('log event');

    // Selected File Image is the event target files
    let selectedImgFile = event.target.files[0]
    console.log(selectedImgFile);

    // Create a unique file name to pass the reference
    let fileName = 'mePlant' + Date.now() + '.png'

    // Assign a metadata (which will show as image/jpeg in storage)
    let metadata = { contentType: 'image/jpeg' }

    // Create reference to the firebase app storage
    let storage = getStorage(firebaseApp)
    // Create reference to storage images/ folder and add the unique file name for the images ref
    let imagesRef = ref(storage, 'images/' + fileName)
    // upload to the storage images folder the selected image file and show the metadata
    let uploadTask = uploadBytesResumable(imagesRef, selectedImgFile, metadata)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        let uploader = document.getElementById('uploader')
        uploader.value = progress

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(err)
      },
      () => {
        // Handle successful uploads on complete
        // get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          imgUrl = downloadURL
          
        });
      }
    );
  })
}


document.getElementById('waterAll').addEventListener('click',event =>{
  event.preventDefault()
  axios.get('api/plants', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: plants }) => {
      console.log(plants)
      plants.forEach(({  intervals, id }) => {
      
        axios.get('api/plants', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: plants }) => {
            plants.forEach(plant => {

              if (plant.id == id) {
                let interval = plant.intervals
                
                axios.put('/api/plants', { intervals: interval , id: plant.id })
                  .then(() => {
                    location.reload()
                    
                  })
              }
            })

          })



      })
    })

})
