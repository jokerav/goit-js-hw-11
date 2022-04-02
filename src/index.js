import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImageAPI from './imageAPI';

import './sass/main.scss';
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name=searchQuery]');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let imageAPIservice = new ImageAPI();

let lightbox = new SimpleLightbox('.gallery a');

lightbox.on('show.simplelightbox', function () {
  // do something…
});
lightbox.on('error.simplelightbox', function (e) {
  console.log(e); // some usefull information
});

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
    if (imageAPIservice.per_page * imageAPIservice.page - 1 >= response.total) {
      printNoMorePicture();
    }
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
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
      `
      <div class="photo-card">
        <a href="${pic.largeImageURL}">
          <img src="${pic.webformatURL}" alt="${pic.tags}" height='300px' loading="lazy" />
        </a>
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
    lightbox.refresh();
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
