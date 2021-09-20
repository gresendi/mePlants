const { axios } = window

document.getElementById('createPost').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/posts', {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data: { id, title, body, u: { username } } }) => {
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
    .catch(err => console.error(err))
})

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  window.location = '/profile.html'
})

document.getElementById('logOut').addEventListener('click', () => {
  localStorage.removeItem('token')
  window.location = '/auth.html'
})

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
    window.location = '/auth.html'
  })
