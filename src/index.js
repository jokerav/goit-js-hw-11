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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
getImages('dog').then(res => console.log(res));
