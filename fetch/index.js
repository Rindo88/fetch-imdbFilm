
// // // 1.Jquery
// $("#search-button").on('click', function(){
//     const valueSearch = $('.input-search').val()
    
//     $.ajax({
//       url:`http://www.omdbapi.com/?apikey=&s=${valueSearch}`,
//       success:(result => {
//         const movies = result.Search
//         let cards = ''
//         movies.forEach(m => { 
//           cards += showCard(m) })
//             $('.container-movie').html(cards)
    
//             $('.button-detail').on('click',function(){
//               $.ajax({
//                 url: `http://www.omdbapi.com/?apikey=&i=${$(this).data('id')}`,
//                 success: result =>{ 
//                   const detailModal = showDetail(result)
//                               $('.modal-body').html(detailModal)
//                             },
//                       error: e => console.log(e.responseText)
//                    })
//             })
//       }),
//       error: e => console.log(e.responseText)
//     })
//     })
    






// // // 2.Vanila JS
//  // fetch
const buttonSearch = document.querySelector("#search-button")
buttonSearch.addEventListener("click",function(){
    const inputValue = document.querySelector(".input-search").value
    
    fetch(`http://www.omdbapi.com/?apikey=&s=${inputValue}`)
    .then(res => res.json())
    .then(result => {
        let cards = ''
        const movies = result.Search

        movies.forEach(m => cards += showCard(m))

        const containerMovie = document.querySelector('.container-movie')
        containerMovie.innerHTML = cards


        const buttonDetail = document.querySelectorAll(".button-detail")
        buttonDetail.forEach(btn => {
            btn.addEventListener('click',function(){
                const id = this.getAttribute('data-id')
                
                fetch(`http://www.omdbapi.com/?apikey=&i=${id}`)
                .then(res => res.json())
                .then(result =>{
                    const detailMovie = showDetail(result)
    
                    const modalBody = document.querySelector(".modal-body")
                    modalBody.innerHTML = detailMovie
                })
            })
        })
    })
    .catch(e => console.log(e.responseText))
})






    function showCard(m){
      return `
            <div class="col-md-4 my-3">
              <div class="card">
                  <img src="${m.Poster}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary button-detail" data-id="${m.imdbID}" data-bs-toggle="modal" data-bs-target="#detail-movie">Show Details</a>
                  </div>
                </div>
              </div>`
    }
    
    
    function showDetail(result){
      return ` <div class="container-fluid">
                                    <div class="row">
                                     <div class="col-md-3">
                                      <img src="${result.Poster}" class="img-fluid">
                                    </div>
                                     <div class="col-md">
                                      <ul class="list-group">
                                        <li class="list-group-item"><h4>${result.Title} ${result.Year}</h4></li>
                                        <li class="list-group-item"><strong>Director : </strong>${result.Director}</li>
                                        <li class="list-group-item"><strong>Actors : </strong>${result.Actors}</li>
                                        <li class="list-group-item"><strong>Writer : </strong>${result.Writer}</li>
                                        <li class="list-group-item"><strong>Plot : </strong><br>${result.Plot}</li>
                                      </ul>
                                   </div>
                                </div>
                              </div>`
    }
