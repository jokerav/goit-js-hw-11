import axios from 'axios';
import Notiflix from 'notiflix';
import './sass/main.scss';
const searchInput = document.querySelector('[name=searchQuery]');
const btnInput = document.querySelector('.input-btn');
const gallery = document.querySelector('.gallery');

async function getImages(q) {
  const SETTINGS = {
    URL: 'https://pixabay.com/api/',
    KEY: '25937561-4be56ebc67dabae3f5d5abc9c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };
  const { URL, KEY, image_type, orientation, safesearch } = SETTINGS;
  const searchRequest = `${URL}?key=${KEY}&q=${q}&${image_type}&${orientation}&${safesearch}`;

  try {
    const response = await axios.get(searchRequest);
    return response.data;
  } catch (error) {
    return error.status;
  }
}
getImages('ship').then(response => {
  if (response.total === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else createPictureMarkup(response);
});

function createPictureMarkup(res) {
  console.log(res.hits.[0]);
  res.hits.map(pic => {
    gallery.insertAdjacentHTML(
      "beforeend",
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
</div>`
    )
  });
}