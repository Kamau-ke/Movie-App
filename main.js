const api_key='b27c5be4dfceebc838152df8963cd6d8'
const BASE_URL='https://api.themoviedb.org/3/'
const Api_Url=`${BASE_URL}discover/movie? sort_by=popularity.desc&api_key=${api_key}`
const image_path='https://image.tmdb.org/t/p/w500/'
const main=document.querySelector('#main')
const form=document.getElementById('form')
const search=document.querySelector('.search')
const searchURL=`${BASE_URL}search/movie?${api_key}`;

function getMovies(url){
    fetch(url)
    .then(res =>res.json())
  
    .then(data=>{
        displayMovie(data.results)
        console.log(data.results)
    })
    .catch(err=>console.log(err))

}
getMovies(Api_Url)



function displayMovie(data){
    main.innerHTML=''
    data.forEach(movie =>{
        const { poster_path, title, vote_average,overview}=movie
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')
        
        movieEl.innerHTML=`
        <img src="${image_path+poster_path}" alt='${title}'>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getAverage(vote_average)}">${vote_average}</span>
        </div>
    
        <div class="overview">
            <h3>overview</h3>
                ${overview}
        </div>
        `
       main.appendChild(movieEl)
    })
   

}

function getAverage(vote){
    if (vote>=8 ){
        return 'green'
    }else if(vote >=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchText=search.value;
    
    if(searchText){
        getMovies(`${BASE_URL}search/movie?api_key=${api_key}&query=${searchText}`)
       
    }
    else{
        getMovies(Api_Url)
    }

})



// displayMovie()

