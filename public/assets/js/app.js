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

// assign addPost as zero
let addPost = 0

// event listener when goHome button is clicked to go to home page
document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

// event listener when goLike button is clicked to go to like (favorites page), have to be authenticated as if not go to login page
document.getElementById('goLike').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/like.html'
  } else {
    window.location = '/login.html'
  }
})

// event listener when goPost button is clicked to go to the post page
document.getElementById('goPost').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/post.html'
  } else {
    window.location = '/login.html'
  }
})

// event listener when goProfile button is clicked to go to the profile page
document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    window.location = '/profile.html'
  } else {
    window.location = '/login.html'
  }
})

function getFavorites() {

  // assign favs as blank and postFav array as empty
  let favs = 'blank'
  let postFav = []

  // axios get favorites
  axios.get('/api/favorites', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    // then for each favorite let the num be equal to the favorite post id and push the num (post id) to the postFav array
    .then(({ data: favorites }) => {

      favs = favorites
      favs.forEach(fav => {

        let num = parseInt(fav.pid)
        postFav.push(num)
      })
    })
}


// function to get posts
function getPosts() {

  // variables for userId and user (username)
  let userId = 0
  let user = ''

  // axios get posts
  axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: posts }) => {

      // variable for favorites and call function get favorites and push to favorites
      let favorites = [1]
      favorites.push(getFavorites())

      // for each post
      posts.forEach(({ id, title, body, photo, u }) => {

        // create a list element
        const postElem = document.createElement('li')

        // variable for filter (to filter if favorite or not favorite) and set the userId as the u (user) id and hte user as the u (user) username
        let filter = false
        userId = u.id
        user = u.username
        // console.log(userId + ' USERID')

        // variable for favs and postFav
        let favs = 'blank'
        let postFav = []

        // axios get favorites
        axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: favorites }) => {

            // for each favorite push the post id to the postFav array
            favs = favorites
            favs.forEach(fav => {
              let num = parseInt(fav.pid)
              postFav.push(num)
            })

            // for loop to update filter (to mark as a favorite or not)
            let i = 0
            for (i; i < postFav.length; i++) {
              if (postFav[i] == id) {
                filter = true
              }
              else { }
            }

            // variable set postID as the id (post id)
            let postID = id

            // axios get comments using post id
            axios.get(`/api/comments/${postID}`).then(res => {

              // comments aray equal to the response (spread/rest)
              let commentsArray = [...res.data]
              // console.log(commentsArray)

              // create element unordered list for the comment
              let commentDiv = document.createElement('ul')
              commentDiv.className = "list-group list-group-flush ct"

              // for each comment in the comments array
              commentsArray.forEach(comment => {
                // comment post id
                comment.pid

                // if the id (post id) matches the commments post id
                if (id == comment.pid) {
                  // create a list element and set the inner text as the comments comment amd append the comment to the post
                  let commentItem = document.createElement('li')
                  commentItem.className = "list-group-item"
                  let pill = document.createElement('span')


                  pill.className = 'badge bg-success rounded-pill mb-1 userCom'
                  pill.innerText = comment.username
                  let commentSpan = document.createElement('span')
                  commentSpan.innerText = comment.comment
                  commentItem.append(pill)
                  commentItem.append(commentSpan)
                  commentDiv.append(commentItem)
                  // commentItem.innerText = comment.username + ' ' + comment.comment
                  // commentDiv.append(commentItem)
                }
              })

              // console.log(commentDiv.innerHTML)
              // if the filter (favorite)
              if (filter) {
                // console.log('You liked this plant already')
                // add class name for the post element and add the inner html with the post details
                postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
                postElem.innerHTML =
                  `
                <div class="col-lg-12 mb-4 border-dark">
                    <div class="card border-dark">
                      <img src="${photo}" alt="" class="card-img-top">
                      <div class="card-body">
                        <h5>
                        <span class="badge bg-success rounded-pill mb-1">${u.username}</span>
                        </h5>
                        <h4 class="card-title">${title}</h4>
                        <p class="card-text">${body}</p>
                    
                        <div class= "row">
                         <div class="col-12 ">
                           <ul id = "commentBox${id}" class ='ct' >${commentDiv.innerHTML}</ul >
                         </div>

                          <form method="POST" class="bottomSec">
                            <button data-id="${id}" class="btn justify-content-end align-items-center material-icons-outlined favorite" >favorite</button>
                            <textarea id = "comment${id}" aria-label="Add a comment…" placeholder="Comment…" class="form-control comment" autocomplete="off" autocorrect="off" style="height: 30px;"></textarea>
                            <button data-id="${id}" class="btn btn-success postComment" type="submit">Post</button>
                          </form>
                       </div>
                      </div>
                    </div>
                </div>
                `
                // prepend the post elements to the post section on the html
                document.getElementById('posts').prepend(postElem)
              }
              // else the filter (not favorite)
              else {
                // add class name for the post element and add the inner html with the post details
                postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
                postElem.innerHTML =
                  `
                <div class="col-lg-12 mb-4 border-dark">
                    <div class="card border-dark">
                      <img src="${photo}" alt="" class="card-img-top">
                      <div class="card-body">
                        <h5>
                        <span class="badge bg-success rounded-pill mb-1">${u.username}</span>
                        </h5>
                        <h4 class="card-title">${title}</h4>
                        <p class="card-text">${body}</p>
                    
                         <div class= "row">
                           <div class="col-11 ">
                             <ul id = "commentBox${id}" class ='ct' >${commentDiv.innerHTML}</ul >
                           </div>
                          <form method="POST" class="bottomSec">
                            <button data-id="${id}" class="btn justify-content-end align-items-center material-icons-outlined favorite" >favorite_border</button>
                            <textarea id = "comment${id}" aria-label="Add a comment…" placeholder="Comment…" class="form-control comment" autocomplete="off" autocorrect="off" style="height: 30px;"></textarea>
                            <button data-id="${id}"" class="btn btn-success postComment" type="submit">Post</button>
                          </form>
                       </div>
                      </div>
                    </div>
                </div>
                `
                // prepend the post elements to the post section on the html
                document.getElementById('posts').prepend(postElem)
              }
            })
          })
      })

      // event listener when click
      document.addEventListener('click', event => {
        event.preventDefault()

        // if the event target classlist contains postComment
        if (event.target.classList.contains('postComment')) {
          // console.log("i see you want to make a post")

          // assign post as the event target dataset id (post id) and the comment to the commentpost(post id)
          let post = event.target.dataset.id
          let comment = document.getElementById(`comment${post}`).value

          // assign postId as the parse interger of post (post id)
          let postId = parseInt(post)
          // axios post comments
          axios.post('/api/comments',
            {
              pid: postId,
              username: user,
              comment: comment
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(() => {
              // console.log("comment created")
              let commentItem = document.createElement('li')
              commentItem.className = "list-group-item"

              let pill = document.createElement('span')


              pill.className = 'badge bg-success rounded-pill mb-1 userCom'
              pill.innerText = user
              let commentSpan = document.createElement('span')
              commentSpan.innerText = comment
              commentItem.append(pill)
              commentItem.append(commentSpan)

              document.getElementById(`commentBox${post}`).append(commentItem)

              document.getElementById(`comment${post}`).value = ''
            })
            .catch(err => console.error(err))
        }
      })
    })
    // catch error and go to login html
    .catch(err => {
      console.log(err)
      window.location = '/login.html'
    })
}

// event listener (global) when click (toggle favorite and not favorite)
document.addEventListener('click', event => {
  event.preventDefault()

  // if the target class list contains favorite
  if (event.target.classList.contains('favorite')) {
    console.log("fav")

    // assign target to equal the event target
    let target = event.target

    // if the target inner html is favorite
    if (target.innerHTML === 'favorite') {
      // console.log('make clear')
      // target inner html is favorite_border (not favorite)
      target.innerHTML = 'favorite_border'

      // axios delete the favorite by the event target dataset id
      axios.delete(`/api/favorites/${event.target.dataset.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          target.innerHTML = 'favorite_border'
        })
        .catch(err => console.error(err))
    }
    // else if the target inner html is favorite_border (not favorite)
    else if (target.innerHTML === 'favorite_border') {
      console.log('not solid')

      // assign the pid (post id) to the event target dataset id (post id)
      let pid = event.target.dataset.id
      // axios post favorites
      axios.post('/api/favorites',
        {
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
        .catch(err => { console.error(err) })
    }
  }
})

// function to upload photo to firebase
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

//Rendering posts onto the page
getPosts()


//got to line 400