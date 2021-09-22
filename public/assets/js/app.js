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

document.getElementById('goPost').addEventListener('click', () => {
  window.location = '/post.html'
})

document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }

})

// document.getElementById('logOut').addEventListener('click', () => {
//   localStorage.removeItem('token')
//   window.location = '/login.html'
// })

// document.getElementById('addPost').addEventListener('click', event => {

//   addPost++
//   event.preventDefault()
//   if (addPost <= 1) {
//     let form = document.createElement('div')
//     form.innerHTML = `
//    <form>

//         <div class="input-group mb-3 mt-3">
//           <input type="file" class="form-control" accept="image/*" id="photo">
//           <label class="input-group-text" for="photo"></label>
//           <progress id="uploader">0%</progress>
//         </div>
//         <div class="mb-3">
//           <label for="title" class="form-label">Username</label>
//           <input type="text" class="form-control" id="title">
//         </div>
//         <div class="mb-3">
//           <label for="body" class="form-label">Body</label>
//           <textarea  class="form-control" rows = "2" id="body"></textarea>
//         </div>
//         <button id="createPost" type="submit" class="btn btn-primary">Create Post</button>
//       </form>
//   `

//     document.getElementById('topContainer').append(form)

//     uploadPhoto()

   
//   }

// })

function getPosts() {
  axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: posts }) => {
      console.log(posts)
      posts.forEach(({ id, title, body, u: { username } }) => {
        const postElem = document.createElement('li')
        postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
        postElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${title}</div>
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill">${username}</span>
      `
        document.getElementById('posts').append(postElem)
      })
    })
    .catch(err => {
      console.log(err)
      window.location = '/login.html'
    })
}


function isLoggedIn() {
  if (localStorage.getItem('token')) {
    console.log("logged in")

  } else {
    console.log('not logged in')
    let button = document.getElementById('logOut')
    button.innerHTML = `Sign In`
  }
}

function uploadPhoto() {
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


getPosts()
isLoggedIn()
