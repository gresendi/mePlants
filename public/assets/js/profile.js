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
                <label for="image" class="form-label">Image url</label>
                <input type="text" class="form-control" id="image" aria-describedby="emailHelp">

              </div>
                <label for="sel1">Select list (select one):</label>
                <select id = 'sel1' class="form-select mb-3" aria-label="Default select example">
                  <option selected>Water Every: </option>
                  <option value="1">Day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                  <option value="8">8 days</option>
                  <option value="9">9 days</option>
                  </select>
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
    let intervals = document.getElementById('sel1').value
    console.log(intervals)
    axios.post('/api/plants', {
      officialName: '',
      nickName: document.getElementById('plantName').value,
      photo: document.getElementById('image').value,
      care: document.getElementById('care').value,
      lastWatered: Date.now(),
      nextWatering: moment().add(intervals,'days').format(),
      intervals: intervals
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
        
    }).then(() => {
      console.log("plant added")
      location.reload()
    })
      .catch(err => console.error(err))
  }
  else if (event.target.classList.contains('closePlant')) {
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