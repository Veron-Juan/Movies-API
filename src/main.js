const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview(){

    const { data } = await api('trending/movie/day');
    const movies = data.results;
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
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
            'src', 
            'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);

    })
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    // const data = await res.json();

    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
    // const categories = data.genres;
    // categories.forEach(category => {
    //     const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name)
        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);

       

    })
}

getTrendingMoviesPreview();

getCategoriesPreview()
