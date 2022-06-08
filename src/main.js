const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});


//utils
function createMovies(movies, container){
    container.innerHTML = '';  //con esto limpio la pagina y no se sobreagregan elementos

    movies.forEach(movie => {
        // const movies = data.results;
        // movies.forEach(movie => {
        //     const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
            const movieContainer = document.createElement('div');
            //lo q se hace aca es que al movieContainer se le agrega una clase ya existente
            movieContainer.classList.add('movie-container')
            movieContainer.addEventListener('click', ()=>{
                location.hash = '#movie=' + movie.id  ;
            })
    
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            // acá con setAtributte agregamos la etiqueta alt, y como segundo parametro lo que va adentro, en el objeto data aparece como movie.title cada titulo de la pelicula
            movieImg.setAttribute('alt', movie.title)
            movieImg.setAttribute(
                'src', 
                'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    
            movieContainer.appendChild(movieImg);
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


    createMovies(movies, trendingMoviesPreviewList);
    
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
    
    createMovies(movies, genericSection);

    
}

async function getMoviesBySearch(query){

    const { data } = await api('search/movie', {
        params:{
            query,
        }
    }); //como estoy trabando con axios podemos poner directamente los parametros que necesito, sino tendria que poner en la url : ?with_genres='
    const movies = data.results;
    
    createMovies(movies, genericSection);

    
}

async function getTrendingMovies(){

    const { data } = await api('trending/movie/day');
    const movies = data.results;
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();


    createMovies(movies, trendingMoviesPreviewList);
    
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
