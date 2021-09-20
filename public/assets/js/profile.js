const { axios } = window
let addPlant = 0

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

document.getElementById('addPlant').addEventListener("click", event=>{
  event.preventDefault()
    if(addPlant==0){
    console.log('clicked'+ addPlant)
    let add = document.createElement('div')
    add.className = "col-sm-6 mx-auto mb-5"
    add.innerHTML=
    `
  <form>
                <div class="mb-3">
                  <label for="plantName" class="form-label">Plant Name</label>
                  <input type="text" class="form-control" id="plantName" aria-describedby="emailHelp">

                </div>
              <div class="mb-3">
                <label for="care" class="form-label">Care Tips</label>
                <textarea class="form-control" id="care" rows="1"></textarea>
              </div>

              <div class="mb-3">
                <label for="plantName" class="form-label">Image url</label>
                <input type="text" class="form-control" id="plantName" aria-describedby="emailHelp">

              </div>

                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Watered Today</label>
                </div>
                <button class="btn btn-primary addPlant">Add plant</button>
                <button class="btn btn-danger closePlant">x</button>
              </form>

    `
    //  let form = document.getElementById('plants')
    // form.childNodes[0].innerHTML= add

    document.getElementById('plants').prepend(add)
    addPlant++
}

  

})
document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains('addPlant')) {
    console.log('adding plant')
  }
  else if (event.target.classList.contains('closePlant')) {
    console.log('closing plant')
    let closeForm = document.getElementById('plants')
    closeForm.removeChild(closeForm.childNodes[0])
    addPlant=0
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
