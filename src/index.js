import axios from 'axios';
import Notiflix from 'notiflix';
import './sass/main.scss';
const searchInput = document.querySelector('[name=searchQuery]');
const btnInput = document.querySelector('.input-btn');

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
    return error;
  }
}
getImages('dog').then(response => {
  if (response.total === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else createPictureMarkup(response);
});

function createPictureMarkup(res) {
  console.log(res.hits.[0]);
  for (const i of res.hits) {
    console.log(i);
  }

}
