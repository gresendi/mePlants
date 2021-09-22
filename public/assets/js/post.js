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

document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }
})


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

uploadPhoto()
document.getElementById('createPost').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/posts', {
    title: document.getElementById('title').value,
    photo: imgUrl,
    body: document.getElementById('body').value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: { id, title, photo, body, u: { username } } }) => {

      let imgUrl = ''
      window.location = '/'

    })
    .catch(err => console.error(err))
})

document.getElementById('body').addEventListener('input', event => {
  const target = event.currentTarget
  const maxCharLength = target.getAttribute('maxlength')
  const currentCharLength = target.value.length

  // console.log(`${maxCharLength - currentCharLength} chars left`);
  let charLeftCount = maxCharLength - currentCharLength
  // console.log(`${charLeftCount} many characters left`);
  document.getElementById('charLeftCounter').textContent = charLeftCount
})