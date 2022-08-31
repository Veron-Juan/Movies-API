const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});


function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item){
        movies = item;
    } else {
        movies = {};
    }
    return movies;
}

function likeMovie(movie){
    
    const likedMovies = likedMoviesList();

    if (likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
        //removerla de localstorage
    } else {
        likedMovies[movie.id] = movie;
    }


    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));

    getTrendingMoviesPreview()
    getLikedMovies()
    
    
    
    
}


//utils


const lazyLoader = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            // console.log(entry.target)
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
        // console.log(entry.target.setAttribute)
        
    } )
});





// lazyLoad = false

function createMovies(movies, container,{
    lazyLoad = false,
    clean = true,
  } = {}, ){
    if (clean) {
        container.innerHTML = '';
    }
    

    movies.forEach(movie => {
        
        // const movies = data.results;
        // movies.forEach(movie => {
        //     const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
            const movieContainer = document.createElement('div');
            //lo q se hace aca es que al movieContainer se le agrega una clase ya existente
            movieContainer.classList.add('movie-container')
            
    
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            // acá con setAtributte agregamos la etiqueta alt, y como segundo parametro lo que va adentro, en el objeto data aparece como movie.title cada titulo de la pelicula
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute(
                lazyLoad ? 'data-img' : 'src', 
                'https://image.tmdb.org/t/p/w300' + movie.poster_path);
            movieImg.addEventListener('click', ()=>{
                    location.hash = '#movie=' + movie.id  ;
                })
            movieImg.addEventListener('error', ()=> {
                movieImg.setAttribute('src', 'https://i.pinimg.com/originals/a5/4b/f8/a54bf8e8bd76d92be03bbecae09c1b69.png')
            });

            const movieBtn = document.createElement('button');
            movieBtn.classList.add('movie-btn');
            movieBtn.addEventListener('click', ()=> {
                movieBtn.classList.toggle('movie-btn--liked');
                likeMovie(movie);
                
                
                
                
            })
            
            
            if (lazyLoad) {
                lazyLoader.observe(movieImg);
                }
    
            movieContainer.appendChild(movieImg);
            movieContainer.appendChild(movieBtn);
            container.appendChild(movieContainer);
    
        })
}


function createCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category => {
        // const categories = data.genres;
        // categories.forEach(category => {
        //     const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
            const categoryContainer = document.createElement('div')
            categoryContainer.classList.add('category-container')
    
            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.setAttribute('id', 'id' + category.id);
            
            categoryTitle.addEventListener('click', ()=>{
                location.hash = `#category=${category.id}-${category.name}`;
            })
    
            const categoryTitleText = document.createTextNode(category.name)
            categoryTitle.appendChild(categoryTitleText)
            categoryContainer.appendChild(categoryTitle);
            container.appendChild(categoryContainer);
    
           
    
        })
}

//llamados api

async function getTrendingMoviesPreview(){
    
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    console.log(movies)
    createMovies(movies, trendingMoviesPreviewList, true);
    
}


async function rankedMovie(){
    
    const { data } = await api('movie/top_rated');
    const movies = data.results;

    console.log(movies)
    createMovies(movies, rankedMoviesPreviewList, true);
    
}


async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    // const data = await res.json();

    // categoriesPreviewList.innerHTML = "";

    createCategories(categories, categoriesPreviewList);

}


async function getMoviesByCategory(id){

    const { data } = await api('discover/movie', {
        params:{
            with_genres: id,
        }
    }); //como estoy trabando con axios podemos poner directamente los parametros que necesito, sino tendria que poner en la url : ?with_genres='
    const movies = data.results;
    
    createMovies(movies, genericSection, { lazyLoad: true });

    
}

async function getMoviesBySearch(query){

    const { data } = await api('search/movie', {
        params:{
            query,
        }
    }); //como estoy trabando con axios podemos poner directamente los parametros que necesito, sino tendria que poner en la url : ?with_genres='
    const movies = data.results;
    
    createMovies(movies, genericSection, { lazyLoad: true, clean: false },);

   
    
}

async function getTrendingMovies(){

    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(data.results)
    

    createMovies(movies, genericSection, { lazyLoad: true, clean: true });

    

    const peliculasEnPantalla = document.querySelectorAll('.movie-container');
    const peliculasEnPantallaArr = Array.prototype.slice.call(peliculasEnPantalla);
    const ultimaPelicula = peliculasEnPantallaArr[peliculasEnPantallaArr.length -1]
    observador.observe(ultimaPelicula)
    
   
}

page = 2
let observador = new IntersectionObserver((entradas, observador) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
            page++;
			getPaginatedTrendingMovies();
		}
	})
}, {
	rootMargin: '0px 0px 200px 0px',
	threshold: 1.0
})




async function getPaginatedTrendingMovies(){
    
    const { data } = await api('trending/movie/day', {
        params: {
            page,
        },
    });
    
    const movies = data.results;
    createMovies(movies, genericSection, { lazyLoad: true, clean: false },);


    const peliculasEnPantalla = document.querySelectorAll('.movie-container');
    const peliculasEnPantallaArr = Array.prototype.slice.call(peliculasEnPantalla);
    const ultimaPelicula = peliculasEnPantallaArr[peliculasEnPantallaArr.length -1]
    observador.observe(ultimaPelicula)
    
}

async function getMovieById(id){

    const { data: movie } = await api('movie/' + id);
    
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();


    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    headerSection.style.background = `url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title; 
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList)
    
    getRelatedMoviesId(id);
}




async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}


function getLikedMovies(){
    
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    
    createMovies(moviesArray, likedMoviesListArticle, true );
    console.log(likedMovies)
    


}