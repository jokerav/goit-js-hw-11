import Notiflix from 'notiflix';
import ImageAPI from './imageAPI';
import './sass/main.scss';
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name=searchQuery]');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const imageAPIservice = new ImageAPI();

form.addEventListener('submit', onSearchPress);
// btnLoadMore.addEventListener('click', onLoadMore);

function onSearchPress(e) {
  e.preventDefault();
  imageAPIservice.querry = searchInput.value;
  if (imageAPIservice.querry === '') {
    printError();
  } else {
    imageAPIservice.getImages().then(response => {
      console.log(response);
      if (response.total === 0) {
        printError();
      } else createPictureMarkup(response);
    });
  }
}

function printError() {
  Notiflix.Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.',
  );
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
