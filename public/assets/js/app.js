const { axios } = window

let addPost = 0

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  if (localStorage.getItem('token')){
    window.location = '/profile.html'
  }else{
    window.location = '/login.html'
  }
  
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
})


document.getElementById('addPost').addEventListener('click', event => {

  addPost++
  event.preventDefault()
  if(addPost<=1){
  let form = document.createElement('div')
  form.innerHTML = `
   <form>

        <div class="input-group mb-3 mt-3">
          <input type="file" class="form-control" id="photo">
          <label class="input-group-text" for="photo"></label>
        </div>
        <div class="mb-3">
          <label for="title" class="form-label">Username</label>
          <input type="text" class="form-control" id="title">
        </div>
        <div class="mb-3">
          <label for="body" class="form-label">Body</label>
          <textarea  class="form-control" rows = "2" id="body"></textarea>
        </div>
        <button id="createPost" type="submit" class="btn btn-primary">Create Post</button>
      </form>
  `
  document.getElementById('topContainer').append(form)
  document.getElementById('createPost').addEventListener('click', event => {
    event.preventDefault()

    axios.post('/api/posts', {
      title: document.getElementById('title').value,
      photo: document.getElementById('photo').value,
      body: document.getElementById('body').value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: { id, title, photo, body, u: { username } } }) => {
        const postElem = document.createElement('li')
        postElem.className = 'd-flex justify-content-between align-items-start mb-2 listItem'
        postElem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${title}</div>
          ${photo}
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill">${username}</span>
      `
        document.getElementById('posts').append(postElem)
        addPost = 0
        location.reload()
        
      })
      .catch(err => console.error(err))
  })
  }

})
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

function isLoggedIn(){
  if (localStorage.getItem('token')){
    console.log("logged in")

  }else{
    console.log('not logged in')
    let button = document.getElementById('logOut')
    button.innerHTML = `Sign In`
  }
}


getPosts()
isLoggedIn()