import './sass/main.scss';

function fetchImages(q) {
  const SETTINGS = {
    URL: 'https://pixabay.com/api/',
    KEY: '25937561-4be56ebc67dabae3f5d5abc9c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };
  const { URL, KEY, image_type, orientation, safesearch } = SETTINGS;
  const searchRequest = `${URL}?key=${KEY}&q=${q}&${image_type}&${orientation}&${safesearch}`;
  fetch(searchRequest).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}
fetchImages('dog');
