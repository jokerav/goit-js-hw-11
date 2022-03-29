import Notiflix from 'notiflix';
import ImageAPI from './imageAPI';
import './sass/main.scss';
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name=searchQuery]');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let imageAPIservice = new ImageAPI();

form.addEventListener('submit', onSearchPress);
btnLoadMore.addEventListener('click', onLoadMore);
btnLoadMore.classList.add('hidden');

function onSearchPress(e) {
  e.preventDefault();
  btnLoadMore.classList.add('hidden');
  imageAPIservice.resetPage();
  imageAPIservice.querry = searchInput.value;

  imageAPIservice.getImages().then(response => {
    clearMarkup();
    appendMurkup(response);
    btnLoadMore.classList.remove('hidden');
  });
}

function onLoadMore(e) {
  e.preventDefault;
  imageAPIservice.getImages().then(response => {
    appendMurkup(response);
    if (imageAPIservice.per_page * imageAPIservice.page >= response.total) {
      printNoMorePicture();
    }
  });
}
function appendMurkup(pic) {
  if (pic.total === 0) {
    printError();
  } else {
    createPictureMarkup(pic);
  }
}
function createPictureMarkup(res) {
  res.hits.map(pic => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
  <img src="${pic.webformatURL}" alt="${pic.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${pic.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${pic.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${pic.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${pic.downloads}</b>
    </p>
  </div>
</div>`,
    );
  });
}
function printError() {
  Notiflix.Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}
function printNoMorePicture() {
  Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
}
function clearMarkup() {
  gallery.innerHTML = '';
}
