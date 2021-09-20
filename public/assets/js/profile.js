const { axios } = window

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
