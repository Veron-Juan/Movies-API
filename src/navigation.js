SearchBtn.addEventListener('click', ()=> {
    location.hash = '#search='+ searchFormInput.value;;
})

trendingBtn.addEventListener('click', ()=> {
    location.hash = '#trends';
})

arrowBtn.addEventListener('click', ()=> {
    // location.hash = '#home';
    location.hash = window.history.back();
    
})




window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }


  window.scrollTo(0, 0);
}

function homePage() {
  console.log("Home!!")


  headerSection.style.background = ''; //con esto solucioné el problema q al volver al home, se veia la imagen de la pelicula en el header
  headerSection.classList.remove('header-container--long');
  headerSection.getElementsByClassName.background = '',
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');



  getTrendingMoviesPreview()
  getCategoriesPreview()
}
function categoriesPage() {
  console.log("Categories!!");

  headerSection.classList.remove('header-container--long');
  headerSection.getElementsByClassName.background = '',
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=')        // ['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split('-')

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);

}
function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add('header-container--long');
//   headerSection.getElementsByClassName.background = '',
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  // ['movie', '4646']
  const [_, movieId] = location.hash.split('=');

  getMovieById(movieId);
}







function searchPage() {
  console.log("Search!!")

  headerSection.classList.remove('header-container--long');
  headerSection.getElementsByClassName.background = '',
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  //['#search, 'buscador']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}
function trendsPage() {
  console.log("TRENDS!!")

  headerSection.classList.remove('header-container--long');
  headerSection.getElementsByClassName.background = '',
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';

  getTrendingMovies();
}