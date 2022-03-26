import Notiflix from 'notiflix';
import ImageAPI from './imageAPI';
import './sass/main.scss';
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('[name=searchQuery]');
const btnSearch = document.querySelector('.input-btn');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const imageAPIservice = new ImageAPI();

form.addEventListener('submit', onSearchPress);
// btnLoadMore.addEventListener('click', onLoadMore);

function onSearchPress(e) {
  e.preventDefault();
  const userInput = searchInput.value;
  imageAPIservice.querry = userInput;
  console.log(imageAPIservice);
  imageAPIservice.getImages().then(res => createPictureMarkup(res));
}

// getImages('ship').then(response => {
//   if (response.total === 0) {
//     Notiflix.Notify.warning(
//       'Sorry, there are no images matching your search query. Please try again.',
//     );
//   } else createPictureMarkup(response);
// });

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
